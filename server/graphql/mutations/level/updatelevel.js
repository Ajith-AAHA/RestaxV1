var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var LevelType = require('../../types/level');
var LevelModel = require('../../../models/level');

exports.updatelevel = {
  type: LevelType.levelType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString),
    },
    levelname: {
      type: new GraphQLNonNull(GraphQLString),
    },
    levelshortcode:{
        type: new GraphQLNonNull(GraphQLString),
    },
    year:{
        type: new GraphQLNonNull(GraphQLString),
    },
    terms:{
        type: new GraphQLNonNull(GraphQLString),
    },
   
  },
  resolve(root, params) {
   return LevelModel.findByIdAndUpdate(
       params.id,
       {$set:{levelname:params.levelname,levelshortcode:params.levelshortcode,year:params.year,terms:params.terms}},
       {new:true}
   )
   .catch(err=> new Error(err));
}
}