function set_alarm(){
	var extra_alarms = JSON.parse(localStorage['extra_alarms']);
	var aid = 10;
	if (extra_alarms.length > 0){
		aid = extra_alarms[extra_alarms.length-1].aid + 1
	}
	extra_alarms.push({
		'time': $('#time_picker').data('date'),
		'aid': aid,
	});
	localStorage['extra_alarms'] = JSON.stringify(extra_alarms);
	var time = $('#time_picker').data('date').split(":");
	var date = new Date();
	date.setHours(time[0]);
	date.setMinutes(time[1]);
	date.setSeconds(0);
	date.setMilliseconds(0);
	if (date.getTime()<=(new Date()).getTime()){
		date.setDate(date.getDate() + 1);
	}
	cordova.plugins.notification.local.schedule({
			id:aid,
			title:"Lymphedema",
			text:"Time for practice",
			every: "day",
			at:date,
	});
	
}
$(function () {
	$('#time_picker').datetimepicker({
		inline: true,
		sideBySide: true,
		format: 'HH:mm',
	});
	$("#add").click(function(){
		
		set_alarm();
		
		goto_page('reminder.html');
		
	})
});