var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;


//department type

exports.departmentType = new GraphQLObjectType({
    name:'departments',
    fields:function(){
        return{
            id:{
                type: new GraphQLNonNull(GraphQLID)
            },
            departmentname:{
                type:GraphQLString
            },
            shortcode: {
                type:GraphQLString
            },
        }
    }
});