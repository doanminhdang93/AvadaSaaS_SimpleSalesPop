const Shopify = require('shopify-api-node');

(async () => {
  const shopify = new Shopify({
    shopName: 'avada-saas-training.myshopify.com',
    accessToken: 'shpua_9266b040a945d499ea35ea3b448d18c3'
  });

  const scriptTags = await shopify.scriptTag.list();
  console.log(scriptTags);

  // const scriptTag = await shopify.scriptTag.create({
  //   event: 'onload',
  //   src: `https://localhost:3000/scripttag/avada-sale-pop.min.js`
  // });
  // console.log(scriptTag);
})();
