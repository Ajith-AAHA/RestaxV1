var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var DepartmentModel = require('../../models/department');
var departmentType = require('../types/department').departmentType;

//Query

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
