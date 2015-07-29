$(function(){
	var body = $('body'), liheight = 44 , subliheight = 35, speed = 300;

	$(".menu>li>a").on('click',function(){
		var li = $(this).parent('li');
		var l = li.find("ul.submenu>li").length-0;
		if(l){
			if(li.hasClass('open')&&li.hasClass('set')){
				li.stop(true).animate({"height":liheight}, speed).removeClass('open');
			}
			else{
				li.stop(true).animate({"height":subliheight*l+liheight},speed).addClass('open');
			}
		}
		li.addClass('set').siblings('li').removeClass('set');
	})

	$("#menutoggle").on('click',function(){
		body.toggleClass('menuclose');
	})
	var linknum = $(".alertpanel .linkitem").length;
	$.each($(".alertpanel .linkitem"),function(index){
		if(index != 0 && index%5 == 0 && index != linknum){
			// $(this).after("</div><div class=\"linkbox\">");
			$(this).after("</div>");

		}
	})
})