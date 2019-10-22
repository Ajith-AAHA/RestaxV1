// var addfaculty = require('./add').add;ss
// var removefaculty = require('./remove').remove;
// var updatefaculty = require('./update').update;

var addcourse = require('./addcourse').addcourse;
var removecourse = require('./removecourse').removecourse;
var updatecourse = require('./updatecourse').updatecourse;
<<<<<<< HEAD
var adddepartment = require('./adddepartment').adddepartment;
var removedepartment = require('./removedepartment').removedepartment;
var updatedepartment = require('./updatedepartment').updatedepartment;
var addlevel = require('./addlevel').addlevel;
var removelevel = require('./removelevel').removelevel;
var updatelevel = require('./updatelevel').updatelevel;
var addfcourse = require('./addfcourse').addfcourse;
var removefcourse = require('./removefcourse').removefcourse;
var updatefcourse = require('./updatefcourse').updatefcourse;
=======
var adddepartment = require('./department/adddepartments').adddepartment;
var removedepartment = require('./department/removedepartment').removedepartment;
var updatedepartment = require('./department/removedepartment').removedepartment;
var addlevel = require('./level/addlevels').addlevel;
var removelevel = require('./level/removelevel').removelevel;
var updatelevel = require('./level/updatelevel').updatelevel;
>>>>>>> 8b16ca73c587d29e516a0455ef21e3b7f5e30a37

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
<<<<<<< HEAD
  removelevel,
  updatelevel,
  addfcourse,
  removefcourse,
  updatefcourse

=======
  updatelevel,
  removelevel,
>>>>>>> 8b16ca73c587d29e516a0455ef21e3b7f5e30a37
}