
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var levelsSchema = new Schema({
    levelname: {
        type:String,
        required:true
    },
    levelshortcode: {
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    terms:{
        type:String,
        required:true
    },
    

});

var Model = mongoose.model('level',levelsSchema);
module.exports = Model;