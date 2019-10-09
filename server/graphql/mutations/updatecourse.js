var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var CourseType = require('../types/course');
var CourseModel = require('../../models/course');

exports.updatecourse = {
  type:CourseType.courseType,
  args:{
    id:{
      coursename:'id',
      type: new GraphQLNonNull(GraphQLString)
    },
    coursename:{
      type: new GraphQLNonNull(GraphQLString),
    }
  },
  resolve(root,params){
<<<<<<< HEAD
    return CourseModel.findByIdAndUpdate(
      params.id,{$set:{coursename:params.coursename}},function(err){
=======
    return CourseModel.findByIdAndUpdate(params.id,{coursename:params.coursename,updated_date: new Date()},function(err){
>>>>>>> 8b16ca73c587d29e516a0455ef21e3b7f5e30a37
      if (err) return next(err);
    });
  }
}