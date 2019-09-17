var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var LevelType = require('../../types/level');
var LevelModel = require('../../../models/level');

exports.removelevel = {
  type: LevelType.levelType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(root, params) {
    const removelevel = LevelModel.findByIdAndRemove(params.id).exec();
    if (!removelevel) {
      throw new Error('Error')
    }
    return removelevel;
  }
}