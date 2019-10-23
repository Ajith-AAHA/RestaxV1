'use strict';

import gql from 'graphql-tag';
import { query } from '\@angular/animations';
import { Mutation } from 'apollo-angular';

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
export const updatedepartment = gql`
mutation updatedepartment($id:String!,$departmentname:String!,$shortcode:String!){
  updatedepartment(id:$id,departmentname:$departmentname,shortcode:$shortcode){
    id
    departmentname
    shortcode
  }
}`;

export const addlevel = gql`
mutation addlevel($levelname:String!,$levelshortcode:String!,$year:String!,$terms:String!){
  addlevel(levelname:$levelname,levelshortcode:$levelshortcode,year:$year,terms:$terms){
    id
    levelname
    levelshortcode
    year
    terms
  }
}`;

export const Levels = gql`
query{
  levels{
    id
    levelname
    levelshortcode
    year
    terms
  }
}`;

export const removelevel = gql`
mutation removelevel($id:String!){
  removelevel(id:$id){
    id
    levelname
    levelshortcode
    year
    terms
  }
}`;

export const updatelevel = gql`
mutation updatelevel($id:String!,$levelname:String!,$levelshortcode:String!,$year:String!,$terms:String!){
updatelevel(id:$id,levelname:$levelname,levelshortcode:$levelshortcode,year:$year,terms:$terms){
id
levelname
levelshortcode
year
terms
}
}`;

