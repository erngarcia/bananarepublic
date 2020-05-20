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

const tbody = document.querySelector('#tbl-metricas tbody');
const inputFiltro = document.querySelector('#txtfiltro');

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

    if(parseInt(inputStartToken.value) >= parseInt(inputEndToken.value)) {
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
		 let sPworktype = inputWorktype.value;
		 let datosAceptados = false;

		 registrarDatos(sPLogin, sPCycleName, sPworktype, sPfecha, sPstarttime, sPendtime, sPstarttoken, sPendtoken);

		 let n1 = moment.duration(inputStartTime.value);
		 let n2 = moment.duration(inputEndTime.value);
		 let nuevo = n2.subtract(n1);
		 console.log((parseFloat(nuevo.hours())));
		 console.log(parseFloat(nuevo.minutes()/60));
		 console.log((parseFloat(nuevo.hours()) + parseFloat(nuevo.minutes()/60)));

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