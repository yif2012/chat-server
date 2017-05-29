const sql = require('../db/sql');
const query = require('../db/query');
const crypto = require('crypto');

module.exports = async(ctx) => {
  try {
    if (!ctx.request.body.username) {
      ctx.body = ctx.webCode.USERNAMENULL()
      return
    }
    if (!ctx.request.body.password) {
      ctx.body = ctx.webCode.PASSWORDNULL()
      return
    }
    const md5 = crypto.createHash('md5')
    let obj = {
      username: ctx.request.body.username,
      password: md5.update(ctx.request.body.password).digest('hex')
    }
    const res = await query(sql('login', obj))
    if (res.length) {
      let sessionObj = {
        id: res[0].id,
        username: res[0].username,
        nickname: res[0].nickname,
        mobile: res[0].mobile
      }
      ctx.session = sessionObj
      ctx.body = ctx.webCode.SUCCESS( sessionObj )
    } else {
      ctx.body = ctx.webCode.USERORPWDERROR()
    }
  } catch (e) {
    console.log(e)
    ctx.body = ctx.webCode.ERROR(e)
  }
}