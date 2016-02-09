var recommended = 0;
var extra_alarms = [];
function get_next_hour(hour){
	var date = new Date();
	if (date.getHours()>=hour){
		date.setDate(date.getDate()+1);
	}
	date.setHours(hour);
	date.setMinutes(0);
	date.setSeconds(0);
	date.setMilliseconds(0);
	return date;
}
function set_alarm(aid,hour){
	//return
	cordova.plugins.notification.local.schedule({
			id:aid,
			title:"Lymphedema",
			text:"Time for practice",
			every: "day",
			at:get_next_hour(hour),
		});
}

$( function () {
  $('[type=checkbox]').bootstrapSwitch();
	$('[type=checkbox]').on('switchChange.bootstrapSwitch',function(event,state){
		function turn_off(id){
			if (id=='two'){
				cordova.plugins.notification.local.cancel([0,1],null);
			}
			else if (id=='three'){
				cordova.plugins.notification.local.cancel([0,1,2],null);
			}
			
			recommended = 0;
			localStorage['recommended'] = recommended;
			$("#" + id).bootstrapSwitch('state',false,true);
		}
		function turn_on(id){
			
			set_alarm(0,7);
			set_alarm(1,21);
			if (id=="three"){
				set_alarm(2,12);
			}
			recommended = id;
			localStorage['recommended'] = recommended;
			$('#' + recommended).bootstrapSwitch('state',true,true);
		}
		var id = $(this).attr('id');
		if (!state){
			turn_off(id);
		}else{
			if (recommended!=0){
				turn_off(recommended);
			}
			turn_on(id);
		}

	});

	if (typeof localStorage['extra_alarms'] != 'undefined'){
		extra_alarms = JSON.parse(localStorage['extra_alarms']);
	}else{
		localStorage['extra_alarms'] = JSON.stringify(extra_alarms);
	}
	if (typeof localStorage['recommended'] != 'undefined'){
		recommended = localStorage['recommended'];
		if (recommended!=0){
			$("#" + recommended).bootstrapSwitch('state',true,true);
		}
	}
	show_alarms();
	
});


function show_alarms(){
	var alarms = '';
	for (var i=0;i<extra_alarms.length;i++){
		alarms += '<div class="jumbotron"><div class="row"><div class="col-xs-4 vcenter"><button class="delete btn btn-danger" aid="' 
				+ extra_alarms[i].aid
				+'" index="'
				+ i
				+'">Delete</button></div><div class="col-xs-8 vcenter">'
  			+ '<h3>' + extra_alarms[i].time + '</h3>'
  			+'</div></div></div>'
	}
	$("#custom_alert").html(alarms);
	$(".delete").click(function(){
		cordova.plugins.notification.local.cancel($(this).attr('aid'),null);
		extra_alarms.splice(parseInt($(this).attr('index')),1);
		localStorage['extra_alarms'] = JSON.stringify(extra_alarms);
		show_alarms();
	});
}