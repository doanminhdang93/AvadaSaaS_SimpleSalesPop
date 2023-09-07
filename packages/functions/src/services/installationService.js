import {getShopByShopifyDomain} from '@avada/shopify-auth';
import {syncNotifications} from '../repositories/notificationsRepository';
import {addNewSetting} from '../repositories/settingsRepository';
import defaultSettings from '../const/defaultSettings';

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
      })
    ]);
  } catch (err) {
    console.error(err);
  }
}
