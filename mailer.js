/**
 * Paul Sydney Orozco (@xtrycatchx)
 * 
 * Mail helper. Currently uses mailgun services
 */

var api_key = 'key-xxx';
var domain = 'foo-bar.bloodlife.ph';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

// this will do something with the request being posted
exports.fireEmails = function(data) {

    var bodyText = "Fullname : " + data.fullName;
    bodyText = bodyText + "Email : " + data.emailAddress;
    bodyText = bodyText + "Contact Number : " + data.contactNumber;
    bodyText = bodyText + "Needing : " + data.bloodType;

    var bodyHtm = '<p> Fullname : ' + data.fullName + '<br/>';
    bodyHtm = bodyHtm + 'Email : ' + data.emailAddress + '<br/>';
    bodyHtm = bodyHtm + 'Contact Number : ' + data.contactNumber + '<br/>';
    bodyHtm = bodyHtm + 'Needing : ' + data.bloodType + '<br/></p>';

    var msg = {
        from: 'Bloodlife.PH (BLOOD INQUIRY) <REPLACETHIS@foo-bar.bloodlife.ph>',
        to: 'HOSPITAL@hospitalA.com',
        subject: 'Bloodlife.PH (BLOOD INQUIRY)',
        text: bodyText,
        html: bodyHtm
    };

    mailgun.messages().send(msg, function (error, body) {
        //console.log(error);
        console.log(body);
    });
}