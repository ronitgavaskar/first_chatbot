'use strict';

// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  fetch = require('node-fetch'),
  { URLSearchParams } = require('url'),
  PORT = process.env.PORT || 1337,
  PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

var app = express().use(bodyParser.json());

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

            // Get the sender PSID
            let sender_psid = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_psid);
            
            // check webhook event type and redirect to appropriate handler
            if (webhook_event.message) {
                handleMessage(sender_psid, webhook_event.message);
            } else if (webhook_event.postback) {
                handlePostback(sender_psid, webhook_event.postback);
            }

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
    let response;

    // assign the response test
    if (received_message.text) {
        //create payload for basic text message
        response = {
            "text": `Hello! Welcome to dubnation!`
        }
    }

    // redirect to handler function for Send API
    callSendAPI(sender_psid, response);
    console.log("hello");
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {

}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
    // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

  // Send the HTTP request to the Messenger Platform

  const params = {"access_token": PAGE_ACCESS_TOKEN}
  const paramStr = new URLSearchParams(params);

  const url = `https://graph.facebook.com/v2.6/me/messages?${paramStr.toString()}`;
  fetch(url, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(request_body)
  })
  .then((err, res, body) => {
      if (!err) {
          console.log("Response sent!");
      } else {
          console.error("Cannot send message");
      }
  })
}