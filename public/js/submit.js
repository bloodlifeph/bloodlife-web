$(document).ready(function() {
	// process the form
	$('#inquireForm').submit(function(event) {
		$('.form-group').removeClass('has-error'); // remove the error class
		$('.help-block').remove(); // remove the error text
		
		var formData = {
			'fullName' : $('#fullName').val(),
			'emailAddress' : $('#emailAddress').val(),
			'contactNumber' : $('#contactNumber').val(),
            'bloodType' : $('#bloodType').val()
		};

		// process the form
		$.ajax({
			type 		: 'POST', // define the type of HTTP verb we want to use (POST for our form)
			url 		: 'inquire', // the url where we want to POST
			data 		: formData, // our data object
			dataType 	: 'json', // what type of data do we expect back from the server
			encode 		: true
		})
		
		// using the done promise callback
		.done(function(data) {
			// log data to the console so we can see
			console.log(data);
			
			// here we will handle errors and validation messages
			if ( data.result === 'NOK') {
				
				// handle errors for name ---------------
				if (data.errors.fullName) {
					$('#fullName-group').addClass('has-error'); // add the error class to show red input
					$('#fullName-group').append('<div class="help-block">' + data.errors.fullName + '</div>'); // add the actual error message under our input
				}
				
				// handle errors for emailAddress ---------------
				if (data.errors.emailAddress) {
					$('#emailAddress-group').addClass('has-error'); // add the error class to show red input
					$('#emailAddress-group').append('<div class="help-block">' + data.errors.emailAddress + '</div>'); // add the actual error message under our input
				}
				
				// handle errors for contactNumber ---------------
				if (data.errors.contactNumber) {
					$('#contactNumber-group').addClass('has-error'); // add the error class to show red input
					$('#contactNumber-group').append('<div class="help-block">' + data.errors.contactNumber + '</div>'); // add the actual error message under our input
				}

			} else {
				// show success message!
				$('#inquireForm').append('<div class="alert alert-success">' + data.message + '</div>');
			}
		})
		// using the fail promise callback
		.fail(function(data) {
			$('#inquireForm').append('<div class="alert alert-success">' + JSON.stringify(data) + '</div>');
			// show any errors
			// best to remove for production
			console.log(data);
		});

		// stop the form from submitting the normal way and refreshing the page
		event.preventDefault();
	});
});