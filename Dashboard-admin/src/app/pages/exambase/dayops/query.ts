'use strict';
import gql from 'graphql-tag';
import { query } from '\@angular/animations';
import { Mutation } from 'apollo-angular';
export const addfcourse = gql`
 mutation addfaculty($course: String!,$academic: String!,$sname: String!) {

    addfaculty(course: $course,academic: $academic,sname: $sname) {
      id,
      course,
      academic,
      sname,
     
    }
  }`;

export const Faculties = gql`
  query {
   faculties{
      id,
      course,
      academic,
      sname,
      
    }
  }`;

export const removefaculty = gql`
  mutation removefaculty($id: String!) {
    removeFaculty(id: $id) {
      id
      course,
      academic,
      sname,
    }
  }`;

export const updatefaculty = gql`
  mutation updatefaculty($id: String!, $course: String!) {
    updateFaculty(id: $id, course: $course) {
      id
      course,
      academic,
      sname,
     
    }
  }`;
