/**
 * jquery carousel plugins
 * @author <teen hewendong@yulong.com>
 * @created 20150210
 */
;(function($) {
	$.fn.slider = function(options) {
		var defaults = {
			direction: "x", //滚动放心
			next: ".J_next", //下一个按钮
			prev: ".J_prev", //上一个按钮
			clickloop: true, //是否禁止上下点击循环滚动
			auto: 5000, //是否自动滚动,动画间隔延迟时间 如果时间为0 关闭自动滚动
			speed: 500, //动画时间
			//loop:false,  //是否循环
			scrollnum: 4, //同时滚动个数
			itemview: 4, //显示个数
			itemWarp: '.itemWarp', //显示item列表的warp
			itemwidth: null, //item宽度
			itemheight: null, //item高度
		};
		var opt = $.extend({}, defaults, options);


		return this.each(function() {
			var _this = $(this),
				len = $(this).find(opt.itemWarp).children().length,//图片数量
				W_width = opt.itemwidth * opt.itemview,   //外层显示宽度
				W_height = opt.itemheight * opt.itemview,  //外层显示高度
				width = opt.itemwidth * len, 	//图总宽度
				height = opt.itemheight * len, 	//图总高度
				scrollX = opt.itemwidth * opt.scrollnum,  //一次滚动宽度
				scrollY = opt.itemheight * opt.scrollnum,  //一次滚动高度
				maxTop = height - W_height,			//最大垂直偏移
				maxLeft = width - W_width;			//最大水平偏移
						
				//初始化宽度和高度
				if(opt.direction == "x"){//水平滚动
					$(this).width(W_width).height(opt.itemheight)
					_this.find(opt.itemWarp).width(width).height(opt.itemheight);
				}else{//垂直滚动
					$(this).width(opt.itemwidth).height(W_height)
					_this.find(opt.itemWarp).width(opt.itemwidth).height(heihgt);
				}
			
			/**
			 * 滚动动画
			 * @param  {[type]} type [下一个 next,or 上一个 prev]
			 * @return {[type]}      [description]
			 */
			function _scroll(type){
				//滚动中
				if(_this.find(opt.itemWarp).is(":animated")) return false;

				if(opt.direction == 'y'){
					var marginTop = parseInt(_this.find(opt.itemWarp).css('margin-top')),
					    result = 0;
					if(maxTop > 0 ){
						if(type == 'prev'){
							if(marginTop == 0){
								result = -maxTop;
							}else{
								result = (marginTop+scrollY) >= 0 ? 0 :(marginTop+scrollY);
							}
						}else{
							if(marginTop == -maxTop){
								result = 0;
							}else{
								result = (marginTop-scrollY ) <= -maxTop ? -maxTop : (marginTop-scrollY); 
							}
						}
					}
					//输出动画
					_this.find(opt.itemWarp).animate({"margin-top":result+"px"}, opt.speed);

				}else{//dirction == x default
					var marginLeft = parseInt(_this.find(opt.itemWarp).css('margin-left')),
						result = 0;
					if(maxLeft > 0 ){
						if(type == 'prev'){
							if(marginLeft == 0){
								result = -maxLeft;
							}else{
								result = (marginLeft+scrollX) >= 0 ? 0 : (marginLeft+scrollX);
							}
						}else{
							if(marginLeft == -maxLeft){
								result = 0;
							}else{
								result = (marginLeft-scrollX) <= -maxLeft ? -maxLeft : (marginLeft-scrollX);
							}
						}
					}
					//输出动画
					_this.find(opt.itemWarp).animate({"margin-left":result+"px"}, opt.speed);
				
				}
			}
			
			// next
			$(opt.next).on('click', function(){
				if(!opt.clickloop){ //不循环点击滚动
				var marginTop = parseInt(_this.find(opt.itemWarp).css('margin-top')),
					marginLeft = parseInt(_this.find(opt.itemWarp).css('margin-left'));
				if( (opt.direction =='y' && marginTop == -maxTop) || (opt.direction == 'x' && marginLeft == -maxLeft) ) return false;
				}
				_scroll('next');
			});
			//pre
			$(opt.prev).on('click', function(){
				if(!opt.clickloop){//不循环点击滚动
				var marginTop = parseInt(_this.find(opt.itemWarp).css('margin-top')),
					marginLeft = parseInt(_this.find(opt.itemWarp).css('margin-left'));
				if( (opt.direction =='y' && marginTop == 0 ) || (opt.direction == 'x' && marginLeft == 0) ) return false;
				}
				_scroll('next');
			});
			var timer;
			$(this).hover(function(){// hover
				if(opt.auto !== 0){
					clearInterval(timer);
				}
			},function(){//out
				if(opt.auto !== 0){
					timer = setInterval(function(){
						_scroll('next');
					},opt.auto);
				}
			}).trigger('mouseleave');

		});

	}
})(jQuery);
