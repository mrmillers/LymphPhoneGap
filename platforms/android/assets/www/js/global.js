var support_language = {
	'en-US':'../res/en-US.json',
}

function goto_page(id){
	$( "body" ).animate({
	    		//marginLeft: "-200vw",
	    		opacity: '0',
  			}, 300,'linear',function(){
	    		window.location.assign(id);	
	    	}
	 );
	
}
function go_back(id){
	$( "body" ).animate({
	    		opacity: "0",
  			}, 300,'linear',function(){
	    		window.location.assign(id);	
	    	}
	 );
}

$(function (){
	$('body').css('display','none').fadeIn();

	$.each($(".load"),function(key,val){
		$(val).load($(val).attr('url'));
	});
	$(".back").click(function(){
		go_back($(this).attr('url'));
	});
	$(".forward").click(function(){
		goto_page($(this).attr('url'));
	});

});
