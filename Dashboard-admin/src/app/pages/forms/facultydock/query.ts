'use strict';

import gql from 'graphql-tag';

export const addfaculty = gql`
  mutation addfaculty(
    $facultyname: String!,
    $facultyemail: String!,
    $pwt: Boolean!,
    $pwi: Boolean!,
    $pwc: Boolean!) {
    addfaculty(
      facultyname: $facultyname,
      facultyemail: $facultyemail,
      pwt: $pwt,
      pwi: $pwi,
      pwc: $pwc) {
      id
      facultyname
      facultyemail
      pwt
      pwi
      pwc
    }
  }
`;

export const faculties = gql`
  query {
    faculties{
      id
      facultyname
      facultyemail
      pwt
      pwi
      pwc
    }
  }`;

export const removefaculty = gql`
  mutation removefaculty($id: String!) {
    removefaculty(id: $id) {
      id
      facultyname
    }
  }`;

export const updatefaculty = gql`
  mutation updatefaculty($facultyname: String!$facultyemail: String!,$pwt: String!,$pwi: String!,$pwc: String!) {
    updatefaculty(facultyname: $facultyname,facultyemail:$facultyemail,pwt:$pwt,pwi:$pwi,pwc:$pwc) {
      id
      facultyname
      facultyemail
      pwt
      pwi
      pwc
    }
  }`;
