const sql = require('../db/sql');
const query = require('../db/query');

module.exports = async(ctx) => {
  try {
    const res = await query(sql('userList', ctx.query));
    ctx.body = ctx.webCode.SUCCESS({ list: res, total: res.length });
  } catch (e) {
    console.log(e);
    ctx.body = ctx.webCode.ERROR(e);
  }
}