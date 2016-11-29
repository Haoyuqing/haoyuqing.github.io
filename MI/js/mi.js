
$(document).ready(function(){
	startGood=$('.start-goods>ul');
	recommond=$('.recommond>ul');
	index=0;
	index2=0;
	a=0;
	 timer=setInterval(run,5000);
	 timer2=setInterval(run2,5000);
	$('.buton-left').click(function(){
		clearInterval(timer);
		run();
		setTimeout(time,1000);		
	});
	$('.button-right').click(function(){
		clearInterval(timer);
		index=0;
		run();
		setTimeout(time,1000);
	});
	

	if(index2==4){
		$(".button-right-recommond").unbind("click");
	}
	$('.buton-left-recommond').click(function(){
			if(index2==0){
				return;
			}else{
					clearInterval(timer2);
					index2=index2-2;
					run2();
//					setTimeout(run2,3000);	
				}
			
	});
	$('.button-right-recommond').click(function(){
		if(index2==4){
			return;
		}else{
			clearInterval(timer2);
			run2();
//			setTimeout(time2,3000);
		}
		
	});
	
	
	
	var nav_title=$(".NOempty");
	var nav_content=$(".menutop-good");
	for (var i=0;i<nav_title.length;i++) {
		nav_title[i].id=i;
		nav_content[i].id=i;
		nav_title[i].onmouseenter=function(){
			$(".menu-top-hidden").stop().slideDown();
			nav_content[this.id].style.display="block";
		}
		nav_title[i].onmouseleave=function(){
			
			$(".menu-top-hidden").stop().slideUp();
			for (var i=0;i<nav_title.length;i++) {
				nav_content[i].style.display="none";
			}
		}
	}
	$(".figure-arrow-left").click(function(){
		clearInterval(changetimer);
		a=a-2;
		setTimeout(change,300);
//		setTimeout(changetime,600);
	});
	$(".figure-arrow-right").click(function(){
		clearInterval(changetimer);
		setTimeout(change,300);
//		setTimeout(changetime,600);
	});
	$(".figure-pot li").click(function(){
		clearInterval(changetimer);
		a=$(this).index();
		$(".shuffing-figure li ").fadeTo(0,0.7).hide().siblings("li").eq(a).show().fadeTo(500,1);
		$(".figure-pot li").removeClass("selected").siblings("li").eq(a).addClass("selected");
//		var changetimer=setInterval(change,3000);	
	})
	
	var changetimer=setInterval(change,3000);	
});
function changetime(){
	changetimer=setInterval(change,3000);
}
function change(){
	a++;
	if(a>4){
		a=0;
	}
	if(a<0){
		a=5+a;
	}
//	$(".shuffing-figure li").removeClass("zIndex").siblings("li").eq(a).addClass("zIndex");
	$(".shuffing-figure li ").fadeTo(0,0.6).hide().siblings("li").eq(a).show().fadeTo(300,1);
	$(".figure-pot li").removeClass("selected").siblings("li").eq(a).addClass("selected");
	
}


function time(){
	 timer=setInterval(run,5000);
}
function time2(){
	 timer2=setInterval(run2,5000);
}
function run(){
	index++;
	if(index==2){
		index=0;
	}
	var  left=index*(-1226);
	startGood.animate({
		'marginLeft':left+'px'
	},1000);
}
function run2(){
	index2++;
	if(index2==5){
		index2=0;
	}
	var  left=index2*(-1226);
	recommond.animate({
		'marginLeft':left+'px'
	},1000);
}















