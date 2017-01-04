// today, let display all. in the future might need to paginate this once list of providers will grow
$(document).ready(function() {
    $.getJSON('providers', function (data) {
        for(var key in data.providers) {
            if(data.providers.hasOwnProperty(key)) {
                var provider = data.providers[key];
                var providerInfo = 
                '<div class="col-lg-3 col-md-6 text-center">' +
                    '<div class="service-box">' +
                    '    <i class="fa fa-4x fa-heart text-primary sr-icons"></i>' +
                    '    <h3>' + provider.name + '</h3>' +
                    '    <p class="text-muted">' + provider.address + '</p>' +
                    '    <p class="text-muted">' + provider.contact + '</p>' +
                    '</div>' +
                '</div>';
                $('#trusted-providers').prepend(providerInfo);
            }
        }
    });
});