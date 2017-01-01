/**
 * Paul Sydney Orozco (@xtrycatchx)
 * 
 * Entry point for the backend part
 */

var path = require('path');
var express = require('express');

var app = express();

var staticPath = path.join(__dirname, '/public');
app.use(express.static(staticPath));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.post('/', function(req, res) {
    //TODO: add processing for submitted blood inquiry
});

app.listen(3000, function() {
  console.log('listening');
});