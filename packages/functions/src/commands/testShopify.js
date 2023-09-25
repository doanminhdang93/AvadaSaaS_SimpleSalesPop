const Shopify = require('shopify-api-node');

(async () => {
  const shopify = new Shopify({
    shopName: 'avada-saas-training.myshopify.com',
    accessToken: 'shpua_f0e71a678e017deb0754443e74e89b2f'
  });
  // const data = await shopify.theme.list();
  // // console.log(data);

  // const idTheme = data[0].id;
  // const templateJson = await shopify.asset.get(idTheme, {
  //   asset: {key: 'config/settings_data.json'}
  // });
  // let templateValue = JSON.parse(templateJson.value);
  // let blocks = templateValue.current.blocks;

  // let updatedData = Object.fromEntries(
  //   Object.entries(blocks).map(([key, value]) => [key, {...value, disabled: false}])
  // );
  // console.log(updatedData);
  // templateValue.current.blocks = updatedData;

  // await shopify.asset.update(idTheme, {
  //   key: 'config/settings_data.json',
  //   value: JSON.stringify(templateValue)
  // });

  const webhooks = await shopify.webhook.list();
  console.log(webhooks);
})();
