import Router from 'koa-router';
import * as shopController from '@functions/controllers/shopController';
import * as subscriptionController from '@functions/controllers/subscriptionController';
// import * as appNewsController from '@functions/controllers/appNewsController';
import {getApiPrefix} from '@functions/const/app';
import * as settingsController from '@functions/controllers/settingsController';

export default function apiRouter(isEmbed = false) {
  const router = new Router({prefix: getApiPrefix(isEmbed)});

  router.post('/settings', settingsController.handleAddNewSetting);
  router.get('/settings', settingsController.handleGetSetting);
  router.put('/settings', settingsController.handleUpdateSetting);
  router.get('/shops', shopController.getUserShops);
  router.get('/subscription', subscriptionController.getSubscription);
  // router.get('/appNews', appNewsController.getList);

  return router;
}
