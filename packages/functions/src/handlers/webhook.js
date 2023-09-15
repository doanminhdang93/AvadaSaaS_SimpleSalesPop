import App from 'koa';
import router from '../routes/webhook';
import cors from '@koa/cors';
import * as errorService from '@functions/services/errorService';

// Initialize all demand configuration for an application
const api = new App();
api.proxy = true;
api.use(cors());

// Register all routes for the application
api.use(router.allowedMethods());
api.use(router.routes());

// Handling all errors
api.on('error', errorService.handleError);

export default api;
