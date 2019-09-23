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

export const adddepartment = gql`
  mutation adddepartment($departmentname:String!,$shortcode:String!) {
    adddepartment(
      departmentname:$departmentname
      shortcode:$shortcode,
    ) {
      id
      departmentname
      shortcode
    }
  }
`;
export const departments = gql`
  query {
    departments{
      id
      departmentname
      shortcode
    }
  }`;

export const removedepartment = gql`
mutation removedepartment($id:String!){
  removedepartment(id:$id){
    id
    departmentname
    shortcode
  }
}`;

export const addlevel = gql`
mutation addlevel($levelname: String!,$shortcode:String!,$year:String!,$terms:String!) {
  adddepartment(
    levelname:$levelname,
    shortcode: $shortcode,
    year:$year,
    terms:$terms
  ) {
    id
    levelname
    shortcode
    year
    terms
  }
}`;

export const updatedepartment = gql`
mutation updatedepartment($id:String!,$departmentname:String!,$shortcode:String!){
  updatedepartment(id:$id,departmentname:$departmentname,shortcode:$shortcode){
    id
    departmentname
    shortcode
  }
}`;

export const levels = gql`
query {
  levels{
    id
    levelname
    shortcode
    year
    terms
  }
}`;
