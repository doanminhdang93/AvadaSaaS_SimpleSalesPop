import Shopify from 'shopify-api-node';

export async function getOrdersGraphQLQuery(shopifyDomain, accessToken) {
  const shopify = new Shopify({
    shopName: shopifyDomain,
    accessToken: accessToken
  });
  const graphQlQuery = `{
    orders(first:30,sortKey:UPDATED_AT) {
      edges{
        node{
          updatedAt
          billingAddress{
            firstName
            city
            country
          }
          lineItems(first:1){
            edges{
              node{
                name
                product {
                  id
                  featuredImage{
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }`;
  const response = await shopify.graphql(graphQlQuery);
  return response;
}