var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var queryType = require('./queries/fcourse').queryType;
var mutation = require('./mutations/index');

exports.fcourseSchema = new GraphQLSchema({
    query:queryType,
    mutation: new GraphQLObjectType({
        name:'Mutation',
        fields:mutation
    })
})
