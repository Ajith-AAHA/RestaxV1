var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;


//course type

exports.fcourseType = new GraphQLObjectType({
    name:'fcourse',
    fields:function(){
        return {
            id:{
                type: new GraphQLNonNull(GraphQLID)
            },
            course:{
                type:GraphQLString
            },
             academic:{
                type:GraphQLString
            },
             sname:{
                type:GraphQLString
            },
        }
    }
});