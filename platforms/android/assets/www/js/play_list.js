var video = ["muscletighteningbreathing","shoulderrolls","claspspread","overhead","pushdown","horizontal","onedirection","shoulderrolls","claspspread","sidewaystretch","wallclimbing",];
var title = ["Breathing","Shoulder Rolls","Clasp Spread","Overhead","Push Down","Horizontal","One Direction","Shoulder Rolls","Clasp Spread","Sideways Stretch","Wall Climbing"];
var img = ["breathing.png","shoulder.png","claspe.png","overhead.png","pushdown.png","horizontal.png","onedirection.png","shoulder.png","claspe.png","sideway.png","wallclimbe.png"];

function gen_list(start,num){
	localStorage.video_start = start;
	localStorage.video_num = num;
	var text = "";
	for (var i=start;i<start+num;i++){
		text += gen_item(i);
	}
	$("#menu_div").html( text );
}
function gen_item(id){
	return '<div class="jumbotron" onclick="play_video(\''
		+id 
		+'\')"><div class="row"><div class="col-xs-4 vcenter"><br><a href="#" class="thumbnail"><img src="'
  		+"../res/img/"+img[id]
  		+'" alt="..."></a></div><div class="col-xs-8 vcenter"><h2>'
  		+title[id]
  		+'</h2></div></div></div>';
}


function play_video(id){
	localStorage.video_to_play = "../res/video/" + video[id] + localStorage.suff;
	localStorage.video_id = id;
	localStorage.video_go_back = window.location;
	goto_page("video.html");
}



function set_video(){
	document.getElementById("video").innerHTML = '<video controls poster="../res/img/'
	+ img[localStorage.video_id]
	+ '" id="video_tag"><source src="'
	+ localStorage.video_to_play
	+ '" type="video/mp4">Your browser does not support the video tag.</video>';
	document.getElementById("video_title").innerHTML = title[localStorage.video_id];
	var index = localStorage.video_id - localStorage.video_start + 1;
	document.getElementById("page").innerHTML = index + "/" + localStorage.video_num;
	if (index == 1){
		$("#btn_prev").attr("disabled","disabled");
	}
	if (index == localStorage.video_num){
		$("#btn_next").attr("disabled","disabled");
	}

}
function play(){
	$("#video_tag")[0].play();
}
function next(num){
	num += parseInt(localStorage.video_id);
	localStorage.video_id = num;
	localStorage.video_to_play = "../res/video/" + video[num] + localStorage.suff;
	if (num>0)
		goto_page("video.html");
	else
		go_back("video.html");
}

$(function(){
	

});