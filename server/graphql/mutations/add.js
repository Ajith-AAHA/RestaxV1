var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLBoolean = require('graphql').GraphQLBoolean;
var FacultyType = require('../types/faculty');
var FacultyModel = require('../../models/faculty');

exports.add = {
    type: FacultyType.facultyType,
    args:{
        facultyname:{
            type: new GraphQLNonNull(GraphQLString), 
        },
        facultyemail:{
            type: new GraphQLNonNull(GraphQLString),
        },
        pwt:{
            type:new GraphQLNonNull(GraphQLBoolean),
        },
        pwi:{
            type: new GraphQLNonNull(GraphQLBoolean),
        },
        pwc:{
            type: new GraphQLNonNull(GraphQLBoolean),
        }
    },

    resolve(root,params){
        const fmodel = new FacultyModel(params);
        const newFaculty = fmodel.save();
        if(!newFaculty){
            throw new Error('Error');
        }
        return newFaculty
    }
  
}