const Router = require('koa-router');
const applicationController = require('../controllers/application.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

// SETUP ROUTER
const router = new Router();

// ROUTES
router.get('/', authMiddleware, applicationController.getAll);
router.post('/', authMiddleware, applicationController.create);

// EXPORTS
module.exports = router;
