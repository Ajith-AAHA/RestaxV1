var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var LevelModel = require('../../models/level');
var levelType = require('../types/level').levelType;

// Query

exports.queryType = new GraphQLObjectType({
    name:'Query',
    fields:function(){
        return{
            levels:{
                type: new GraphQLList(levelType),
                resolve:function(){
                    const levels = LevelModel.find().exec()
                    if(!levels){
                        throw new Error('Error')
                    }
                    return levels
                }
            }
        }
    }
});