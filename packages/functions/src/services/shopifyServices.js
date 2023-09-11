import Shopify from 'shopify-api-node';

export async function registerWebhook({shopifyDomain, accessToken}) {
  const shopify = new Shopify({
    shopName: shopifyDomain,
    accessToken: accessToken
  });

  await shopify.webhook.create({
    topic: 'orders/create',
    address: 'https://dfbd-123-17-158-3.ngrok.io/webhook/order/new',
    format: 'json'
  });
}
