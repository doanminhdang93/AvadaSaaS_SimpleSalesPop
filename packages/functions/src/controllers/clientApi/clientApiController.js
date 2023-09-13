import {log} from 'firebase-functions/logger';
import {presentNotifications} from '../../presenters/notificationsPresenter';
import {getNotificationsByDomain} from '../../repositories/notificationsRepository';
import {getSettingsByDomain} from '../../repositories/settingsRepository';

export async function listData(ctx) {
  try {
    const {shopifyDomain} = ctx.query;
    const [notifications, settings] = await Promise.all([
      getNotificationsByDomain(shopifyDomain),
      getSettingsByDomain(shopifyDomain)
    ]);
    return (ctx.body = {
      data: {
        settings: settings,
        notifications: presentNotifications(notifications)
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
