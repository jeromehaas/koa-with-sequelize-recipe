const Router = require('koa-router');
const candidateController = require('../controllers/candidate.controller');
const authMiddleware = require('../middlewares/auth.middleware.js');

// SETUP ROUTER
const router = new Router();

// ROUTES
router.get('/', authMiddleware, candidateController.getAll);

// EXPORTS
module.exports = router;
