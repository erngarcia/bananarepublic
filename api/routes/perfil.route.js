'use strict';

const express = require('express');

const router = express.Router();
const Metricas = require('../models/perfil.model');

router.post('/registrar-metricas',(req,res) =>{
	let body = req.body;

	let nueva_metrica = new Metricas({
		login: body.login,
		cycle_name:body.cycle_name,
		worktype:body.worktype,
		fecha: body.fecha,
		start_time: body.start_time,
		end_time: body.end_time,
		start_token: body.start_token,
		end_token: body.end_token
	});
	nueva_metrica.save((err, metricasDB)=>{
		if(err){
			res.json({
				resultado:false,
				msj: 'No se pudo registrar la metrica',
				err
			});
		}else{
				res.json({
				resultado:true,
				msj: 'Los datos se enviaron con éxito',
				metricasDB
			});
		}

	});
});

router.get('/listar-metricas',(req,res) =>{
	Metricas.find((err,lista_metricas) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudieron registrar las metricas',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Las metricas se listaron adecuadamente',
                lista_metricas
            });
        }
	})
});

router.get('/buscar-metrica-id', function(req,res){
	let _id = req.query._id;

	Metricas.findOne({_id:_id}, (err, metricasDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudieron registrar las metricas',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Las metricas se listaron adecuadamente',
                _id:metricasDB
            });
		}
	})
});

router.put('/modificar-metrica', function(req,res){
	let body = req.body;

	Metricas.updateOne({_id:body._id},{
		$set:req.body
	},
		function(err, metricas){
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo modificar las metricas',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Las metricas se modificaron adecuadamente',
                metricas: metricas
            });
		}
	})
});



module.exports  = router;