const Koa = require('koa');
const bodyParser = require('koa-parser');
const dotenv = require('dotenv');
const router = require('./routes/index.js');
const errorListener = require('./middlewares/error-listener.middleware.js');
const errorHandler = require('./middlewares/error-handler.middleware.js');

// CREATE APP
const app = new Koa();
const port = 5000;

// SETUP DOTENV
dotenv.config();

// SETUP BODY PARSER
app.use(bodyParser());

// SETUP ERROR HANDLER
app.use(errorListener);

// SETUP ROUTER
app.use(router.routes());
app.use(router.allowedMethods());

// SETUP ERROR HANDLER
app.on('error', errorHandler);

// START SERVER
app.listen(port, () => {
	console.log(`🚀 Server is running on port ${ port }!`);
});
