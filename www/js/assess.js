var chosen = -1;
var answer = [];
var query_id;
var query_selection = ["None","A little","Somewhat","Quite a bit","Very Sever"]
var query_answer = [
		"Your report indicates that you have limited limb mobility,please do more exercises to promote limb mobility.",
		"Your report indicates that you have limited limb mobility and  significant lymph fluid build-up, please do more exercises  to promote limb mobility and to promote lymph flow.",
		"Your report indicates that you have significant lymph fluid  build-up, please do more exercises to promote lymph flow.",
		"Your report indicates that you have some lymph fluid build-up, please do more exercises to promote lymph flow.",
		"Your report indicates that you have minimal lymph fluid build-up, please Continue your routine exercises twice a day. Enjoy your life!",
		"Congratulations!  Please continue your routine exercises at  least twice a day. Enjoy your life.", ]
var query = [
	"Have you had Pain?",
	"Have you had Soreness?",
	"Have you had Aching?",
	"Have you had Tenderness?",
	"Have you had Arm or hand swelling?",
	"Have you had Breast swelling?",
	"Have you had Chest wall swelling?",
	"Have you had Firmness in the affected limb?",
	"Have you had Tightness in the affected limb?",
	"Have you had Heaviness in the affected limb?",
	"Have you had Toughness or thickness of skin in the affected limb?",
	"Have you had Stiffness in the affected limb?",
	"Have you had Hotness/increased temperature in the affected limb?",
	"Have you had Redness in the affected limb?",
	"Have you had Blistering in the affected limb?",
	"Have you had Numbness in the affected limb?",
	"Have you had Burning in the affected limb?",
	"Have you had Stabbing in the affected limb?",
	"Have you had Tingling (pins and needles) in the affected limb?",
	"Have you had Fatigue in the affected limb?",
	"Have you had Weakness in the affected limb?",
	"Have you had Pocket of fluid developed?",
	"Have you had limited movement of your affected Shoulder?",
	"Have you had limited movement of your affected Elbow?",
	"Have you had limited movement of your affected Wrist?",
	"Have you had limited movement of your affected Fingers?",
	"Have you had limited movement of your affected Arm?",]
var img_set = [ "bigclaspe"
              , "muclepumping"
              , "horizontal"
              , "onedirection"
              , "largemuscle"
              , "congratulations"
              ]
var get_group = function(query_id){
	if (query_id <= 4)
		return 4;
    if ((query_id >= 11 && query_id <= 21) || query_id == 6 || query_id == 7 ){
        return 3;
    }
    if ( (query_id >= 8 && query_id <= 10) || query_id == 5 || query_id == 22 ) {
    	return 2;
    }
    if ( query_id >= 23 && query_id <= 27 ) {
    	return 1;
    }

}


var show_result = function(){
	var group = [0,0,0,0,0];
	
	for (var i=0;i<answer.length;i++){
		if (answer[i]==-1){
			/*bootbox.dialog({
				message: 'Please answer all the questions.',
				title: 'Lymphedema Alert', 
				buttons:{
					ok:{
						label: "OK",
						className: "btn btn-primary",
						callback: function() {
							localStorage['query_state'] = 'show_alert';
  							goto_page('assessment.html');
  						},
					},	
				},
			});*/
			bootbox.alert('<h3>Please answer all the questions.</h3>',function() {
							localStorage['query_state'] = 'show_alert';
  							goto_page('assessment.html');
  						});
			return;
		}
		else if (answer[i]>0)
			group[get_group(i+1)] ++;
	}

	result = 5;
	if (group[2]>0 && group[4]>0){
    	result = 2;
    }
	if (group[1]>0){
    	if (group[2]>0 || group[4]>0 || group[3]>=4){
    		result=1;
    	}
    	if (group[3]<4){
    		result=0;
    	}

    } else{
    	if (group[2]>0){
    		result=2;
    	}else{
    		if (group[4]>0){
    			result=3;
    		}
    		if (group[3] >= 4 ){
    			result=3;
    		}
    		if (group[3] < 4 && group[3] > 0){
    			result=4;
    		}
		}
    }
    localStorage['query_result'] = query_answer[result]
    localStorage['query_state'] = 'show_result'
    localStorage['query_img'] = img_set[result]
    goto_page('assessment.html')
}
function set_query(){
	answer = JSON.parse(localStorage["query_ans"]);
	query_id = parseInt(localStorage["query_id"]);
	chosen = answer[query_id-1];
	if (answer[query_id-1]>=0){
		$("#" + answer[query_id-1]).attr("class","btn btn-primary btn-lg");
	}
	$('.progress-bar').css('width',query_id * 100.0/answer.length + '%');
	$('.progress-bar').html(query_id + '/' + answer.length);
	$("#query").html( query[query_id-1] );
	if (query_id == 1)
		$("#btn_prev").attr('disabled','disabled');
	else
		$("#btn_prev").click(function(){
			localStorage["query_id"] = query_id-1;
			go_back('query.html');
		});
	if (query_id == answer.length){
		$("#btn_next").css("disabled","disabled");
	}
	else{
		$("#btn_next").click(function(){
			localStorage["query_id"] = query_id+1;
			goto_page('query.html');
		});
		
	}
	if (chosen==-1){
		$('#btn_next').attr('disabled','disabled');
	}

  $("#btn_finish").click(function(){
    show_result();
  });

}
function answer_query(id){
	localStorage.query_id = id;
	goto_page("query.html");
}
function gen_query(){
	if (localStorage['query_state']=='show_result'){
		window.location.assign('result.html')
	}
	else{
		var isAlert = localStorage['query_state']=='show_alert'?true:false;
		var text = "";
		answer = JSON.parse(localStorage["query_ans"]);
		for (var i=1;i<=query.length;i++){
			if (answer[i-1]>=0)
				text += '<div class="jumbotron alert alert-success" onclick="answer_query(\''
					+i 
					+'\')"><div class="row"><div class="col-xs-12 vcenter"><p>'
			  		+i+'.'+query[i-1]
			  		+'</p><p><strong>'
			  		+query_selection[answer[i-1]]
			  		+'</strong></p></div></div></div>';
			else
				text += '<div class="jumbotron '
					+(isAlert?'alert alert-danger':'')
					+'" onclick="answer_query(\''
					+i 
					+'\')"><div class="row"><div class="col-xs-12 vcenter"><p>'
			  		+i+'.'+query[i-1]
			  		+'</p></div></div></div>';
		}
		$("#query_div").html(text);
	}
}
function choose(id){
	answer[query_id-1] = id;
	localStorage["query_ans"] = JSON.stringify(answer);
	if (chosen!=-1){
		$('#' + chosen).attr('class','btn btn-default btn-lg');
	}
	$('#' + id).attr('class','btn btn-primary btn-lg');
	chosen = id;
  if (query_id != answer.length){
    $('#btn_next').removeAttr('disabled')
  }
	
}
function checkboxListener(id){
  console.log(id)
  if ( $('#' + id).is(':checked') ){
    localStorage[id] = '1'
  }else{
    localStorage[id] = '0'
  }
  console.log(localStorage[id])
}
$(function(){
  $('input[type="checkbox"]').click(function(){
    checkboxListener($(this).attr('id'))
  })
  //$('#affected-left').attr('checked','checked')
  console.log(localStorage['affected-right'])
  if (localStorage['affected-left'] == '1') $('#affected-left').attr('checked','checked')
  if (localStorage['affected-right'] == '1') $('#affected-right').attr('checked','checked')
})