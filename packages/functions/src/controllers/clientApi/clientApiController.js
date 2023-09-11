import {notificationsPresenter} from '../../presenters/notificationsPresenter';
import {getNotificationsByDomain} from '../../repositories/notificationsRepository';
import {getSettingsByDomain} from '../../repositories/settingsRepository';

export async function listData(ctx) {
  try {
    const {shopifyDomain} = ctx.query;
    const notifications = await getNotificationsByDomain(shopifyDomain);
    const settings = await getSettingsByDomain(shopifyDomain);

    const notificationsPresented = await notificationsPresenter(notifications);
    return (ctx.body = {
      data: {
        settings: settings,
        notifications: notificationsPresented
      }
    });
  } catch (err) {
    console.error(err);
    return (ctx.body = {
      data: {},
      success: false,
      message: err.message
    });
  }
}
