const Router = require('koa-router');
const userController = require('../controllers/user.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

// SETRUP ROUTER
const router = new Router();

// ROUTES
router.get('/', authMiddleware, userController.getAll);
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/me', authMiddleware, userController.me);
router.get('/:id', authMiddleware, userController.get);

// EXPORTS
module.exports = router;
