const sql = require('../db/sql');
const query = require('../db/query');
const crypto = require('crypto');

module.exports = async(ctx) => {
  if (!ctx.request.body.account) {
    ctx.body = ctx.webCode.USERNAMENULL();
    return
  }
  if (!ctx.request.body.password) {
    ctx.body = ctx.webCode.PASSWORDNULL();
    return
  }
  let isExist = await query(sql('queryUser', ctx.request.body));
  if (isExist.length > 0) {
    console.log('用户已存在')
    ctx.body = ctx.webCode.USEREXIST()
  } else {
    console.log('用户未被注册')
    const md5 = crypto.createHash('md5');
    let obj = {
      account: ctx.request.body.account,
      password: md5.update(ctx.request.body.password).digest('hex')
    }
    console.log(obj);
    let register = await query(sql('register', obj));
    if (register.affectedRows > 0) {
      console.log('注册成功,用户名为' + ctx.request.body.account)
      ctx.body = ctx.webCode.SUCCESS()
    } else {
      ctx.body = ctx.webCode.EXCEPTION()
    }
  }
}