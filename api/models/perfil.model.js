'use strict';

const mongoose = require('mongoose');


const schema_metricas = new mongoose.Schema({
	login: {type: String,required:true, unique:false},	
	cycle_name: {type: String,required:true, unique:false},	
	worktype: {type: String, required:true, unique:false},
	fecha: {type: Date, required:true, unique:false},
	start_time: {type: String,required:true, unique:false},
	end_time:{type:String, required:true, unique:false},
	start_token:{type:String, required:true, unique:false},
	end_token:{type:String, required:true, unique:false},
});

module.exports = mongoose.model('Metricas', schema_metricas, 'metricas');