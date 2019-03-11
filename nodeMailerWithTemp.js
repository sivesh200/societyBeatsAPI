/**
 * Created by olyjosh on 29/06/2017.
 */
var sender = 'smtps://no-reply%40societybeats.in'   // The emailto use in sending the email(Change the @ symbol to %40 or do a url encoding )
var password = 'v_{}-6gk5Jct'  // password of the email to use

var nodeMailer = require("nodemailer");
var EmailTemplate = require('email-templates').EmailTemplate;


var transporter = nodeMailer.createTransport(sender + ':' + password + '@mail.societybeats.in');

// create template based sender function
// assumes text.{ext} and html.{ext} in template/directory
var sendResetPasswordLink = transporter.templateSender(
    new EmailTemplate('./templates/resetPassword'), {
        from: 'hello@societybeats.in',
    });

exports.sendPasswordReset = function (email, username, name, tokenUrl) {
    // transporter.template
    sendResetPasswordLink({
        to: email,
        subject: 'Password Reset - societybeats.in'
    }, {
        name: name,
        username: username,
        token: tokenUrl
    }, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('Link sent\n' + JSON.stringify(info));
        }
    });
};