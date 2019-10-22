var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fcourseSchema = new Schema({
    course:{
        type:String,
        required:true
    },
    academic:{
        type:String,
        required:true
    },
    sname:{
        type:String,
        required:true
    },
});

var Model = mongoose.model('Fcourse',fcourseSchema);
module.exports = Model;