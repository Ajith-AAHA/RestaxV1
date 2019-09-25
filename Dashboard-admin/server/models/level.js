var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var levelSchema = new Schema({
    levelname:{
        type:String,
        required:true
    },
    levelshortcode:{
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
    }
});

var Model = mongoose.model('Level',levelSchema);
module.exports = Model;