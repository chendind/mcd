// 在ipad上与电脑上分别触发touchend与click事件
(function(){
        var isTouch = ('ontouchend' in document.documentElement) ? 'touchend' : 'click',
        	 _on = $.fn.on,
        	 _one = $.fn.one,
        	 _bind = $.fn.bind;
            $.fn.on = function(){
                arguments[0] = (arguments[0] === 'click') ? isTouch: arguments[0];
                return _on.apply(this, arguments); 
            };
            $.fn.bind = function(){
                arguments[0] = (arguments[0] === 'click') ? isTouch: arguments[0];
                return _bind.apply(this, arguments); 
            };
    //})();
	var body = $('body'), liheight = 44 , subliheight = 35, speed = 300;
//<<<<<<< HEAD
	var slideStart=0;
	//$(".menu>li>a").on('click',function(){
//=======
	$(".menu>li>a").on('click',function(e){
		e.preventDefault();
//>>>>>>> origin/master
		var li = $(this).parent('li');
		// if(body.hasClass("menuclose")){

		// }
		// else{
			var l = li.find("ul.submenu>li").length-0;
			if(l){
				if(li.hasClass('open')&&li.hasClass('set')){
					li.stop(true).animate({"height":liheight}, speed).removeClass('open');
				}
				else{
					li.stop(true).animate({"height":subliheight*l+liheight}, speed).addClass('open');
				}
			}
		// }
		
		li.addClass('set').siblings('li').removeClass('set');
	})
	// menuclose状态下鼠标移动改变左菜单状态

	$("#menutoggle").on('click',function(){
		body.toggleClass('menuclose');
	})

	// 公关的页面alertpanel关闭
	$(document).on('click',function(){
		$("[data-role='switch']").closest(".open").removeClass('open');
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
		if($(this).parent().hasClass('open')){
			$("[data-role='switch']").parent().removeClass('open');
		}
		else{
			$("[data-role='switch']").parent().removeClass('open');
			$(this).parent().addClass("open");
		}
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
		e.preventDefault();
		var id = $(this).attr("data-alert");
		mcdalert($("#"+id).clone(true));
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


  	//STOCK的关闭x按钮
  	 $("#stockblockclosebtn").on('click',function(){
  	 		$(this).closest('.contitem').addClass('nocont');
  	 })
  	 //widgetcenter的checkbox
  	 // 每一个checkbox都会有一个data-target属性，该属性等于其所控制的模块id
  	 $("#widgetcenter .contblock .checkbox").bind("click",function(){
  	 		$(this).toggleClass('checked');
  	 		var target = $(this).attr("data-target");
  	 		if($(this).hasClass('checked')){
  	 			$("#"+target).removeClass('nocont');
  	 		}
  	 		else{
  	 			$("#"+target).addClass('nocont');
  	 		}
  	 })
})
//可调整顺序的模块相关js
// var hasMouseDown = false;
// $(".contitem.dragable .title").on('click',function(){
// 	hasMouseDown = true;
// })
// $(".contitem.dragable .title").on('mousemove',function(e){

// })







