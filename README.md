# Description

This is a sample messenger chatbot created using Facebook's [tutorial](https://developers.facebook.com/docs/messenger-platform/getting-started/webhook-setup)

# Where is this deployed

This project will be deployed using Heroku CLI.
Use the following commands to deploy to heroku:

`heroku login`
`heroku create`
`git add .`
`git commit -m "pushing to heroku"`
`git push heroku master`

# Important Send API Terminology
* sender_psid
    * The sender's page-scoped ID is individually assigned to each user when they start a conversation with a      page

# Webhook Events
* There are different webhook events that each webhook can be subscribed to.
* For this project, we will assume subscription to two particular callbacks
    * `messages`
        - occur when a message has been sent to the page
        - may potentially contain attachments
        - for more information, please refer to [this documentation](https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messages)

    * `messaging_postbacks`
        - occur when a postback button, Get Started button or `persistent_menu` item is selected 
        - for more information, please refer to [this documentation](https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messaging_postbacks)


### Resources
* https://dev.to/lawrenceagles/causes-of-heroku-h10-app-crashed-error-and-how-to-solve-them-3jnl


