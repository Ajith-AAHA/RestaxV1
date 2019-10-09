var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var CourseType = require('../types/course');
var CourseModel = require('../../models/course');

exports.addcourse ={
    type: CourseType.courseType,
    args:{
        coursename:{
            type: new GraphQLNonNull(GraphQLString),
        }
    },
    resolve(root,params){
        const cModel = new CourseModel(params);
        const newCourse = cModel.save();
        if(!newCourse){
            throw new Error ('Error');
        }
        return newCourse
    }
}