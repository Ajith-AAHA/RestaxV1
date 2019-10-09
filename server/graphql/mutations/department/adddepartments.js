var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var DepartmentType = require('../../types/department');
var DepartmentModel = require('../../../models/department');

exports.adddepartment ={
    type: DepartmentType.departmentType,
    args:{
        departmentname:{
            type: new GraphQLNonNull(GraphQLString),
        },
        shortcode:{
            type: new GraphQLNonNull(GraphQLString),
        }
    },
    resolve(root,params){
        const dModel = new DepartmentModel(params);
        const newDepartment = dModel.save();
        if(!newDepartment){
            throw new Error ('Error');
        }
    }
}