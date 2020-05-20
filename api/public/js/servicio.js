'use strict';

let registrarDatos = async (plogin, pcycle_name, pWorktype, pFecha, pStarttime, pEndtime, pStarttoken, pEndtoken) => {

    await axios({
            method: 'post',
            url: 'https://linguisticservices.herokuapp.com/api/registrar-metricas',
            responseType: 'json',
            data: {
                login: plogin,
                cycle_name: pcycle_name,
                worktype: pWorktype,
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
                    console.log('Ya se registro ese dato');
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

let listar_metricas = async() => {

    let metricas;

    await axios({
            method: 'get',
            url: 'https://linguisticservices.herokuapp.com/api/listar-metricas',
            responseType: 'json'
        }).then(function(res) {
            metricas = res.data.lista_metricas;
        })
        .catch(function(err) {
            console.log(err);
        });

    return metricas;
};

let obtener_metrica_id = async(_id) =>{
    try {
        const response = await axios({
            method:'get',
            params: {_id:_id},
            url: 'https://linguisticservices.herokuapp.com/api/buscar-metrica-id',
            responseType: 'json'
        });
        return response.data._id;

    } catch (error){
        console.log(error);
    }
}

let modificar_metrica = async(p_id, plogin, pcycle_name, pWorktype, pFecha, pStarttime, pEndtime, pStarttoken, pEndtoken) =>{
    await axios({
            method: 'put',
            url: 'https://linguisticservices.herokuapp.com/api/modificar-metrica',
            responseType: 'json',
            data: {
                _id: p_id,
                login: plogin,
                cycle_name: pcycle_name,
                worktype: pWorktype,
                fecha: pFecha,
                start_time: pStarttime,
                end_time: pEndtime,
                start_token: pStarttoken,
                end_token: pEndtoken
            }

    }).then(function(res) {
        console.log('modificado con exito');

        window.location.href = 'historiallsbananarep.html'
    })
    .catch(function(err) {
        console.log(err);
    });
}

let registrarCiclo = async (pcycle_name, pLocale, pWorktype, pTokens) => {

    await axios({
            method: 'post',
            url: 'https://linguisticservices.herokuapp.com/api/registrar-ciclo',           
            // url: 'https://linguisticservices.herokuapp.com/api/registrar-ciclo',
            responseType: 'json',
            data: {
                cycle_name: pcycle_name,
                locale: pLocale,
                worktype: pWorktype,
                tokens: pTokens,
            }

    }).then(function(res) {
    
        if (res.data.resultado == false) {
            switch (res.data.err.code) {
                case 11000:
                    console.log('Ya se registro ese dato');
                    Swal.fire({
                        title: 'No se han podido enviar sus datos',
                        text: 'Ya se registró ese dato',
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

let listar_ciclos = async() => {

    let ciclos;

    await axios({
            method: 'get',
            url: 'https://linguisticservices.herokuapp.com/api/listar-ciclos',
            responseType: 'json'
        }).then(function(res) {
            ciclos = res.data.lista_ciclos;
        })
        .catch(function(err) {
            console.log(err);
        });

    return ciclos;
};

