// routes/task.js

'use strict'
const uuidv1 = require('uuid/v1');
const express = require('express');
const cors = require('cors');
const dictionary = require('../models/dictionary');
const router = express.Router();
const multer = require('multer') ; 
const path = require('path') ; 
const fs = require('fs');

var app = express()

app.use(cors());
router.all("*", cors());

router.route('/dictionary')
    .post((req, res) => {
        console.log(req.body) 
        const dictionaryModel = new dictionary({
            word: req.body.word,
            wordMeaning: req.body.wordMeaning , 
            imageName : req.body.imageName , 
            audioName : req.body.audioName , 
        });
        dictionaryModel.save((err, data) => {
            if (err) {
                return res.send(err);
            }
            return res.json({ result: data, message: 'Word Added' });
        });

    }).get((req, res) => {
        dictionary.find({}).sort({ createdAt: -1 })
            .exec((err, task) => {
                if (err) {
                    return res.send(err);
                }   
                return res.json(task);
            });
    })

router.route('/dictionary/:id')
    .get((req, res) => {
        dictionary.findById(req.params.id, (err, trip) => {
            if (err) {
                return res.send(err);
            }
            return res.json(trip);
        });
    })
    .put((req, res) => {
        console.log(req.body);

        dictionary.findByIdAndUpdate(req.params.id, {
            word: req.body.word,
            wordMeaning: req.body.wordMeaning , 
            imageName : req.body.imageName , 
            audioName : req.body.audioName , 
        }, (err, data) => {
            if (err) {
                return res.send(err);
            }
            console.log("Put data", data);
            return res.json({ result: data, message: 'Word updated successfully' });
        });
    })
    .delete((req, res) => {
        dictionary.findById(req.params.id , (err,word)=>{
            try {
            fs.unlinkSync(__dirname + `/../public/uploads/${word.imageName}`);
            fs.unlinkSync(__dirname + `/../public/uploads/${word.audioName}`);
            }catch (err) {}
        dictionary.remove({ _id: req.params.id }, (err) => {
                if (err) {
                    return res.send(err);
                }
            return res.json({ message: 'Word has been removed!' });
        });
    })
})

        // handle the error
      
   


    //set Storage Engine 
const storageImage  =    multer.diskStorage({
    destination : './public/uploads/' , 
    filename:function(req , file,cb) {
        cb(null ,file.fieldname+'-'+Date.now() + path.extname(file.originalname ));
    }
});


//Init Upload 
const uploadImage = multer({
    storage : storageImage,
}).single('imageFile') ;

//check file type 
function checkFileType(file,cb) {
    // Allowed ext 
    const filetypes =  /jpeg|jpg|png|gif/ ; 
    //check ext 
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase()) ; 

    //check mimetype
    const mimetype = filetypes.test(file.mimetype) ; 
    if(mimetype && extname) {
        return cb(null,true) ; 
    } else {
        cb('Error : Image Only') ;
    }
}
    router.post('/uploadImage' , (req,res) => {
        uploadImage(req,res,(err) => {
            if(err){
                console.log(err)
               return res.status(501).json({error : err}) ;
            }else {
                console.log(req.file) ; 
                res.json({originalName : req.file.originalname , 
                            uploadname : req.file.filename , 
                              mimetype : req.file.mimetype });
            }   
        })
    })


    router.get('/getWord/:word' , (req,res) => {
        dictionary.find({ "word" : { $regex: req.params.word , $options: 'i' } },
          function (err, docs) {
            if (err) res.send(err);
            if(docs.length == 0)
                 return res.json(  { words : docs ,  message: 'Word  Not found'   });
            else
            return res.json(  { words : docs ,  message: 'Word  found'   });

   });
    })

    router.get('/getWordsByAlphabet/:alphabet' , (req,res) => {
        dictionary.find({ "word" :new RegExp('^'+req.params.alphabet+'.*', "i")},
          function (err, docs) {
            if (err) res.send(err);
            if(docs.length == 0) 
                 return res.json(  { words : docs ,  message: 'Word  Not found'   });
            else
            return res.json(  { words : docs ,  message: 'Word  found'   });

   });
    })



    
module.exports = router;