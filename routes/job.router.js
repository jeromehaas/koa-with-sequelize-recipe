const Router = require('koa-router');
const jobController = require('../controllers/job.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

// SETUP ROUTER
const router = new Router();

// ROUTES
router.get('/', authMiddleware, jobController.getAll);
router.post('/', authMiddleware, jobController.create);
router.delete('/:id', authMiddleware, jobController.destroy);

// EXPORT
module.exports = router;
