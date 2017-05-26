const Router = require('koa-router');
const userList = require('../actions/userList');
const register = require('../actions/register');
const login = require('../actions/login');
const router = new Router();


router.get('/userList', userList);
router.post('/register', register);
router.post('/login', login);
router.all('/test', (ctx, next) => {
  console.log(ctx.request);
  const name = ctx.request.body.name || ctx.query.name;
  ctx.body = { code: 666, name: name };
})

module.exports = (app) => {
  app.use(router.routes()).use(router.allowedMethods());
}