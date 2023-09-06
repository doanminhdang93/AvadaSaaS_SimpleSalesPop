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
                      images(first:1){
                        edges{
                          node{
                            url
                          }
                        }
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

export function handleOrdersGraphQL(response, shopId) {
  const data = response.orders.edges.map(item => {
    return {
      timestamp: new Date(item.node.updatedAt),
      firstName: item.node?.billingAddress.firstName,
      city: item.node?.billingAddress.city,
      country: item.node?.billingAddress.country,
      productName: item.node?.lineItems.edges[0].node.name,
      productImage: item.node?.lineItems.edges[0].node.product.images.edges[0].node.url,
      productId: parseInt(item.node?.lineItems.edges[0].node.product.id.match(/\d+/)[0]),
      shopId: shopId
    };
  });
  return data;
}
