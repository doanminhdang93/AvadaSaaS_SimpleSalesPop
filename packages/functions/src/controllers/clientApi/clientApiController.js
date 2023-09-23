import {presentNotifications} from '../../presenters/notificationsPresenter';
import {getNotificationsByDomain} from '../../repositories/notificationsRepository';
import {getSettingsByDomain} from '../../repositories/settingsRepository';

export async function listData(ctx) {
  try {
    const {shopifyDomain} = ctx.query;
    const settings = await getSettingsByDomain(shopifyDomain);
    const notifications = await getNotificationsByDomain(shopifyDomain, settings.maxPopsDisplay);

    return (ctx.body = {
      data: {
        settings: settings,
        notifications: presentNotifications(notifications)
      }
    });
  } catch (err) {
    return (ctx.body = {
      data: {},
      success: false,
      message: err.message
    });
  }
}
