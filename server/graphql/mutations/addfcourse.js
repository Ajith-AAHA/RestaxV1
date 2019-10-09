var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLBoolean = require('graphql').GraphQLBoolean;
var FcourseType = require('../types/fcourse');
var FcourseModel = require('../../models/fcourse');

exports.addfcourse = {
    type: FcourseType.fcourseType,
    args:{
        
 course:{
        type: new GraphQLNonNull(GraphQLString), 
    },
    academic:{
         type: new GraphQLNonNull(GraphQLString), 
    },
    sname:{
       type: new GraphQLNonNull(GraphQLString), 
    },
    },

    resolve(root,params){
        const fmodel = new FcourseModel(params);
        const newFcourse = fmodel.save();
        if(!newFcourse){
            throw new Error('Error');
        }
        return newFcourse
    }
  
}