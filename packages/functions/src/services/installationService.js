import {getShopByShopifyDomain} from '@avada/shopify-auth';
import {syncNotifications, deleteNotifications} from '../repositories/notificationsRepository';
import {addNewSetting, deleteSetting} from '../repositories/settingsRepository';
import defaultSettings from '../const/defaultSettings';
import {registerWebhook, registerScriptTags} from './shopifyServices';

export async function afterInstallService(ctx) {
  try {
    const shopifyDomain = ctx.state.shopify.shop;
    const shop = await getShopByShopifyDomain(shopifyDomain);
    await Promise.all([
      addNewSetting(shop.id, {
        ...defaultSettings,
        shopifyDomain
      }),

      syncNotifications({
        shopifyDomain,
        shopId: shop.id,
        accessToken: shop.accessToken
      }),

      registerWebhook({
        shopifyDomain,
        accessToken: shop.accessToken
      })

      // registerScriptTags({
      //   shopifyDomain,
      //   accessToken: shop.accessToken
      // })
    ]);
  } catch (err) {
    console.error(err);
  }
}

export async function afterUninstallService(ctx) {
  try {
    const shopifyDomain = ctx.get('x-shopify-shop-domain');
    const shop = await getShopByShopifyDomain(shopifyDomain);
    await Promise.all([deleteSetting(shop.id), deleteNotifications(shop.id)]);
  } catch (err) {
    console.error(err);
  }
}
