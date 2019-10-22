var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var LevelType = require('../types/level');
var LevelModel = require('../../models/level');

exports.addlevel = {
    type:LevelType.levelType,
    args:{
       levelname:{
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
       }
    },

resolve(root,params) {
const lModel = new LevelModel(params);
const newLevel = lModel.save();
if(!newLevel){
    throw new Error('Error');
}
return newLevel
}
}
