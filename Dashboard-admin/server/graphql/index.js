var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var queryType = require('./queries/department').queryType;
var mutation = require('./mutations/index');

exports.departmentSchema = new GraphQLSchema({
    query:queryType,
    mutation: new GraphQLObjectType({
        name:'Mutation',
        fields:mutation
    })
})
