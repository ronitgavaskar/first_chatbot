'use strict';

// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()), // creates express http server
  PORT = process.env.PORT || 1337,
  PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

// Sets server port and logs message on success
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

app.get("/", function(req, resp) {
    resp.status(200).send("Deployed Application!\n");
})

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
    let VERIFICATION_TOKEN = process.env.VERIFICATION_TOKEN;

    //parse query parameters
    let mode = req.query['hub.mode'];
    let token = req.query['hub.token'];
    let challenge = req.query['hub.challenge'];

    // check if mode and token is in query string of request
    if (mode && token) {
        if (mode == 'subscribe' && token == VERIFICATION_TOKEN) {
            //then we know that user is verified

            console.log('WEBHOOK VERIFIED');
            resp.status(200).send(challenge + "\n");

            // Get the sender PSID
            let sender_psid = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_psid);

        } else {
            // user is unauthorized
            console.log("not working")
            resp.sendStatus(403);
        }
    }
});

/** Messenger API Functions */

// Handles messages events
function handleMessage(sender_psid, received_message) {

}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {

}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  
}