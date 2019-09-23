// var addfaculty = require('./add').add;ss
// var removefaculty = require('./remove').remove;
// var updatefaculty = require('./update').update;

var addcourse = require('./addcourse').addcourse;
var removecourse = require('./removecourse').removecourse;
var updatecourse = require('./updatecourse').updatecourse;
var adddepartment = require('./adddepartment').adddepartment;
var removedepartment = require('./removedepartment').removedepartment;
var updatedepartment = require('./updatedepartment').updatedepartment;
var addlevel = require('./addlevel').addlevel;
var removelevel = require('./removelevel').removelevel;
var updatelevel = require('./updatelevel').updatelevel;

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