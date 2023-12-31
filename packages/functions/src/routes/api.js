import Router from 'koa-router';
import * as shopController from '@functions/controllers/shopController';
import {getApiPrefix} from '@functions/const/app';
import * as settingsController from '@functions/controllers/settingsController';
import settingsValidation from '../middleware/settingsValidation';
import * as notificationsController from '@functions/controllers/notificationsController';

export default function apiRouter(isEmbed = false) {
  const router = new Router({prefix: getApiPrefix(isEmbed)});

  router.post('/settings', settingsValidation, settingsController.handleAddNewSetting);
  router.get('/settings', settingsController.handleGetSetting);
  router.get('/notifications', notificationsController.handleGetNotifications);
  router.put('/settings', settingsValidation, settingsController.handleUpdateSetting);
  router.get('/shops', shopController.getUserShops);

  return router;
}
