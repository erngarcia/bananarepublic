'use strict';

const botonSubmit = document.querySelector('#boton');
let inputFecha = document.querySelector('#fecha');
let inputStartToken = document.querySelector('#startToken');
let inputEndToken = document.querySelector('#endToken');
let inputStartTime = document.querySelector('#startTime');
let inputEndTime = document.querySelector('#endTime');
let inputLogin = document.querySelector('#login');
let inputCycleName = document.querySelector('#cycle_name');
let inputWorktype = document.querySelector('#slt-worktype');
let inputLocale = document.querySelector('#locale');

const tbody = document.querySelector('#tbl-metricas tbody');
const inputFiltro = document.querySelector('#txtfiltro');

inputFecha.value = moment.tz(new Date(),"America/Costa_Rica").format("YYYY-MM-DD");

let validar = () =>{
	let error = false;
	let campos_requeridos = document.querySelectorAll('#form [required]');
	let n1 = moment.duration(inputStartTime.value); 
	let n2 = moment.duration(inputEndTime.value)



	for(let i=0; i<campos_requeridos.length; i++){
		if(campos_requeridos[i].value == ""){
			campos_requeridos[i].classList.add('input');
			error = true;
		}else{
			campos_requeridos[i].classList.remove('input');
		}
	}

    if(new Date(inputFecha.value) >= new Date()){
            inputFecha.classList.add('input');
            error = true;
        }else{
			inputFecha.classList.remove('input');
		}
	if(inputFecha.value == ""){
            inputFecha.classList.add('input');
            error = true;
        }else{
			inputFecha.classList.remove('input');
		}
	
    if((parseFloat(n1.hours()+n1.minutes())) >= (parseFloat(n2.hours()+n2.minutes()))) {
            inputStartTime.classList.add('input');
            error = true;
        }else{
			inputStartTime.classList.remove('input');
		}

    if(parseInt(inputStartToken.value) > parseInt(inputEndToken.value)) {
            inputStartToken.classList.add('input');
            error = true;
        }else{
			inputStartToken.classList.remove('input');
		}

	return error;
};
let obtener_datos = () => {

	let error = validar();

	if(error){
		Swal.fire({
			'title': 'Sus datos no se pudieron enviar',
			'text' : 'Revise los campos rojos',
			'icon': 'warning'
			})

	}else{
			Swal.fire({
			'title': 'Sus datos se enviaron correctamente',
			'text' : 'Excelente',
			'icon':'success'
			})
		 let sPLogin = inputLogin.value;
		 let sPCycleName = inputCycleName.value;
		 let sPfecha = inputFecha.value;
		 let sPworktype = inputWorktype.value;
		 let sPlocale = inputLocale.value;
		 let sPstarttime = inputStartTime.value;
		 let sPendtime = inputEndTime.value;
		 let sPstarttoken = inputStartToken.value;
		 let sPendtoken = inputEndToken.value;
		 
		 let datosAceptados = false;

		 if(sPworktype == "break"){
		 	sPstarttoken = "0";
		 	sPendtoken = "0";
		 }
		 if(sPworktype == "project"){
		 	sPstarttoken = "0";
		 	sPendtoken = "0";
		 }
		 if(sPworktype == "meeting"){
		 	sPstarttoken = "0";
		 	sPendtoken = "0";
		 }


		 registrarDatos(sPLogin, sPCycleName, sPworktype, sPfecha, sPlocale, sPstarttime, sPendtime, sPstarttoken, sPendtoken);



		 // registroALista(sPfecha, sPnombretarea, sPdescripciontarea,sPprioridad,sPencargado);
	}
}

let mostrar_ciclos = async() => {
	let ciclos = await listar_ciclos();
	let filtro = inputFiltro.value;
    tbody.innerHTML = '';

    for (let i = 0; i < ciclos.length; i++) {

    	if(ciclos[i]["locale"].includes(filtro)){
	    	let fila = tbody.insertRow();
	        fila.insertCell().innerHTML = ciclos[i]['cycle_name'];
	        fila.insertCell().innerHTML = ciclos[i]['locale'];
	       	fila.insertCell().innerHTML = ciclos[i]['worktype'];
	        fila.insertCell().innerHTML = ciclos[i]['tokens'];
	    }

   	}

};

mostrar_ciclos();
inputFiltro.addEventListener('click',mostrar_ciclos);

botonSubmit.addEventListener('click', obtener_datos);