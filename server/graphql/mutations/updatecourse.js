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
    return CourseModel.findByIdAndUpdate(
      params.id,{$set:{coursename:params.coursename}},function(err){
      if (err) return next(err);
    });
  }
}