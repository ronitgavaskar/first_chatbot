'use strict';

// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()); // creates express http server

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

app.post('/webhook', (req, resp) => {
    let body = req.body;

    // check if event is from page subscription
    if(body.object === 'page') {

        body.entry.forEach(function(entry) {
            
            //message will be stored in the array entry.messaging
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);
        });

        resp.status(200).send('EVENT_RECEIVED');
    } else {
        //page not found
        resp.sendStatus(404);
    }
});

app.get('/webhook', (req, resp) => {
    
    // verify token 
    let VERIFY_TOKEN = "random_string_goes_here"

    //parse query parameters
    let mode = req.query['hub.mode'];
    let token = req.query['hub.token'];
    let challenge = req.query['hub.challenge'];

    // check if mode and token is in query string of request
    if (mode && token) {
        if (mode == 'subscribe' && token == VERIFY_TOKEN) {
            //then we know that user is verified

            console.log('WEBHOOK VERIFIED');
            resp.status(200).send(challenge + "\n");
        } else {
            // user is unauthorized
            console.log("not working")
            resp.sendStatus(403);
        }
    }
});