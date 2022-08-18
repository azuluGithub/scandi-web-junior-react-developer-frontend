import { gql, ApolloClient, InMemoryCache } from '@apollo/client';

import { PRODUCT_QUERY, CATEGORY_QUERY } from './Query.config';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:4000/graphql',
});

const setVariables = ({ identifier, type }) => {
  switch(type) {
    case PRODUCT_QUERY:
      return { 
        id: identifier 
      };

    case CATEGORY_QUERY:
      return { 
        input: {
          title: identifier,
        }
      }
    
    default:
      return null;
  }
}

export const executeGet = (queryObj, args) => {
  const { query } = queryObj;
  const newVariables = setVariables(args);

  return new Promise((resolve, reject) => {
    client.query(
      { 
        query: gql`${query}`,
        variables: newVariables,
      }
    )
    .then(
      ({ data }) => resolve(data),
      (error) => reject(error),
    )
  });
}
