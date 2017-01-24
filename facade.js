var mailer = require( "./mailer.js" );
var persistence = require( "./persistence.js" );

// this will do something with the request being posted
exports.processInquiry = function(data) {
    mailer.fireEmails(data);
    persistence.saveFootPrint(data);
}

// returns list of identified trusted providers
exports.retrieveProviders = function() {
    let data = {
        providers : [ 
            {
                name : 'Hospital A',
                address : 'Hospital Address A',
                contact : '123456789'
            },
            {
                name : 'Hospital B',
                address : 'Hospital Address B',
                contact : '123456789'
            },
            {
                name : 'Bloodbank A',
                address : 'Bloodbank Address A',
                contact : '123456789'
            },
            {
                name : 'Bloodbank B',
                address : 'Bloodbank Address B',
                contact : '123456789'
            }
        ]
    }
    return data;
}