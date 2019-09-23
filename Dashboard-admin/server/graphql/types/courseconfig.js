var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;

exports.courseconfigType = new GraphQLObjectType({
    name:'courseconfig',
    fields:function(){
        return {
            id:{
                type: new GraphQLNonNull(GraphQLID)
            },
            coursename:{
                type: GraphQLString
            },
            departmentname:{
                type:GraphQLString
            },
            shortcode:{
                type: GraphQLString
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
})