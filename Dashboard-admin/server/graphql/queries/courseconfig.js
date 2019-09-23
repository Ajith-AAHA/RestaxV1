var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var CourseModel = require('../../models/course');
var courseType = require('../types/course').courseType;
var DepartmentModel = require('../../models/department');
var departmentType = require('../types/department').departmentType;
var LevelModel = require('../../models/level');
var levelType = require('../types/level').levelType;

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

exports.queryType = new  GraphQLObjectType({
    name:'Query',
    fields:function(){
        return {
            departments:{
                type: new GraphQLList(departmentType),
                resolve:function(){
                    const departments = DepartmentModel.find().exec()
                    if(!departments){
                        throw new Error('Error')
                    }
                    return departments
                }
            }
        }
    }
});

exports.queryType = new  GraphQLObjectType({
    name:'Query',
    fields:function(){
        return {
            levels:{
                type: new GraphQLList(levelType),
                resolve:function(){
                    const levels = LevelModel.find().exec()
                    if(!levels){
                        throw new Error('Error')
                    }
                    return levels;
                }
            }
        }
    }
});
