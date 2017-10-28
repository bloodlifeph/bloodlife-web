$(document).ready(() => {
	resetCaptcha();
	$('#inquireForm').submit(event => {
		$('.form-group').removeClass('has-error');
		$('.help-block').remove();
		const formData = {
			'fullName': $('#fullName').val(),
			'contactNumber': $('#contactNumber').val(),
			'bloodType': $('#bloodType').val(),
			'nearestCity': $('#nearestCity').val(),
			'captcha': $('#captcha').val()
		};
		$.ajax({
			type: 'POST',
			url: 'inquiry',
			data: formData,
			dataType: 'json',
			encode: true
		}).done(data => {
			if (data.result === 'NOK') {
				if (data.errors.captcha) {
					resetCaptcha();
					$('#captcha-group').addClass('has-error');
					$('#captcha-group').append('<div class="help-block">' + data.errors.captcha + '</div>');
				}
				if (data.errors.fullName) {
					$('#fullName-group').addClass('has-error');
					$('#fullName-group').append('<div class="help-block">' + data.errors.fullName + '</div>');
				}
				if (data.errors.contactNumber) {
					$('#contactNumber-group').addClass('has-error');
					$('#contactNumber-group').append('<div class="help-block">' + data.errors.contactNumber + '</div>');
				}
			} else {
				$('#inquireForm').append('<div class="alert alert-success">' + data.message + '</div>');
			}
		}).fail(data => {
			$('#inquireForm').append('<div class="alert alert-success">' + JSON.stringify(data) + '</div>');
		});
		event.preventDefault();
	});

	function resetCaptcha(fresh) {
		const xhr = new XMLHttpRequest;
		xhr.open('get', 'captcha', true);
		xhr.onreadystatechange = () => {
			if (xhr.readyState != 4) return;
			const svg = xhr.responseXML.documentElement;
			$('#challenge').html(svg);
		};
		xhr.send();
	};
});