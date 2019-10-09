var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var FcourseModel = require('../../models/fcourse');
var fcourseType = require('../types/fcourse').fcourseType;

//Query


exports.queryType = new GraphQLObjectType({
    name:'Query',
    fields:function(){
        return{
            courses:{
                type: new GraphQLList(fcourseType),
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