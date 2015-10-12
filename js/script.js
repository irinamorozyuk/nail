$(document).ready(function() {
	CBS();// add class to html

	/* Cufon */
	Cufon.replace('#slogan span, #telephone .telephone, .callback span, .callback button, #action .action-title',{
		fontFamily: 'Corki'
	});
	Cufon.replace('.action-block, .gift-desc, .reviews-title, .review-name, .copyright',{
		fontFamily: 'Corki'
	});
	Cufon.replace('#logo span, .action-block span, .review-text',{
		fontFamily: 'PT Sans'
	});

	 $('.inputtext').each(function() {
		var vlaue = $(this).val();
		$(this).focus(function() {
			if($(this).val()==vlaue) {
				$(this).val('')
			}
		}).blur(function() {
			if($(this).val()=='') {
				$(this).val(vlaue)
			}
		});
	});

	$('.callback button').click(function() {
		var name = $(this).prev().prev().val();
		var tel = $(this).prev().val();
		var isCorrect = true;
		var parent = this;

		if(!isEmpty(name) || !isEmpty(tel)) {
			isCorrect = false;
		}
		if (isCorrect) {
			var json = '{"name":"'+name+'", "tel":"'+tel+'"}';
			$.ajax({
			  type: "POST",
			  url: 'data/buy.php',
			  data: {json: json},
			  error: function(e){
				console.log(e.status);
			  },
			  success: function(data) {
				var results = jQuery.parseJSON(data);
				if(results['status']=="success") {
					console.log("SUCCESS!");
					$(parent).prev().prev().val('Введите имя');
					$(parent).prev().val('Введите телефон');
					$(parent).addClass('success').html('Отправлено!');
					Cufon.replace('.callback button',{fontFamily: 'Corki'});
					setTimeout(function() {
						$(parent).removeClass('success').html('Заказать!');
						Cufon.replace('.callback button',{fontFamily: 'Corki'});
					}, 2000);
				}
			  }
			});
		}

		return false;
	});

});


