var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var LevelModel = require('../../models/levels');
var levelsType = require('../types/levels').levelsType;

//Query

exports.queryType = new  GraphQLObjectType({
    name:'Query',
    fields:function(){
        return {
            levels:{
                type: new GraphQLList(levelsType),
                resolve:function(){
                    const levels = LevelModel.find().exec()
                    if(!levels){
                        throw new Error('Error')
                    }
                    return levels;
                }
            }
        }
    }
});
