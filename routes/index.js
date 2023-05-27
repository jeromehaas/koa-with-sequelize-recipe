const Router = require('koa-router');
const jobRouter = require('./job.router.js');
const companyRouter = require('./company.router.js');
const applicationRouter = require('./application.router.js');
const candidateRouter = require('./candidate.router.js');
const userRouter = require('./user.router.js');

// SETUP ROUTER
const router = new Router();

// ROUTES
router.use('/jobs', jobRouter.routes());
router.use('/companies', companyRouter.routes());
router.use('/applications', applicationRouter.routes());
router.use('/candidates', candidateRouter.routes());
router.use('/user', userRouter.routes());

// EXPORTS
module.exports = router;
