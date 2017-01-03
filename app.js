/**
 * Paul Sydney Orozco (@xtrycatchx)
 * 
 * Entry point for the backend part
 */

var path = require('path');
var express = require('express');
var helmet = require('helmet');
var bodyParser = require('body-parser');
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

app.post('/inquire', function(req, res) {
    //TODO: add processing for submitted blood inquiry
    var fullName = req.body.fullName;
	var emailAdd = req.body.emailAddress;
	var contactN = req.body.contactNumber;
    var bloodTpe = req.body.bloodType;
    console.log('broadcast this info to trusted blood providers: ', fullName, emailAdd, contactN, bloodTpe);
    res.send(fullName + ' ' + emailAdd + ' ' + contactN + ' ' + bloodTpe);
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
