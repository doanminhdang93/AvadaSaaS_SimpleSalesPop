const Shopify = require('shopify-api-node');
// const {getSetting} = require('../repositories/settingsRepository');

(async () => {
  const shopify = new Shopify({
    shopName: 'avada-saas-training.myshopify.com',
    accessToken: 'shpua_4e9b4b7b3a9d6520b2b724259c1f5100'
  });
  const data = await shopify.theme.list();
  // console.log(data);

  const idTheme = data[0].id;
  const templateJson = await shopify.asset.get(idTheme, {
    asset: {key: 'config/settings_data.json'}
  });
  let templateValue = JSON.parse(templateJson.value);
  let blocks = templateValue.current.blocks;

  let updatedData = Object.fromEntries(
    Object.entries(blocks).map(([key, value]) => [key, {...value, disabled: false}])
  );
  console.log(updatedData);
  templateValue.current.blocks = updatedData;

  await shopify.asset.update(idTheme, {
    key: 'config/settings_data.json',
    value: JSON.stringify(templateValue)
  });
})();
