import {getShopByShopifyDomain} from '@avada/shopify-auth';
import {getNotifications, syncNotifications} from '../repositories/notificationsRepository';
import {getCurrentShop} from '../helpers/auth';

export async function handleSyncNotifications(ctx) {
  try {
    const {shopifyDomain} = ctx.state.user.shop;
    // console.log(shopifyDomain);
    const shop = await getShopByShopifyDomain(shopifyDomain);
    const notifications = await syncNotifications({
      shopifyDomain,
      shopId: shop.id,
      accessToken: shop.accessToken
    });
    ctx.status = 200;
    return (ctx.body = {
      data: notifications,
      success: true
    });
  } catch (err) {
    console.log(err);
    return (ctx.body = {
      data: {},
      success: false,
      message: err.message
    });
  }
}

export async function handleGetNotifications(ctx) {
  try {
    const shopId = getCurrentShop(ctx);
    const notifications = await getNotifications(shopId);

    ctx.status = 200;
    return (ctx.body = {
      data: notifications,
      success: true
    });
  } catch (err) {
    ctx.status = 404;
    return (ctx.body = {
      data: {},
      success: false,
      message: err.message
    });
  }
}
