var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLBoolean = require('graphql').GraphQLBoolean;


//faculty type

exports.facultyType = new GraphQLObjectType({
    name:'faculty',
    fields:function(){
        return{
            id:{
                type: new GraphQLNonNull(GraphQLID)
            },
            facultyname:{
                type:GraphQLString
            },
            facultyemail: {
                type:GraphQLString
            },
            pwt:{
                type:GraphQLBoolean
            },
            pwi:{
                type:GraphQLBoolean
            },
            pwc:{
                type:GraphQLBoolean
            }
        }
    }
});