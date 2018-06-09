function onScroll(event){
	var scrollPos = $(document).scrollTop();
	$('nav a').not("#contactNav").each(function () {
	    var currLink = $(this);
	    var refElement = $('#' + currLink.attr("href"));
	    if (refElement.position().top - 120 <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
	        $('nav a').removeClass("current");
	        currLink.addClass("current");
	    }
	    else{
	        currLink.removeClass("current");
	    }
		});
}

$('nav a').not('#contactNav').on('click', function (e) {
  e.preventDefault();
  $(document).off("scroll");

  $('nav a').not("#contactNav").each(function () {
      $(this).removeClass('current');
  });
  $(this).addClass('current');

  var target = $(this).attr('href'),
      menu = target;
  $target = $('#'+target);
  $('html, body').stop().animate({
      'scrollTop': $target.offset().top-100
  }, 1000, 'swing', function () {
      window.location.hash = target;
      $(document).on("scroll", onScroll);
  });
});

$(document).on("scroll", onScroll);

$(document).on('ready',function(){
	console.log('on Doc ready');
	//$(".slide-work").lightSlider(); 
	$(".slide-team").lightSlider(); 
});

(function() {
	//Expando Collapso jobs posting
	$('.job__title').on('click', function(e) {
		e.preventDefault();
		$(this).next().slideToggle(function() {
			$('.job__title').find('.icon-chevron-down').toggle();
			$('.job__title').find('.icon-chevron-up').toggle();
		});
	});

	//Update copy date
	$("#footer__copyYear").text(new Date().getFullYear());

	//Contact Form
	var $contact = $('#contact');

	//Open Contact Form
	$('.contactTrigger').click(function(e) {
		e.preventDefault();
		var windowHeight = $(document).height();
		console.log(windowHeight);
		$contact.css('height', windowHeight - 25 + 'px');
    $('.returnMessage').text('');
		$('#name').removeClass('error');
		$('#email').removeClass('error');
		$('#message').removeClass('error');
		$('#contact').toggleClass('open');
	});
	
	//Close Contact Form
	$('.contact__close').click(function() {
		$contact.removeClass('open');
	});

	//Correct Errors
	$('.contact').on('keydown', '.error', function(){
		$(this).removeClass('error');
	});

	//Send Contact Form
	$('#contactFormSubmit').click(function(e) {
		e.preventDefault();
		var errors = 0,
				$name = $('#name'),
				$email = $('#email'),
				$message = $('#message'),
        $returnMessage = $('.returnMessage');

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
          if (data.code === 200) {
            $name.val('');
            $email.val('');
            $message.val('');
            $returnMessage.text(data.message);
            setTimeout(function(){ $('#contact').removeClass('open'); }, 1500);
          }
          else if(data.code === 400 && data.fieldError === 'email') {
            $email.addClass('error');
            $returnMessage.text(data.message);
          }
          else {
            $returnMessage.text(data.message);
          }

  			});
		}
		else {
			$('.returnMessage').text('Please complete all fileds');
		}
	});

})()
