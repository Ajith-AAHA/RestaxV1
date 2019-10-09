var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var FcourseType = require('../types/fcourse');
var FcourseModel = require('../../models/fcourse');

exports.removefcourse = {
  type: FcourseType.fcourseType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(root, params) {
    const removedfcourse = FcourseModel.findByIdAndRemove(params.id).exec();
    if (!removedfcourse) {
      throw new Error('Error')
    }
    return removedfcourse;
  }
}