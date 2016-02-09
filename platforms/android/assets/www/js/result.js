$(function(){
	$('#result').html(localStorage['query_result']);
	$('#img_result').attr('src','../res/img/' + localStorage['query_img'] + '.png');
	$('#redo').click(function(){
		var ans = JSON.parse(localStorage["query_ans"]);
		for (var i=0;i<ans.length;i++)
			ans[i] = -1;
		localStorage['query_ans'] = JSON.stringify(ans);
		localStorage['query_state'] = 'show_query';
		go_back('assessment.html'); 
	});
	$('#modify').click(function(){
		localStorage['query_state'] = 'show_query';
		go_back('assessment.html');
	});
});