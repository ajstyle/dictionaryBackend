// routes/task.js

'use strict'
const uuidv1 = require('uuid/v1');
const express = require('express');
const cors = require('cors');
const pizza = require('../models/pizza');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey('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');
const router = express.Router();
var app = express()

app.use(cors());
router.all("*", cors());

router.route('/addPizza')
    .post((req, res) => {
        console.log('body========',req.body) ;
        
        const pizzaModel = new pizza({
            email: req.body.email,
            deliveryAddress: req.body.deliveryAddress , 
            deliveryDateTime : req.body.deliveryDateTime , 
            selectedPizza : req.body.selectedPizza
        });
        console.log(pizzaModel)
        pizzaModel.save((err, data) => {
            if (err) {
                return res.send(err);
            }
            console.log(req.body);
            let msg = {
                to: req.body.email,
                from: 'amitjain.lov@gmail.com',
                subject: 'Thanks for Order pizza ',
                html: '<b>Your Pizza is on the way.Thanks for ordering Pizza  </b>',
            }
        
            console.log('message---',msg);
            sgMail.send(msg);
         res.json({ result: data, message: 'pizza Added' });
        });

    });


    router.route('/emailReceipt').post((req,res) => {
      
    });

     
    
  
    
module.exports = router;