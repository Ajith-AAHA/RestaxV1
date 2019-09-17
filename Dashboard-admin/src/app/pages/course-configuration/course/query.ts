'use strict';

import gql from 'graphql-tag';

export const addcourse = gql`
  mutation addcourse($coursename: String!) {
    addcourse(
      coursename: $coursename,
    ) {
      id
      coursename
    }
  }
`;

export const courses = gql`
  query {
    courses{
      id
      coursename
    }
  }`;

export const removecourse = gql`
  mutation removecourse($id: String!) {
    removecourse(id: $id) {
      id
      coursename
    }
  }`;


export const updatecourse = gql`
mutation updatecourse(
  $id:String!,
  $coursename:String!
  ){
  updatecourse(
    id:$id,
    coursename:$coursename
    ){
    id
    coursename
  }
}`;
