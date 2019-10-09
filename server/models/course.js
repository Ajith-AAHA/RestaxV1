var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courseSchema = new Schema({
    coursename:{
        type:String,
        required:true
    }
});

var Model = mongoose.model('Course',courseSchema);
module.exports = Model;