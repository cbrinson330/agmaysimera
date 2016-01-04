(function() {

/*  $('#nav a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    $(document).off("scroll");

    $('#nav a').each(function () {
        $(this).removeClass('current');
    });
    $(this).addClass('current');

    var target = this.hash,
        menu = target;
    $target = $(target);
    $('html, body').stop().animate({
        'scrollTop': $target.offset().top-0
    }, 1000, 'swing', function () {
        window.location.hash = target;
        $(document).on("scroll", onScroll);
    });
});

});

function onScroll(event){
var scrollPos = $(document).scrollTop();
$('#nav a').each(function () {
    var currLink = $(this);
    var refElement = $(currLink.attr("href"));
    if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
        $('#nav a').removeClass("current");
        currLink.addClass("current");
    }
    else{
        currLink.removeClass("current");
    }
}); */


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
