const Shopify = require('shopify-api-node');

(async () => {
  const shopify = new Shopify({
    shopName: 'avada-saas-training.myshopify.com',
    accessToken: 'shpua_597d6b0731beffce8eef9963276391f2'
  });

  const scriptTags = await shopify.scriptTag.list();
  console.log(scriptTags);

  const webhooks = await shopify.webhook.list();
  console.log(webhooks);

  // const scriptTag = await shopify.scriptTag.create({
  //   event: 'onload',
  //   src: `https://localhost:3000/scripttag/avada-sale-pop.min.js`
  // });
  // console.log(scriptTag);
})();
