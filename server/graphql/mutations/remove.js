var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var CourseType = require('../types/course');
var CourseModel = require('../../models/course');

exports.removecourse = {
  type: CourseType.courseType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(root, params) {
    const removedcourse = CourseModel.findByIdAndRemove(params.id).exec();
    if (!removedcourse) {
      throw new Error('Error')
    }
    return removedcourse;
  }
}