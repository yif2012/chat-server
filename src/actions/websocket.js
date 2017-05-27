const IO = require('koa-socket');

module.exports = (app) => {
  const io = new IO({
    namespace: "mysocket",
    ioOptions: {
      path: '/restapi/websocketstock'
    }
  })
  const onlineUsers = {}
  let onlineCount = 0
  io.use(async(ctx, next) => {
    let start = new Date()
    await next
    console.log(`response time: ${ new Date() - start }ms`)
  })

  io.on('connection', (ctx) => {
    console.log('连接成功')
  })
  io.on('join', (ctx) => {
    io.name = ctx.data.userId;
    if (!onlineUsers.hasOwnProperty(ctx.data.userId)) {
      onlineUsers[ctx.data.userId] = ctx.data.userName
      onlineCount++
    }
    io.broadcast('join', { onlineUsers, onlineCount, user: ctx.data.userName })
    console.log(ctx.data.userName + '加入了聊天室');
  })
  io.on('messageClient', (ctx, next) => {
    console.log("来自客户端的消息", ctx.data);
    io.broadcast('stockchallenge', {
      "userId": ctx.data.userId,
      "userName": ctx.data.userName,
      "content": ctx.data.content
    });
  })
  io.on('disconnect', (ctx) => {
    if (onlineUsers.hasOwnProperty(io.name)) {
      //退出用户的信息
      var obj = { userid: io.name, username: onlineUsers[io.name] };
      //删除
      delete onlineUsers[io.name];
      //在线人数-1
      onlineCount--;
      //向所有客户端广播用户退出
      io.broadcast('logout', {
        onlineUsers,
        onlineCount,
        user: obj.username
      });
      console.log(obj.username + '退出了聊天室');
    }
  })
  io.attach(app)
}