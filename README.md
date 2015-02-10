# jquery.slider
this is a jquery plugin for slider
###用法
```
$('selector').slider( options );
```
###options 参数列表
```
options = {
	direction: "x", //滚动放心
	next: ".J_next", //下一个按钮
	prev: ".J_prev", //上一个按钮
	disableClass: "disabled", //禁止上下滚动点击
	auto: 5000, //是否自动滚动,动画间隔延迟时间 如果时间为0 关闭自动滚动
	speed: 500, //动画时间
	// loop:false,  //是否循环
	scrollnum: 4, //同时滚动个数
	itemview: 4, //显示个数
	itemWarp: '.itemWarp', //显示item列表的warp
	itemwidth: null, //item宽度
	itemheight: null, //item高度
};
```

the licese MIT
