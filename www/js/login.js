var password = "";
var username = "";
var hasUser = false;
var isRemember = false;
function load_user(){
	if (localStorage.username){
		username = localStorage.username;
		password = localStorage.password;
		isRemember = localStorage.isRemember > 0?true:false;
		hasUser = true;
		$("#sign_up").css('display' , "none");
		$("#repeat").css('display' , "none");
		$("#sign_in").css('display' , "initial");
		$("#username").val(username);
		if (isRemember){
			document.getElementById("isRemember").checked = true;
			$("#password").val(password);
		}else
			document.getElementById("isRemember").checked = false;
	}
	else{
		var ans = [];
		for (var i=0;i<27;i++)
			ans.push(-1);
		localStorage.query_ans = JSON.stringify(ans);
		localStorage['query_state'] = 'show_query';
	}
}
function sign_in(){
	if (username == document.getElementById("username").value && password == document.getElementById("password").value){
		if (document.getElementById("isRemember").checked == true)
			localStorage.isRemember = 1;
		else
			localStorage.isRemember = -1;
		//localStorage.isRemember = document.getElementById("isRemember").checked;
		window.location.assign("content.html");
	}else
		bootbox.alert("Invalid Username/Password.",null);
	}
function sign_up(){
	input_name = document.getElementById("username").value;
	input_pass = document.getElementById("password").value;
	input_repe = document.getElementById("repeat").value;
	if (input_pass!="teacher"){
		bootbox.alert("Sorry, invalid password. Please ask your doctor for help.")
		return
	}
	if (document.getElementById("isRemember").checked == true)
		localStorage.isRemember = 1;
	else
		localStorage.isRemember = -1;
	
	if (input_name == "" || input_pass == "" || input_repe == ""){
		bootbox.alert("Please fill all the fileds.",null);
		return;
	}
	if (input_repe != input_pass){
		bootbox.alert("Password not match.",function(){
			$('#password').val('');
			$('#repeat').val('');
		});
		return;
	}
	localStorage.username = input_name;
	localStorage.password = input_pass;
	bootbox.alert("Please login user your account.",function(){ window.location.assign("login.html");});
	
}

