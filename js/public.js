$(function(){
	// 公关的页面alertpanel关闭
	$(document).on('click',function(){
		$("[data-role='switch']").removeClass('open');
	})



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
	var linknum = $("#myfavorite .alertpanel .linkitem").length-0, boxnum = Math.ceil((linknum+1)/6),
	    box = $("<div class=\"linkbox\"></div>"), 
	    tail = $('<a class="addbtn">Add New Link</a><div class="clear"></div>');
	$("#myfavorite .alertpanel").width(boxnum*160+30);
	for(i=0;i<boxnum;i++){
		var thisbox = box.clone().appendTo($("#myfavorite .alertpanel"));
		$.each($("#myfavorite .alertpanel>.linkitem"),function(index){
			if(index<6){
				console.log($(this).text());
	    		$(this).appendTo(thisbox);
			}
		})
		if(i+1==boxnum){
			if(thisbox.children('.linkitem').length>4){
				box.clone().appendTo($("#myfavorite .alertpanel"));
			}
			tail.appendTo($('#myfavorite .alertpanel'));
		}
	}
	$("[data-role='switch']").on('click',function(e){
		e.stopPropagation();
		$(this).toggleClass("open");
	})
	$(".alertpanel").on('click',function(e){
		e.stopPropagation();
	})
	$(".btngroup").on('click','.title',function(){
		if($(this).hasClass('set')){}
		else{
			var target = $(this).attr("data-target");
			$(this).addClass('set').siblings(".title").removeClass('set');
			$(this).parent(".btngroup").siblings(".cont[data-origin]").removeClass('show');
			$(this).parent(".btngroup").siblings(".cont[data-origin='"+target+"']").addClass('show');
		}


	})
})