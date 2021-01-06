'use strict'

let login = document.querySelector('#login');
let pswd = document.querySelector('#password');
const boton = document.querySelector('#boton');

let login_form = () => {
	if (login.value == "linguistic services" && pswd.value == "linguistparty"){
		window.location.href = "ladingbaseinput.html"
	}else{
		alert("Wrong user name or password")
	}
};

boton.addEventListener('click', login_form);
