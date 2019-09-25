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
        console.log(req.body) 
        const pizzaModel = new pizza({
            email: req.body.email,
            deliveryAddress: req.body.deliveryAddress , 
            deliveryDateTime : req.body.deliveryDateTime , 
            selectedPizza : req.body.selectedPizza
        });
        pizzaModel.save((err, data) => {
            if (err) {
                return res.send(err);
            }
                 res.end().json({ result: data, message: 'pizza Added' });
        });

    });


    router.route('/emailReceipt').post((req,res) => {
        var receiptData = req.body;
        console.log('receiptData====',receiptData);
        var msg = {
            to: receiptData.email,
            from: 'amitjain.lov@gmail.com',
            subject: 'Hello world',
            text: 'Hello plain world!',
            html: '<p>Hello HTML     world!</p>',
            templateId: 'd-1f46bfe8283a4fbdbec83711e5f1e422'
        }
    
        console.log('message---',msg);
        sgMail.send(msg);
    });

     
    
  
    
module.exports = router;