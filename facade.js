// this will do something with the request being posted
exports.processInquiry = function(data) {
    console.log("Here we will process the request");
}

// returns list of identified trusted providers
exports.retrieveProviders = function() {
    var data = {
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