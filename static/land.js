(function($){
	$(document).on('click','.togC',function(){
		$(this).parent().parent().css('maxHeight','400px');
		$(this).addClass('togO');
		$(this).removeClass('togC');
	});
	$(document).on('click','.togO',function(){
		$(this).parent().parent().css('maxHeight','28px');
		$(this).addClass('togC');
		$(this).removeClass('togO');
	});
	//$(window).on('resize scroll',function(){
	//	var facetTop = $('.facetwp-template').offset().top;
	//});
	$(document).on('click','#gform_submit_button_13',function(){
		$('#gform_13').css('opacity','0.2');
		$('#thanks').remove();
		$('.formcont').addClass('sent');
	});
	$(document).on('click','#closer',function(){
		$('.newsmodal').remove();
		location.reload();
	});
	$(document).on('click','#gform_submit_button_5',function(){
		$('#gform_5').css('opacity','0.1');
		$('#newsletter').addClass('sent');
		var mail = $('#input_5_2').val();
		var first = $('#input_5_1').val();
		var last = $('#input_5_4').val();
		localStorage.setItem('mail',mail);
		localStorage.setItem('first',first);
		localStorage.setItem('last',last);
		$('.wraptwo').find('input[type=checkbox]:checked').each(function(){
			if($(this).val()=='BFI News & Events') {
				$('#choice_13_8_1').click();
				$('#field_13_5').hide();
			}
			if($(this).val()=='Student Opportunities') {
				$('#choice_13_8_2').click();
				$('#field_13_5').hide();
			}
			if($(this).val()=='Food & Agriculture Policy Alerts') {
				$('#input_13_5').val('');
				$('#field_13_5').show();
				$('#choice_13_8_3').click();
			}
			if($(this).val()=='UC Berkeley Foodscape Map') {
				$('#input_13_5').val('');
				$('#field_13_5').show();
				$('#choice_13_8_4').click();
			}
		});
	});
	$(document).bind('gform_post_render',function(e,id){
		if(id==5&&$('.validation_error').length) {
			$('#gform_5').css('opacity','1');
			$('#newsletter').removeClass('sent');
		}
	});
	$(document).bind('gform_confirmation_loaded',function(e,id){
			console.log(id);
			if(id==5) {
				$('#newsletter').removeClass('sent');
				$('#gform_5').hide();
				if($('.newsmodal').length) {
					var mail = localStorage.getItem('mail');
					var first = localStorage.getItem('first');
					var last = localStorage.getItem('last');
					$('#input_13_1').val(mail);
					$('#input_13_11').val(first);
					$('#input_13_9').val(last);
					$('.newsmodal').css('opacity','1');
					$('.newsmodal').css('pointer-events','auto');
				}
			} else if(id==13) {
				$('.formcont').removeClass('sent');
			}
	});
	$(document).on('click','.vidplay',function(){
		if($(this).hasClass('sound')) {
			var $target = $(this).next();
			$.featherlight($target,{
				afterOpen: function(e) {
					$audio = this.$content.get(0);
					$audio.play();
				}
			});
		} else {
			var $target = $(this).next();
			$.featherlight($target);
		}
	});
	$(document).ready(function(){
		if($('#gform_5').length) {
			$('#gform_5').attr('data-sent','false');
		}
		if($('.gallery').length) {
			$('.gallery-icon').each(function(){
				var src = $(this).find('img').attr('src');
				console.log(src);
				$(this).css('backgroundImage','url('+src+')');
				$(this).find('img').hide();
			});
			$('.gallery-icon').click(function(){
				$.featherlight($(this).parent());
			});

		}
		$('.lpBrick').each(function(){
			var topset = $(this).offset().top + 80;
			if($(window).width() < 1200)
				topset += 60;
			$(this).attr('data-top',topset);
		});
		//if($('.page-id-1518').length||$('.parent-pageid-1518').length) {
		//	$('.brick').eq(2).attr('href','/resources/news/?filter=bfi-in-the-media');
		//	$('.brick').eq(3).attr('href','/resources/news/?filter=from-the-field');
		//	$link = $('<li><a href="/resources/news/?filter=bfi-in-the-media">BFI in the Media</a></li>');
		//	$('.sidebar').find('ul').find('li').eq(2).after($link);
		//	$link = $('<li><a href="/resources/news/?filter=from-the-field">From the Field</a></li>');
		//	$('.sidebar').find('ul').find('li').eq(3).after($link);
		//}
	});
	$(document).on('click','.ond',function(){
		var $drop = $('<div>');
		var title = $(this).attr('data-title');
		$drop.addClass('dropper');
		$drop.attr('data-opened',title);
		

		var $tent = $(this).find('.dummy').html();
		$drop.html($tent);
		var $close = $('<div>');
		$close.addClass('close');
		$drop.prepend($close);

		$('.dropper').remove();
		$('.jel').css('opacity','0');
		$('.lpFrame').css('margin-bottom','27px');

		if($(window).width() > 992) {
			var topset = $(this).attr('data-top')+'px';
			console.log(topset);
			if($(window).width() < 1200)
				topset += 60;
			$drop.css('top',topset);
		}

		$(this).parent().css('margin-bottom','600px');
		$(this).after($drop);
		$('html,body').animate({
        	  scrollTop: $drop.offset().top - 250
        	}, 500);
		$(this).find('.jel').css('opacity','0.5');
	});
	$(document).on('click','.close',function(){
		$(this).parent().parent().css('margin-bottom','27px');
		$(this).parent().prev().find('.jel').css('opacity','0');
		$(this).parent().remove();
	});
}(jQuery));
