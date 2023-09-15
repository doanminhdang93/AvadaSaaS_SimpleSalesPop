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

export async function registerScriptTags({shopifyDomain, accessToken}) {
  const shopify = new Shopify({
    shopName: shopifyDomain,
    accessToken: accessToken
  });

  // Check if scriptTag already exists
  const scriptTags = await shopify.scriptTag.list();
  const existingScriptTag = scriptTags.find(
    scriptTag => scriptTag.src === `https://localhost:3000/scripttag/avada-sale-pop.min.js`
  );

  if (existingScriptTag) {
    console.log('ScriptTag already exists!');
    return;
  }

  await shopify.scriptTag.create({
    event: 'onload',
    src: `https://localhost:3000/scripttag/avada-sale-pop.min.js`
  });
}
