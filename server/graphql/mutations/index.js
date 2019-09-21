// var addfaculty = require('./add').add;ss
// var removefaculty = require('./remove').remove;
// var updatefaculty = require('./update').update;

var addcourse = require('./addcourse').addcourse;
var removecourse = require('./removecourse').removecourse;
var updatecourse = require('./updatecourse').updatecourse;
var adddepartment = require('./department/adddepartments').adddepartment;
var removedepartment = require('./department/removedepartment').removedepartment;
var updatedepartment = require('./department/removedepartment').removedepartment;
var addlevel = require('./level/addlevels').addlevel;
var removelevel = require('./level/removelevel').removelevel;
var updatelevel = require('./level/updatelevel').updatelevel;

module.exports = {
  // addfaculty,
  // removefaculty,
  // updatefaculty,
  addcourse,
  removecourse,
  updatecourse,
  adddepartment,
  removedepartment,
  updatedepartment,
  addlevel,
  updatelevel,
  removelevel,
}