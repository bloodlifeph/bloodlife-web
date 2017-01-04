/**
 * Paul Sydney Orozco (@xtrycatchx)
 * 
 * Entry point for the backend part
 */

var path = require('path');
var express = require('express');
var helmet = require('helmet');
var bodyParser = require('body-parser');
var validator = require( "./validator.js" );
var facade = require( "./facade.js" );
var server;

var app = express();

app.set('port', (process.env.PORT || 3000));

app.use(helmet());

var staticPath = path.join(__dirname, '/public');
app.use(express.static(staticPath));


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({	extended: true })); // support encoded bodies

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/providers', function(req, res) {
    var data = facade.retrieveProviders();
    res.send(data);
});

app.post('/inquire', function(req, res) {
    //TODO: add processing for submitted blood inquiry

    var data = {};

    var fullName = req.body.fullName;
	var emailAdd = req.body.emailAddress;
    var contactN = req.body.contactNumber;
    var bloodTpe = req.body.bloodType;

    //Validate Full Name
    if(validator.isNullOrWhiteSpace(fullName)) {
       console.log('Invalid fullName');
        data = {
            result: 'NOK',
            errors : {
                fullName: 'Please provide your Full Name to allow Bloodbanks and Hospitals to contact you.'
            }
        }; 
    } else
        // Validate Email 
        if(!validator.validateEmail(emailAdd)) {
            console.log('Invalid email');
            data = {
                result: 'NOK',
                errors : {
                    emailAddress: 'Please provide correct email.'
                }
            };
    } else
        // Validate Contact Number
        if(validator.isNullOrWhiteSpace(contactN)) {
            console.log('Invalid Contact Number');
            data = {
                result: 'NOK',
                errors : {
                    contactNumber: 'Please provide your Contact Number(s) to allow Bloodbanks and Hospitals to contact you.'
                }
            }; 
    } else 
        // Validate bloodType
        if(validator.isNullOrWhiteSpace(bloodTpe)) {
            console.log('Invalid Blood Type');
            data = {
                result: 'NOK',
                errors : {
                    bloodType: 'Please provide the type of blood you are requesting.'
                }
            };
    } else {

        // Everything seems OKAY
        console.log('Post data is OK');
        // console.log('broadcast this info to trusted blood providers: ', fullName, emailAdd, contactN, bloodTpe);
        data = {
            result: 'OK',
            message: 'Successfully broadcasted your request. Kindly wait for the trusted blood providers to reach you.'
        };

        facade.processInquiry(req.body);
    }

    res.send(data);
});

var start = function () {
    server = app.listen(app.get('port'), function() {
        console.log('listening on port: ', app.get('port'));
    });
}

var shutdown = function() {
    console.log('shutting down app');
    server.close();
}

if (require.main === module) {
    start();
} else {
    exports.start = start;
    exports.shutdown = shutdown;
    exports.port = app.get('port');
}
