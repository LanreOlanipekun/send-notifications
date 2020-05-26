'use strict';

const firebase = require("firebase-admin");
var admin = require("firebase-admin");
// var serviceAccount = require("./notification-e6ff4-firebase-adminsdk-g8kgu-4f1f1408b8.json");
var nodemailer = require('nodemailer');
var nodemailMailgun = require('nodemailer-mailgun-transport');

module.exports = {
    sendEmail: (html, mailGunApiKey, mailGunDomain, to, from, subject, attachments) => {
        return new Promise((resolve, reject) => {
            const auth = {
                auth: {
                    api_key: mailGunApiKey,
                    domain: mailGunDomain
                }
            }
            let transporter = nodemailer.createTransport(nodemailMailgun(auth));
            const mailOptions = {
                from,
                to,
                subject,
                html,
                attachments
            }
            transporter.sendMail(mailOptions, (err, data) => {
                if (err) {
                    return reject(err)
                }
                resolve(data)
            })
        })
    },
    initializePush: (serviceAccount, databaseURL) => {
        firebase.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: databaseURL
        });
    },
    sendPushnotification: (firebaseToken, payload, options) => {
        return new Promise((resolve, reject) => {
            firebase.messaging().sendToDevice(firebaseToken, payload, options)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}