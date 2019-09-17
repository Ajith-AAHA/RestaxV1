'use strict';

import gql from 'graphql-tag';

export const addUser = gql`
  mutation addUser($name: String!,$fathername: String! , $gender: String!, $department: String!, $address: String!) {
    addUser(name: $name,fathername: $fathername,gender: $gender, department:$department,address:$address ) {
      id
      name
      fathername
      gender
      department
      address
    }
  }`;

export const Users = gql`
  query {
    users{
      id
      name
      fathername
      gender
      department
      address
    }
  }`;

export const removeUser = gql`
  mutation removeUser($id: String!) {
    removeUser(id: $id) {
      id
      name
      fathername
      gender
      department
      address
    }
  }`;

export const updateUser = gql`
  mutation updateUser($id: String!, $name: String!, $fathername: String!,
   $gender: String!, $department: String!, $address: String!) {
    updateUser(id: $id, name: $name, fathername: $fathername,
     gender: $gender, department: $department, address: $address) {
      id
      name
      fathername
      gender
      department
      address
    }
  }`;

  export const Heroes = gql`
  query {
    Heroes{
      newHero
    }
  }`;

  export const addHero = gql`
  mutation addHero($newhero: String!) {
    addHero(newhero: $newhero) {
      id
      newHero
    }
  }`;
