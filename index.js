const Koa = require('koa');
const koaBody = require('koa-body');
const static = require('koa-static');
const co = require('co');
const render = require('koa-swig');
const convert = require('koa-convert');
const session = require('koa-session2');
const router = require('./src/router');
const webCode = require('./src/asset/webCode');
const Websocket = require('./src/actions/websocket');
const app = new Koa();

const CONFIG = {
  key: 'SESSIONID',
  maxAge: 1000 * 60 * 60, // cookie有效时长
};
app.use(session(CONFIG))

app.use((ctx, next) => {
  console.log(ctx.session)
  ctx.webCode = webCode
  return next()
})
app.context.render = co.wrap(render({ root: './static', autoescape: true, cache: 'memory', writeBody: false, ext: 'html' }))
app.use(static(__dirname + '/static'))
app.use(koaBody({}))
router(app)
Websocket(app)
app.listen(1234, () => {
  console.log('server start in port 1234')
})