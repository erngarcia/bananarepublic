'use strict';

const mongoose = require('mongoose');


const schema_ciclos = new mongoose.Schema({
	cycle_name: {type: String,required:true, unique:true},	
	locale: {type: String,required:true, unique:false},	
	worktype: {type: String, required:true, unique:false},
	tokens: {type: String,required:true,unique:false}
});

module.exports = mongoose.model('Ciclos', schema_ciclos, 'ciclos');