
		function Pointer(x, y) {
			this.x = x ;
			this.y = y ;
		}
		function Position(left, top) {
			this.left = left ;
			this.top = top ;
		}
	$(window).resize(function(){
		$(".brick").each(function(){
			var index = $(this).attr("data-index");
				$(this).css({
					"left":this.box.position().left,
					"top":this.box.position().top
				});
		})
	})
	$(".brick").each(function(index){
		
		//初始化位置，启动drag()函数
		this.init = function(){
			$(this).css({
				"left":this.box.position().left,
				"top":this.box.position().top
			}).attr("data-index",index);
			// console.log(this.box.position().left);
			this.drag();
		}
		this.move = function(callback) {  
				$(this).stop(true).animate({
					left : this.box.position().left,
					top : this.box.position().top
				}, 500, function() {
					if(callback) {
						callback.call(this) ;
					}
				}) ;
			}
		this.collisionCheck = function(){
			var currentItem = this;
			$(this).siblings('.brick').each(function(){
				if(currentItem.pointer.x>this.box.offset().left&&
					currentItem.pointer.y>this.box.offset().top&&
					currentItem.pointer.x<this.box.offset().left+this.box.width()&&
					currentItem.pointer.y<this.box.offset().top+this.box.height()
					){
					this.swap(currentItem);
				}
				else{
					console.log(currentItem.pointer.x,this.box.offset().left,this.box.width());
				}
			})
		}
		this.swap = function(currentItem){
			// var saveBox = this.box ;
			// this.box = currentItem.box ;
			// currentItem.box = saveBox ;
			thisindex = $(this).attr("data-index");
			$(this).attr("data-index",$(currentItem).attr("data-index"));
			$(currentItem).attr("data-index",thisindex);
			if(thisindex < $(this).attr("data-index")){
				this.box.insertAfter(currentItem.box);
			}
			else{
				this.box.insertBefore(currentItem.box);
			}
			this.move();
		}
		this.drag = function(){
			var oldPosition = new Position() ;
			var oldPointer = new Pointer() ;
			var isDrag = false ;
			var currentItem = this ;
			$(this).find(".title").bind("touchstart mousedown ",function(evt){
				evt.preventDefault();
				oldPointer.x = evt.pageX;
				oldPointer.y = evt.pageY;
				oldPosition.left = $(currentItem).position().left ;
				oldPosition.top =  $(currentItem).position().top ;
				isDrag = true ;

			})
			
			$(document).bind("touchmove mousemove ",function(evt){
				evt.preventDefault();
				if(isDrag){
					evt.preventDefault();
					var currentPointer = new Pointer(evt.pageX,evt.pageY);
					var left = currentPointer.x-oldPointer.x+oldPosition.left,
						top = currentPointer.y-oldPointer.y+oldPosition.top;
					$(currentItem).css({
						'left':left,
						'top':top
					})
					currentItem.pointer = currentPointer;
					currentItem.collisionCheck();
					$(currentItem).addClass('draging');
				}
			})
			$(document).bind("touchend mouseup ",function(evt){
				evt.preventDefault();
				if(isDrag){
					isDrag = false;
					currentItem.move(function(){
						$(".brick").removeClass('draging');
					});
				}
			})
		}
		if($(window).width()>900){
			//设置box属性为其克隆元素，用以定位
			$(".gridly").append($(this).clone().css({"opacity":0,"z-index":"-1"}).removeClass('brick').attr("id","origin"+index));
			this.box = $("#origin"+index);
			this.init();
		}
	})