// routes/task.js

'use strict'
const uuidv1 = require('uuid/v1');
const express = require('express');
const cors = require('cors');
const trip = require('../models/plan2go');
const router = express.Router();
var app = express()

app.use(cors());
router.all("*", cors());
// routes ending with /todos
router.route('/trip')
    .post((req, res) => {
        const plan2go = new trip({
            flights: req.body.flights,
            hotels: req.body.hotels , 
            transportations : req.body.transportations , 
            attractions : req.body.attractions , 
        });
        plan2go.save((err, data) => {
            if (err) {
                return res.send(err);
            }
            return res.json({ result: data, message: 'Add Trip successfully' });
        });

    }).get((req, res) => {
        trip.find({}).sort({ createdAt: -1 })
            .exec((err, task) => {
                if (err) {
                    return res.send(err);
                }   
                return res.json(task);
            });
    })

router.route('/trip/:id')
    .get((req, res) => {
        trip.findById(req.params.id, (err, trip) => {
            if (err) {
                return res.send(err);
            }
            return res.json(trip);
        });
    })
    .put((req, res) => {
        console.log(req.body);

        trip.findByIdAndUpdate(req.params.id, {
            flights: req.body.flights,
            hotels: req.body.hotels , 
            transportations : req.body.transportations , 
            attractions : req.body.attractions 
        }, (err, data) => {
            if (err) {
                return res.send(err);
            }
            console.log("Put data", data);
            return res.json({ result: data, message: 'Word updated successfully' });
        });
    })
    .delete((req, res) => {
        trip.remove({ _id: req.params.id }, (err) => {
                if (err) {
                    return res.send(err);
                }
            return res.json({ message: 'Word has been removed!' });
        });
    })

    router.route('/createTrip').post( (req,res) => {
        const tripBody = req.body.trip ; 
        let resFlight ; 
     
    trip.find( { }  )
        .exec((err,data)=>{ 
            if (err) {
                return res.send(err);
            }
            data.forEach( response => {
               let flightDetail  =  response.flights.filter( flight => {
            //       console.log('Arr' , flight.arrTime)
            //       console.log('frontArr' , tripBody.arrDate)
            //       console.log('Dep' , flight.depTime)
            //       console.log('frontDep' , tripBody.depDate)
            //    console.log ( (new Date(flight.arrTime).getTime()< new Date(tripBody.arrDate).getTime())) ; 
            //    console.log ( (new Date(flight.depTime).getTime()> new Date(tripBody.depDate).getTime())) ; 

                return (new Date(flight.arrTime).getTime() < new Date(tripBody.arrDate).getTime()) && (new Date(flight.depTime).getTime() > new Date(tripBody.depDate).getTime() ) }
                ) 
          
                
                response.flights= flightDetail ;
                resFlight = response ; 
                console.log(response);

            } )
            return res.json({ result: resFlight, message: 'Trip detail Found' });

        })
        
    })





module.exports = router;