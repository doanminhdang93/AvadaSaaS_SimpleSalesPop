import {getNotifications, syncNotifications} from '../repositories/notificationsRepository';
import {getCurrentShop} from '../helpers/auth';

export async function handleGetNotifications(ctx) {
  try {
    const shopId = getCurrentShop(ctx);
    const {page, limit, sort} = ctx.query;
    const {count, pageInfo, notifications} = await getNotifications({shopId, page, limit, sort});

    ctx.status = 200;
    return (ctx.body = {
      count: count,
      pageInfo: pageInfo,
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
