'use strict';

const mongoose = require('mongoose');


const schema_metricas = new mongoose.Schema({
	login: {type: String,required:true, unique:false},	
	cycle_name: {type: String,required:true, unique:false},	
	fecha: {type: Date, required:true, unique:false},
	start_time: {type: String,required:true,unique:true},
	end_time:{type:String, required:true, unique:false},
	start_token:{type:String, required:true,unique:false},
	end_token:{type:String, required:true, unique:false},
	login:{type:String, required:false,unique:false}
});

module.exports = mongoose.model('Metricas', schema_metricas, 'metricas');