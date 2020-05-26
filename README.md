# send-notifications
Send email and push notifications
This package uses nodemailer and mailgun to send email and firebase for push notification. All you have to do is pass the required parameters
## To send email example
const {sendEmail} = require('send-notifications')

sendEmail(html,mailGunApiKey, mailGunDomain, to, from, subject, attachments)

This will return a promise

### Parameters:
#### html: html template for your email
#### mailGunApiKey: you will get this from your mailgun account
#### mailGunDomain: you will get this from you mailgun account
#### to: email you are sending yo
#### from: email to display to receiver
#### subject: email subject
#### attachment: if you don't have attachement, use an empty array, if you have attachment, use like this below
attachments = [
                {
                  filename: filename,
                  contentType: pdf or any other content type,
                  path: path of the file to upload
                 }
               ]
## Sending push notification example
const {initializePush, sendPushnotification} = require('send-notifications')

first you have to call the initializePush which will take the following parameters

##### initializePush(serviceAccount, databaseURL)

#### serviceAccount can be downloaded from firebase when you create a project. An example of linking the service account is below
#### const serviceAccount = require("./notification-34434-firebase-adminsdk-g8kgu-4f1f3448b8.json")
#### databaseUrl can also be gotten from firebase also.

##### After initialization, then call the sendPushnotification with the following parameters
##### sendPushnotification: (firebaseToken, payload, options)
#### firebaseToken is the token generated from the device you want to send the push notification to. Check firebase documentation on sending push notificqtion
#### payload sample 
const payload = {
                   notification: {
                    title,
                    body
                    }
                 };
				 
#### options sample
 const options = {
                   priority: 'high',
                   timeToLive: 60 * 60 * 24, // 1 day
                    };
#### check firebase push notification for more options 

##### Happy coding!
