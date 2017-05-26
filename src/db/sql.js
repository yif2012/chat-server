const { format } = require('mysql');

const sql = (type, params) => {
  try {
    return sqlTree[type](params);
  } catch (e) {
    console.log('没找到对应的语句');
  }
}
const sqlTree = {
  userList: (params) => {
    let sql = 'select * from user where 1=1'
    if (params.username) sql += format(' AND username like ?', '%' + params.username + '%')
    return sql
  },
  queryUser: (params) => {
    let sql = format('select * from user where username = ?', params.account)
    return sql
  },
  register: (params) => {
    let sql = format('insert into user (username,password) values(?,?)', [params.account, params.password])
    return sql
  },
  login: (params) => {
    let sql = format('select * from user where username = ? and password = ?', [params.account, params.password])
    return sql
  }
}
module.exports = sql