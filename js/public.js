$(function(){
	var body = $('body'), liheight = 44 , subliheight = 35, speed = 300;
	var slideStart=0;
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

	// 公关的页面alertpanel关闭
	$(document).on('click',function(){
		$("[data-role='switch']").removeClass('open');
	})
	if(!body.hasClass('menuclose')&&$(this).width() < 1025){
			body.addClass('menuclose');
		}
	// window resize时候给body增加或删去一些class
	$(window).on('resize',function(){
		if(!body.hasClass('menuclose')&&$(this).width() < 1025){
			body.addClass('menuclose');
		}
	})
	var linknum = $("#myfavorite .alertpanel .linkitem").length-0, boxnum = Math.ceil((linknum+1)/6),
	    box = $("<div class=\"linkbox\"></div>");
	    // tail = $('<a class="addbtn">Add New Link</a><div class="clear"></div>');
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
			// tail.appendTo($('#myfavorite .alertpanel'));
		}
	}
	$("[data-role='switch']").on('click',function(e){
		e.stopPropagation();
		$(this).parent().toggleClass("open");
	})
	$(document).on('click',".alertpanel",function(e){
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

	// 自定义模块


	//弹出窗口
	function mcdalert(cont){
		body.addClass('alertshow');
		$(".masklayer").append(cont);
	}
	function mcdalerthide(){
		$(".masklayer").empty()
		body.removeClass('alertshow');
	}
	$(".masklayer").on('click',".alertbox>.title>span",function(){
		mcdalerthide();
	})
	$(document).on('click',"[data-alert]",function(e){
		e.preventDeafault;
		var id = $(this).attr("data-alert");
		mcdalert($("#"+id).clone());
	})
  	
  	$(".slideBox")[0].addEventListener("touchstart", touchStart, false);
  	$(".slideBox")[0].addEventListener("touchend", touchEnd, false);
  	function touchStart(){
  		var slideWidth=$(".slideBox").width();
  		if($(".slideContainer>div").is(":animated"))
  			slideStart=-999;
  		else
  			slideStart=$(".slideContainer>div").scrollLeft();
  	}
  	function touchEnd(){
		if($(window).width()<600 || $(window).width()>900 || slideStart==-999)
			return;
		var slideWidth=$(".slideBox").width();
		var slideEnd=$(".slideContainer>div").scrollLeft()
		if(slideStart>slideEnd)
			$(".slideContainer>div").animate({scrollLeft: 0}, 300);
		else
			$(".slideContainer>div").animate({scrollLeft: slideWidth/3}, 300);
	}	

})











