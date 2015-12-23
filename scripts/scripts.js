(function() {

	//Contact Form
	//Open Contact Form
	var $contact = $('#contact');
	$('contactTrigger').click(function(){
		$contact.addClass('open');
	});
	
	//Close Contact Form
	$('.contact__close').click(function() {
		$contact.removeClass('open');
	});

	//Send Contact Form
	$('#contactFormSubmit').click(function(e) {
		e.preventDefault();
		var errors = 0,
				$name = $('#name'),
				$email = $('#email'),
				$message = $('#message');

		//init State
		$name.removeClass('error');
		$email.removeClass('error');
		$message.removeClass('error');
		
		//Validate form
		if (!$name.val()) {
			$name.addClass('error');
			errors++;
		}
		if (!$email.val()) {
			$email.addClass('error');
			errors++;
		}
		if (!$message.val()) {
			$message.addClass('error');
			errors++;
		}

		//Submit Form to server
		if (!errors) {
			var data = {
				name: $name.val(),
				email: $email.val(),
				message: $message.val()
			};
			$.post( "ajax/contactFormHandle.php", data)
  			.done(function( data ) {
					console.log(data);
  			});
		}
	});
	
})()
