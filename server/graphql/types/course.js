var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;


//course type

exports.courseType = new GraphQLObjectType({
    name:'course',
    fields:function(){
        return {
            id:{
                type: new GraphQLNonNull(GraphQLID)
            },
            coursename:{
                type:GraphQLString
            }
        }
    }
});