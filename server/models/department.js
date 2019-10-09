var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var departmentSchema = new Schema({
    departmentname: {
        type:String,
        required:true
    },
    shortcode: {
        type:String,
        required:true
    },
});

var Model = mongoose.model('department',departmentSchema);
module.exports = Model;