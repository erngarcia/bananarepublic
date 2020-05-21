'use strict';

let _id = localStorage.getItem("_id_metrica");

const botonSubmit = document.querySelector('#boton');

let _id2;
let inputFecha = document.querySelector('#fecha');
let inputStartToken = document.querySelector('#startToken');
let inputEndToken = document.querySelector('#endToken');
let inputStartTime = document.querySelector('#startTime');
let inputEndTime = document.querySelector('#endTime');
let inputLogin = document.querySelector('#login');
let inputCycleName = document.querySelector('#cycle_name');
let inputWorktype = document.querySelector('#slt-worktype');


console.log(_id);

let llenar_campos = async() =>{
	let metricas = await obtener_metrica_id(_id);
	_id2 = metricas._id;
	inputFecha.value = moment(metricas.fecha).format('YYYY-MM-DD');
	inputStartToken.value = metricas.start_token;
	inputEndToken.value = metricas.end_token;
	inputStartTime.value = metricas.start_time;
	inputEndTime.value = metricas.end_time;
	inputLogin.value = metricas.login;
	inputCycleName.value = metricas.cycle_name;
	inputWorktype.value = metricas.worktype;

	console.log(metricas);
};
let validar = () =>{
	let error = false;
	let campos_requeridos = document.querySelectorAll('#form [required]');

	for(let i=0; i<campos_requeridos.length; i++){
		if(campos_requeridos[i].value == ''){
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

    if((parseInt(inputStartTime.value)) >= (parseInt(inputEndTime.value))) {
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
		 let sPstarttime = inputStartTime.value;
		 let sPendtime = inputEndTime.value;
		 let sPstarttoken = inputStartToken.value;
		 let sPendtoken = inputEndToken.value;
		 let sPWorktype = inputWorktype.value;

		 if(sPWorktype == "break"){
		 	sPstarttoken = "0";
		 	sPendtoken = "0";
		 }
		 if(sPWorktype == "project"){
		 	sPstarttoken = "0";
		 	sPendtoken = "0";
		 }
		 if(sPWorktype == "meeting"){
		 	sPstarttoken = "0";
		 	sPendtoken = "0";
		 }



		 let datosAceptados = false;

		 modificar_metrica(_id2, sPLogin, sPWorktype, sPCycleName, sPfecha, sPstarttime, sPendtime, sPstarttoken, sPendtoken);
		 // registroALista(sPfecha, sPnombretarea, sPdescripciontarea,sPprioridad,sPencargado);
	}
}
llenar_campos();

botonSubmit.addEventListener('click', obtener_datos);




