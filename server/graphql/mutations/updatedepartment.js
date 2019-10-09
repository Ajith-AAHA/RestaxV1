var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var DepartmentType = require('../types/department');
var DepartmentModel = require('../../models/department');

exports.updatedepartment = {
    type:DepartmentType.departmentType,
    args:{
        id:{
            departmentname:'id',
            type:new GraphQLNonNull(GraphQLString),
        },
        // id:{
        //     shortcode:'id',
        //     type: new GraphQLNonNull(GraphQLString),
        // },
        departmentname:{
            type:new GraphQLNonNull(GraphQLString),
        },
        shortcode:{
            type: new GraphQLNonNull(GraphQLString),
        }
    },
    resolve(root,params){
        return DepartmentModel.findByIdAndUpdate(
            params.id,
            {$set:{departmentname:params.departmentname,shortcode:params.shortcode} },
            {new:true}
        )
        .catch(err=> new Error(err));
    }
}