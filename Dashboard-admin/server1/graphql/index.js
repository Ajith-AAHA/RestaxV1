var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var queryType = require('./queries/level').queryType;
var mutation = require('./mutations/index');

exports.levelSchema = new GraphQLSchema({
    query:queryType,
    mutation: new GraphQLObjectType({
        name:'Mutation',
        fields:mutation
    })
})
