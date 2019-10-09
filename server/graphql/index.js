var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
<<<<<<< HEAD
var queryType = require('./queries/fcourse').queryType;
var mutation = require('./mutations/index');

exports.fcourseSchema = new GraphQLSchema({
=======
var queryType = require('./queries/course').queryType;
var mutation = require('./mutations/index');


exports.courseSchema = new GraphQLSchema({
>>>>>>> 8b16ca73c587d29e516a0455ef21e3b7f5e30a37
    query:queryType,
    mutation: new GraphQLObjectType({
        name:'Mutation',
        fields:mutation
    })
<<<<<<< HEAD
})
=======
})
>>>>>>> 8b16ca73c587d29e516a0455ef21e3b7f5e30a37
