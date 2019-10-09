var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var FacultyType = require('../types/faculty');
var FacultyModel = require('../../models/faculty');

exports.update = {
  type: FacultyType.facultyType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString),
    },
    facultyname: {
      type: new GraphQLNonNull(GraphQLString),
    },
    facultyemail:{
        type: new GraphQLNonNull(GraphQLString),
    },
    pwt:{
        type: new GraphQLNonNull(GraphQLString),
    },
    pwi:{
        type: new GraphQLNonNull(GraphQLString),
    },
    pwc:{
        type: new GraphQLNonNull(GraphQLString)
    },
  },
  resolve(root, params) {
   return FacultyModel.findByIdAndUpdate(
       params.id,
       {$set:{facultyname:params.facultyname,facultyemail:params.facultyemail,pwt:params.pwt,pwi:params.pwi,pwc:params.pwc}},
       {new:true}
   )
   .catch(err=> new Error(err));
}
}