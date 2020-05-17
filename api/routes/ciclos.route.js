const express = require('express');

const router = express.Router();
const Ciclos = require('../models/ciclos.model');

router.post('/registrar-ciclo',(req,res) =>{
	let body = req.body;

	let nuevo_ciclo = new Ciclo({
		cycle_name:body.cycle_name,
		locale:body.locale,
		worktype:body.worktype,		
		tokens:body.tokens
	});
	nueva_metrica.save((err, metricasDB)=>{
		if(err){
			res.json({
				resultado:false,
				msj: 'No se pudo registrar el ciclo',
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
