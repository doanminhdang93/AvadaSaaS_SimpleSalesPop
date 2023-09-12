import Shopify from 'shopify-api-node';
import appConfig from '@functions/config/app';

export async function registerWebhook({shopifyDomain, accessToken}) {
  const shopify = new Shopify({
    shopName: shopifyDomain,
    accessToken: accessToken
  });

  await shopify.webhook.create({
    topic: 'orders/create',
    address: `https://${appConfig.baseUrl}/webhook/order/new`,
    // address: `https://df09-171-224-179-131.ngrok.io/webhook/order/new`,
    format: 'json'
  });
}
