'use strict';
const tbody = document.querySelector('#tbl-metricas tbody');

let mostrar_metricas = async() => {
    let metricas = await listar_metricas();
    tbody.innerHTML = '';

    for (let i = 0; i < metricas.length; i++) {
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = metricas[i]['cycle_name'];
        fila.insertCell().innerHTML = metricas[i]['fecha'];
        fila.insertCell().innerHTML = metricas[i]['start_time'];
        fila.insertCell().innerHTML = metricas[i]['end_time'];
        fila.insertCell().innerHTML = metricas[i]['start_token'];
        fila.insertCell().innerHTML = metricas[i]['end_token'];
    }
};

mostrar_metricas();