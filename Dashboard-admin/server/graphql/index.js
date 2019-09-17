var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var queryType = require('./queries/course').queryType;
var mutation = require('./mutations/index');


exports.courseSchema = new GraphQLSchema({
    query:queryType,
    mutation: new GraphQLObjectType({
        name:'Mutation',
        fields:mutation
    })
})