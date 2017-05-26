const sql = require('../db/sql');
const query = require('../db/query');
const crypto = require('crypto');

module.exports = async(ctx) => {
  try {
    if (!ctx.request.body.account) {
      ctx.body = ctx.webCode.USERNAMENULL();
      return
    }
    if (!ctx.request.body.password) {
      ctx.body = ctx.webCode.PASSWORDNULL();
      return
    }
    const md5 = crypto.createHash('md5');
    let obj = {
      account: ctx.request.body.account,
      password: md5.update(ctx.request.body.password).digest('hex')
    }
    const res = await query(sql('login', obj));
    if (res.length) {
      ctx.session = {
        account: ctx.request.body.account,
        count: 0
      }
      ctx.body = ctx.webCode.SUCCESS({ list: res });
    } else {
      ctx.body = ctx.webCode.USERORPWDERROR();
    }
  } catch (e) {
    console.log(e);
    ctx.body = ctx.webCode.ERROR(e);
  }
}