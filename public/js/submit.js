$(document).ready(function() {

	// process the form
	$('#inquireForm').submit(function(event) {

		$('.form-group').removeClass('has-error'); // remove the error class
		$('.help-block').remove(); // remove the error text

		// get the form data
		// there are many ways to get this data using jQuery (you can use the class or id also)
		var formData = {
			'fullName' 				: $('input[name=fullName]').val(),
			'emailAddress' 			: $('input[name=emailAddress]').val(),
			'contactNumber' 	: $('input[name=contactNumber]').val(),
            'bloodType' 	: $('input[name=bloodType]').val(),
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
				if ( ! data.success) {
					
					// handle errors for name ---------------
					if (data.errors.fullName) {
						$('#name-group').addClass('has-error'); // add the error class to show red input
						$('#name-group').append('<div class="help-block">' + data.errors.fullName + '</div>'); // add the actual error message under our input
					}

					// handle errors for emailAddress ---------------
					if (data.errors.emailAddress) {
						$('#email-group').addClass('has-error'); // add the error class to show red input
						$('#email-group').append('<div class="help-block">' + data.errors.emailAddress + '</div>'); // add the actual error message under our input
					}

					// handle errors for contactNumber ---------------
					if (data.errors.contactNumber) {
						$('#superhero-group').addClass('has-error'); // add the error class to show red input
						$('#superhero-group').append('<div class="help-block">' + data.errors.contactNumber + '</div>'); // add the actual error message under our input
					}

				} else {

					// ALL GOOD! just show the success message!
					$('#inquireForm').append('<div class="alert alert-success">' + data.message + '</div>');

					// usually after form submission, you'll want to redirect
					// window.location = '/thank-you'; // redirect a user to another page

				}
			})

			// using the fail promise callback
			.fail(function(data) {

                // show any errors
				// best to remove for production
				console.log(data);
			});

		// stop the form from submitting the normal way and refreshing the page
		event.preventDefault();
	});

});