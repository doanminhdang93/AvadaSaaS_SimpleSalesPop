const Shopify = require('shopify-api-node');

(async () => {
  const shopify = new Shopify({
    shopName: 'avada-saas-training.myshopify.com',
    accessToken: 'shpua_1e80202109b50ef2f7a581d23e4fb958'
  });

  const scriptTags = await shopify.scriptTag.list();
  console.log(scriptTags);

  // const scriptTag = await shopify.scriptTag.create({
  //   event: 'onload',
  //   src: `https://localhost:3000/scripttag/avada-sale-pop.min.js`
  // });
  // console.log(scriptTag);
})();
