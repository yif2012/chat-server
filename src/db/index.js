module.exports = () => {
  const mysql = require('mysql');
  // const host = '121.40.115.207';
  const host = 'qdm107873217.my3w.com';
  const user = 'qdm107873217';
  // const password = 'rootniuwangyun';
  const password = '19870729';
  // const database = 'cds';
  const database = 'qdm107873217_db';
  const pool = mysql.createPool({ host, user, password, database });
  return pool;
}