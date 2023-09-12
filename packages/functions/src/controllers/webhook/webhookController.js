import {getShopByShopifyDomain} from '@avada/shopify-auth';
import Shopify from 'shopify-api-node';
import {getNotificationItem, addNewNotification} from '../../repositories/notificationsRepository';

export async function getNewOrder(ctx) {
  try {
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
    const orderData = ctx.req.body;
    const shop = await getShopByShopifyDomain(shopifyDomain);
    const shopify = new Shopify({
      shopName: shopifyDomain,
      accessToken: shop.accessToken
    });
    const notification = await getNotificationItem(shopify, orderData);
    await addNewNotification({shopId: shop.id, shopifyDomain, data: notification});

    return (ctx.body = {
      success: true
    });
  } catch (err) {
    console.error(err);
    return (ctx.body = {
      success: false,
      message: err.message
    });
  }
}
