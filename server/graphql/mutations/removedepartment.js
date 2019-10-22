var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var DepartmentType = require('../types/department');
var DepartmentModel = require('../../models/department');

exports.removedepartment = {
  type: DepartmentType.departmentType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(root, params) {
    const removedepartment = DepartmentModel.findByIdAndRemove(params.id).exec();
    if (!removedepartment) {
      throw new Error('Error')
    }
    return removedepartment;
  }
}