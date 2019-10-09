var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var FcourseType = require('../types/fcourse');
var FcourseModel = require('../../models/fcourse');

exports.updatefcourse = {
  type: FcourseType.fcourseType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString),
    },
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
  resolve(root, params) {
   return FcourseModel.findByIdAndUpdate(
       params.id,
       {$set:{course:params.course,academic:params.academic,sname:params.sname}},
       {new:true}
   )
   .catch(err=> new Error(err));
}
}