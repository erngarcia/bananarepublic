'use strict';

const botonSubmit = document.querySelector('#boton');
let cycle_name = document.querySelector('#cycle_name')
let lista_locale = document.querySelector('#slt-locale');
let lista_worktype = document.querySelector('#slt-worktype');
let input_tokens = document.querySelector('#tokens');



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

			let sPCycleName = cycle_name.value;
			let sPLocale = lista_locale.value;
			let sPWorktype = lista_worktype.value;
			let sPtokens = input_tokens.value;

		console.log(lista_locale.value);
		console.log(lista_worktype.value)
		registrarCiclo(sPCycleName, sPLocale, sPWorktype, sPtokens);
	}
}
'use strict';
const tbody = document.querySelector('#tbl-metricas tbody');
const inputFiltro = document.querySelector('#txtfiltro');



let mostrar_ciclos = async() => {
	let ciclos = await listar_ciclos();

    tbody.innerHTML = '';

    for (let i = 0; i < ciclos.length; i++) {

    	
	    	let fila = tbody.insertRow();
	        fila.insertCell().innerHTML = ciclos[i]['cycle_name'];
	        fila.insertCell().innerHTML = ciclos[i]['locale'];
	       	fila.insertCell().innerHTML = ciclos[i]['worktype'];
	        fila.insertCell().innerHTML = ciclos[i]['tokens'];

    	}

};

mostrar_ciclos();

botonSubmit.addEventListener('click', obtener_datos);