'use strict';

import gql from 'graphql-tag';


export const addpaper = gql`
  mutation addpaper($shortcode: String!,$papername:String!,$credits:String!) {
    addpaper(
      shortcode: $shortcode,
      papername:$papername,
      credits:$credits
    ) {
      id
      shortcode
      papername
      credits
    }
  }
`;

export const papers = gql`
  query {
    papers{
      id
      shortcode
      papername
      credits
    }
  }`;

export const removepaper = gql`
  mutation removepaper($id: String!) {
    removepaper(id: $id) {
      id
      shortcode
      papername
      credits
    }
  }`;


export const updatepaper = gql`
mutation updatepaper(
  $id:String!,
  $shortcode:String!,
  $papername:String!,
  $credits:String!,
  ){
  updatepaper(
    id:$id,
    shortcode:$shortcode,
    papername:$papername,
    credits:$credits
    ){
    id
    shortcode
    papername
    credits
  }
}`;

