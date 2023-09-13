import Shopify from 'shopify-api-node';
import appConfig from '@functions/config/app';

export async function registerWebhook({shopifyDomain, accessToken}) {
  const shopify = new Shopify({
    shopName: shopifyDomain,
    accessToken: accessToken
  });

  // Check if webhook already exists
  const webhooks = await shopify.webhook.list();
  const existingWebhook = webhooks.find(
    webhook =>
      webhook.topic === 'orders/create' &&
      webhook.address === `https://${appConfig.baseUrl}/webhook/order/new`
  );

  if (existingWebhook) {
    console.log('Webhook already exists!');
    return;
  }

  await shopify.webhook.create({
    topic: 'orders/create',
    address: `https://${appConfig.baseUrl}/webhook/order/new`,
    format: 'json'
  });
}

// export async function registerScriptTags({shopifyDomain, accessToken}) {
//   const shopify = new Shopify({
//     shopName: shopifyDomain,
//     accessToken: accessToken
//   });

//   await shopify.scriptTag.create({
//     event: 'onLoad',
//     src: `https://${appConfig.baseUrl}/scriptTag.js`,
//     display_scope: 'all',
//     cache: false
//   });
// }
