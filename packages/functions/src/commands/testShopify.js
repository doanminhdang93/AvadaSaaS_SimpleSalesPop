const Shopify = require('shopify-api-node');
// const {getSetting} = require('../repositories/settingsRepository');

(async () => {
  const shopify = new Shopify({
    shopName: 'avada-saas-training.myshopify.com',
    accessToken: 'shpua_597d6b0731beffce8eef9963276391f2'
  });

  // await shopify.scriptTag.delete(235640062269);
  const test = await shopify.scriptTag.list();

  console.log(test);

  // const data = await shopify.theme.list();
  // console.log(data);

  // const idTheme = data[0].id;

  // await shopify.asset.create(idTheme, {
  //   key: 'snippets/avada-sale-pop.liquid',
  //   value: `<script>
  //     window.AVADA_SIMPLE_SALES_POP_SETTING={{shop.metafields.simple_sales_pop.setting | json}};
  //     window.AVADA_SIMPLE_SALES_POP_NOTIFICATIONS={{shop.metafields.simple_sales_pop.notifications | json}};
  //   </script>`
  // });

  // console.log(test);
  // const test = await shopify.metafield.list({namespace: 'simple_sales_pop', key: 'setting'});
  // console.log(JSON.parse(test[0].value));

  // const scriptTags = await shopify.scriptTag.list();
  // console.log(scriptTags);

  // const webhooks = await shopify.webhook.list();
  // console.log(webhooks);

  // const scriptTag = await shopify.scriptTag.create({
  //   event: 'onload',
  //   src: `https://localhost:3000/scripttag/avada-sale-pop.min.js`
  // });
  // console.log(scriptTag);
})();
