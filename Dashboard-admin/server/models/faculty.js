
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var facultySchema = new Schema({
    facultyname: {
        type:String,
        required:true
    },
    facultyemail: {
        type:String,
        required:true
    },
    pwt:{
        type:Boolean,
        required:true
    },
    pwi:{
        type:Boolean,
        required:true
    },
    pwc:{
        type:Boolean,
        required:true
    }

});

var Model = mongoose.model('faculty',facultySchema);
module.exports = Model;