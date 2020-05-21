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
	    	let n1 = moment.duration(metricas[i]['start_time']); 
	    	let n2 = moment.duration(metricas[i]['end_time']);
	    	let newTime = n2.subtract(n1);
	    	
	    	// moment.tz(new Date(),"America/Costa_Rica").format("YYYY-MM-DD")

	        fila.insertCell().innerHTML = metricas[i]['login'];
	        fila.insertCell().innerHTML = metricas[i]['cycle_name'];
	       	fila.insertCell().innerHTML = metricas[i]['worktype'];
	        fila.insertCell().innerHTML = moment.tz(metricas[i]['fecha'],"America/Costa_Rica").format('DD-MM-YYYY');
	        fila.insertCell().innerHTML = (parseFloat(newTime.hours()) + parseFloat(newTime.minutes()/60)).toFixed(2);

	        // fila.insertCell().innerHTML = ((metricas[i]['end_time']-metricas[i]['start_time'])/60).toFixed(1);
	        // fila.insertCell().innerHTML = metricas[i]['start_token'];
	        // fila.insertCell().innerHTML = metricas[i]['end_token'];
       		fila.insertCell().innerHTML = parseInt(metricas[i]['end_token'])-parseInt(metricas[i]['start_token']);
	        fila.insertCell().innerHTML = ((parseInt(metricas[i]['end_token'])-parseInt(metricas[i]['start_token']))/(parseFloat(newTime.hours()) + parseFloat(newTime.minutes()/60))).toFixed(1);

	        let celda_editar = fila.insertCell();
	        let boton_editar = document.createElement('button');
	        boton_editar.type = 'button';

	        boton_editar.addEventListener('click', () => {
	        	localStorage.setItem('_id_metrica', metricas[i]._id);
	        	window.location.href = "editar_metrica.html";
	        	console.log(metricas[i]._id);
	        });

	        celda_editar.appendChild(boton_editar);
	        boton_editar.innerText = "Editar";


    	}
    	else if(moment(metricas[i]['fecha']).format('DD-MM-YYYY').includes(filtro)){
	        let fila = tbody.insertRow();
	        let n1 = moment.duration(metricas[i]['start_time']); 
	    	let n2 = moment.duration(metricas[i]['end_time']);
	    	let newTime = n2.subtract(n1);

	        fila.insertCell().innerHTML = metricas[i]['login'];
	        fila.insertCell().innerHTML = metricas[i]['cycle_name'];
	       	fila.insertCell().innerHTML = metricas[i]['worktype'];
	        fila.insertCell().innerHTML = moment.tz(metricas[i]['fecha'],"America/Costa_Rica").format('DD-MM-YYYY');
	        fila.insertCell().innerHTML = (parseFloat(newTime.hours()) + parseFloat(newTime.minutes()/60)).toFixed(1)
	        // fila.insertCell().innerHTML = ((metricas[i]['end_time']-metricas[i]['start_time'])/60).toFixed(1);
	        // fila.insertCell().innerHTML = metricas[i]['start_time'];
	        // fila.insertCell().innerHTML = metricas[i]['end_time'];
	        // fila.insertCell().innerHTML = metricas[i]['start_token'];
	        // fila.insertCell().innerHTML = metricas[i]['end_token'];
	        fila.insertCell().innerHTML = parseInt(metricas[i]['end_token'])-parseInt(metricas[i]['start_token']);
	        fila.insertCell().innerHTML = ((parseInt(metricas[i]['end_token'])-parseInt(metricas[i]['start_token']))/((parseInt(metricas[i]['end_time'])-parseInt(metricas[i]['start_time']))/60)).toFixed(1);
	  
    	}
      
    }

    let contador = 0;
   	const dataTable = document.getElementById("tbl-metricas");

	new TableCSVExporter(dataTable).convertToCSV();

	const btnExportToCSV = document.getElementById("btnExportToCSV");


	btnExportToCSV.addEventListener("click", () =>{

		const exporter = new TableCSVExporter(dataTable);

		const csvOutput = exporter.convertToCSV();

		const csvBlob = new Blob([csvOutput], {type: "text/csv"});

		const blobURL = URL.createObjectURL(csvBlob);

		const anchorElement = document.createElement("a");

		anchorElement.href = blobURL;

		anchorElement.download = "table-export.csv"

		anchorElement.click();

		setTimeout(()=>{
			URL.revokeObjectURL(blobURL);
		}, 500);
	});
	console.log(contador++);
};

mostrar_metricas();

inputFiltro.addEventListener('keyup',mostrar_metricas);

 class TableCSVExporter{
 	constructor(table, includeHeaders = true){

 		this.table = table;

 		this.rows = Array.from(table.querySelectorAll("tr"));

 		if (!includeHeaders && this.row[0].querySelectorAll("th").length){
 			this.rows.shift();
 		}
 	}

 	convertToCSV(){

 		const lines = [];

 		const numCols = this._findLongestRowLength();

 		for (const row of this.rows){
 			let line = "";

 			for (let i = 0; i < numCols; i++){
 				if(row.children[i] !== undefined){
 					line += TableCSVExporter.parseCell(row.children[i]);
 				}

 				line += (i !== (numCols - 1)) ? "," : "";
 			}

 			lines.push(line);
 		}

 		return lines.join("\n");
 	}

 	_findLongestRowLength(){

 		return this.rows.reduce((l, row) => row.childElementCount > l ? row.childElementCount : l, 0 );


 	}


 	static parseCell(tableCell){

 		let parsedValue = tableCell.textContent;

 		//Replace all double quotes with two double quotes
 		parsedValue = parsedValue.replace(/"/g, `""`);

 		//if value contains comma, newline or double quotes, enclose in double quotes
 		parsedValue = /[",\n]/.test(parsedValue) ? `"${parsedValue}"` : parsedValue;

 		return parsedValue;

 	}

 }






