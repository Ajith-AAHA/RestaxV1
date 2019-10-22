'use strict';
import gql from 'graphql-tag';
import { query } from '\@angular/animations';
import { Mutation } from 'apollo-angular';
export const addfaculty = gql`
 mutation addfaculty($iname: String!,$fname: String!,$sname: String!,$pmanaging: String!,
 $email: String!,$phone: String!,$pwt: Boolean!,$pwi: Boolean!,$pwe: Boolean!,$password: String!) {

    addfaculty(iname: $iname,fname: $fname,sname: $sname,pmanaging: $pmanaging,email: $email,
        phone: $phone,pwt: $pwt,pwi: $pwi,pwe: $pwe,password: $password,) {
      id,
      iname,
      fname,
      sname,
      pmanaging,
      email,
      phone,
      pwt,
      pwi,
      pwe,
      password,
    }
  }`;

export const Faculties = gql`
  query {
   faculties{
      id,
      iname,
      fname,
      sname,
      pmanaging,
      email,
      phone,
      pwt,
      pwi,
      pwe,
      password
    }
  }`;

export const removefaculty = gql`
  mutation removefaculty($id: String!) {
    removeFaculty(id: $id) {
      id
      iname,
      fname,
      sname,
      pmanaging,
      email,
      phone,
      pwt,
      pwi,
      pwe,
      password
    }
  }`;

export const updatefaculty = gql`
  mutation updatefaculty($id: String!, $iname: String!) {
    updateFaculty(id: $id, iname: $iname) {
      id
      iname,
      fname,
      sname,
      pmanaging,
      email,
      phone,
      pwt,
      pwi,
      pwe,
      password
    }
  }`;
