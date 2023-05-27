const Router = require('koa-router');
const companyController = require('../controllers/company.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

// SETUP ROUTER
const router = new Router();

// ROUTES
router.get('/', authMiddleware, companyController.getAll);
router.get('/:id', authMiddleware, companyController.get);
router.post('/', authMiddleware, companyController.create);
router.delete('/:id', authMiddleware, companyController.destroy);
router.patch('/:id', authMiddleware, companyController.update);

// EXPORTS
module.exports = router;
