var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var CourseModel = require('../../models/course');
var courseType = require('../types/course').courseType;

//Query


exports.queryType = new GraphQLObjectType({
    name:'Query',
    fields:function(){
        return{
            courses:{
                type: new GraphQLList(courseType),
                resolve:function(){
                    const courses = CourseModel.find().exec()
                    if(!courses){
                        throw new Error('Error')
                    }
                    return courses
                }
            }
        }
    }
});