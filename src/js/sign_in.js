document.addEventListener('DOMContentLoaded', start);

function start() {
	//open the sign_in form
	document.getElementById("sign_in").onclick = displaySignIn;
	
	//check the login information
	document.getElementById("login_username").onblur = checkUserName;
	document.getElementById("login_pwd").onblur = checkPwd;
	
	// document.getElementById("sign_in_form_id").onsubmit = displayAnotherPage;
	document.getElementById("submit").onclick = displayAnotherPage;
	document.getElementById("setting").onclick = openNewPage;
}    	

function displaySignIn() {
	document.getElementById("sign_in_form_id").style.display = "block";
}

function checkUserName() {
	var name = document.getElementById("login_username").value;
	var rule = /^\D{1,8}$/;
	var span = document.getElementById("user_msg");
	if (rule.test(name)) {
		span.style.display = "none";
		span.className = "ok";
		return true;
	}
		span.style.display = "block";
		span.className = "error";
		return false;
}

function checkPwd() {
	var pwd = document.getElementById("login_pwd").value;
	var rule_pwd = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8}$/;
	var span2 = document.getElementById("pwd_msg");
	if (!rule_pwd.test(pwd)) {
		document.getElementById("pwd_msg").style.display= "block";
		span2.className = "error";
		return false;
	}
		document.getElementById("pwd_msg").style.display = "none";
		span2.className = "ok";
		return true;
}

function check() {
	var check = checkUserName() && checkPwd();
	return check;
}

function displayAnotherPage() {
		if(check()) {
			var current = document.getElementById("sign_in");
			console.log(current);
			current.innerHTML = "<img src='images/user.png'>";
		
			var settingImage = document.getElementById("setting");
			settingImage.src = "images/settings.png";
			settingImage.style.padding = "10px";
			settingImage.style.cursor = "pointer";
	//	    document.getElementsByClassName("right-bar")[0].insertBefore(settingImage, current);
			document.getElementById("sign_in_form_id").style.display = "none";
		} else {
			document.getElementById("sign_in_form_id").style.display = "block";
		}	
		
}

function openNewPage() {
	localStorage.userName = document.getElementById("login_username").value;
	console.log(localStorage.userName);
	window.location.href="function_like.html";	
}

