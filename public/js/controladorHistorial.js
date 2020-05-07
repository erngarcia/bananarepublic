'use strict';
const tbody = document.querySelector('#tbl-metricas tbody');
const inputFiltro = document.querySelector('#txtfiltro');



let mostrar_metricas = async() => {
	let metricas = await listar_metricas();
	let filtro = inputFiltro.value;

    tbody.innerHTML = '';

    for (let i = 0; i < metricas.length; i++) {
    	if(metricas[i]['login'].includes(filtro)){
	    	let fila = tbody.insertRow();
	        fila.insertCell().innerHTML = metricas[i]['login'];
	        fila.insertCell().innerHTML = metricas[i]['cycle_name'];
	        fila.insertCell().innerHTML = moment(metricas[i]['fecha']).format('DD-MM-YYYY');
	        fila.insertCell().innerHTML = metricas[i]['start_time'];
	        fila.insertCell().innerHTML = metricas[i]['end_time'];
	        fila.insertCell().innerHTML = metricas[i]['start_token'];
	        fila.insertCell().innerHTML = metricas[i]['end_token'];
	        fila.insertCell().innerHTML = ((parseInt(metricas[i]['end_token'])-parseInt(metricas[i]['start_token']))/(parseInt(metricas[i]['end_time'])-parseInt(metricas[i]['start_time']))).toFixed(2);
	        fila.insertCell().innerHTML = parseInt(metricas[i]['end_token'])-parseInt(metricas[i]['start_token']);
    	}
    	else if(metricas[i]['fecha'].includes(filtro)){
	    	let fila = tbody.insertRow();
	        fila.insertCell().innerHTML = metricas[i]['login'];
	        fila.insertCell().innerHTML = metricas[i]['cycle_name'];
	        fila.insertCell().innerHTML = moment(metricas[i]['fecha']).format('DD-MM-YYYY');
	        fila.insertCell().innerHTML = metricas[i]['start_time'];
	        fila.insertCell().innerHTML = metricas[i]['end_time'];
	        fila.insertCell().innerHTML = metricas[i]['start_token'];
	        fila.insertCell().innerHTML = metricas[i]['end_token'];
	        fila.insertCell().innerHTML = (parseInt(metricas[i]['end_token'])-parseInt(metricas[i]['start_token']))/(parseInt((metricas[i]['end_time'])-parseInt(metricas[i]['start_time']))/60).toFixed(1);
	        fila.insertCell().innerHTML = (metricas[i]['end_token']-metricas[i]['start_token']);
    	}
        
    }
};

mostrar_metricas();

inputFiltro.addEventListener('keyup',mostrar_metricas);



