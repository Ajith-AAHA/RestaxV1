var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var FacultyModel = require('../../models/faculty');
var facultyType = require('../types/faculty').facultyType;

//Query

exports.queryType = new  GraphQLObjectType({
    name:'Query',
    fields:function(){
        return {
            faculties:{
                type: new GraphQLList(facultyType),
                resolve:function(){
                    const faculties = FacultyModel.find().exec()
                    if(!faculties){
                        throw new Error('Error')
                    }
                    return faculties
                }
            }
        }
    }
});
