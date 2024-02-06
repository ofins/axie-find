import request from "graphql-request";

export const gqlRequest = async (endpoint, query, variables?) => {
  try {
    return await request(endpoint, query, variables);
  } catch (error) {
    console.error(`Error in graphQL-request request`, error);
  }
};
