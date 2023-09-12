import Router from 'koa-router';
import * as webhookController from '../controllers/webhook/webhookController';
import verifyWebhook from '../middleware/webhookKoaMiddleware';

const router = new Router({
  prefix: '/webhook'
});

// router.use(verifyWebhook);
router.post('/order/new', webhookController.getNewOrder);

export default router;
