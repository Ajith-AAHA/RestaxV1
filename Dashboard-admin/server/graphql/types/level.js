var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;


//faculty type

exports.levelType = new GraphQLObjectType({
    name:'levels',
    fields:function(){
        return{
            id:{
                type: new GraphQLNonNull(GraphQLID)
            },
            levelname:{
                type:GraphQLString
            },
            levelshortcode: {
                type:GraphQLString
            },
            year:{
                type:GraphQLString
            },
            terms:{
                type:GraphQLString
            },
            
        }
    }
});