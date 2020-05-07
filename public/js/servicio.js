'use strict';

let registrarDatos = async (pcycle_name,pFecha, pStarttime, pEndtime, pStarttoken, pEndtoken) => {

    await axios({
            method: 'post',
            url: 'http://localhost:3000/api/registrar-metricas',
            responseType: 'json',
            data: {
                cycle_name: pcycle_name,
            	fecha: pFecha,
                start_time: pStarttime,
                end_time: pEndtime,
                start_token: pStarttoken,
                end_token: pEndtoken
            }

    }).then(function(res) {
    
        if (res.data.resultado == false) {
            switch (res.data.err.code) {
                case 11000:
                    console.log('Ya se registró ese dato');
                    Swal.fire({
                        title: 'No se han podido enviar sus datos',
                        text: 'Ya se registró esa caracteristica',
                        icon: 'warning'
                    })
                break;
            }
        }
    })
    .catch(function(err) {
        console.log(err);
    });
};

'use strict';
let listar_metricas = async() => {
    let metricas;

    await axios({
            method: 'get',
            url: 'http://localhost:3000/api/listar-metricas',
            responseType: 'json'
        }).then(function(res) {
            productos = res.data.metricas;
        })
        .catch(function(err) {
            console.log(err);
        });

    return metricas;
};