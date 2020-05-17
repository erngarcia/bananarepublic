'use strict';

const express = require('express');
const router = express.Router();
const Ciclos = require('../models/ciclos.model');

router.post('/registrar-ciclo',(req,res) =>{

	let body = req.body;

	let nuevo_ciclo = new Ciclos({
		cycle_name:body.cycle_name,
		locale:body.locale,
		worktype:body.worktype,		
		tokens:body.tokens
	});
	nuevo_ciclo.save((err, ciclosDB)=>{
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
				ciclosDB
			});
		}

	});
});

router.get('/listar-ciclos',(req,res) =>{
	Ciclos.find((err,lista_ciclos) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudieron listar los ciclos',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los ciclos se listaron adecuadamente',
                lista_ciclos
            });
        }
	})
});

module.exports  = router;