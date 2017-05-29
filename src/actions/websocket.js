const IO = require('koa-socket');

module.exports = (app) => {
  const io = new IO({
    namespace: "/s",
    ioOptions: {
      path: '/socket.io'
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
      onlineUsers[ctx.data.userId] = ctx.data.nickname
      onlineCount++
    }
    io.broadcast('stockchallenge', { onlineUsers, onlineCount, nickname: ctx.data.nickname, type: 'join'})
    console.log(ctx.data.nickname + '加入了聊天室');
  })
  io.on('messageClient', (ctx, next) => {
    console.log("来自客户端的消息", ctx.data);
    io.broadcast('stockchallenge', {
      "type": 'message',
      "userId": ctx.data.userId,
      "nickname": ctx.data.nickname,
      "content": ctx.data.content
    });
  })
  io.on('disconnect', (ctx) => {
    if (onlineUsers.hasOwnProperty(io.name)) {
      //退出用户的信息
      var obj = { userid: io.name, nickname: onlineUsers[io.name] };
      //删除
      delete onlineUsers[io.name];
      //在线人数-1
      onlineCount--;
      //向所有客户端广播用户退出
      io.broadcast('stockchallenge', {
        type: 'logout',
        onlineUsers,
        onlineCount,
        nickname: obj.nickname
      });
      console.log(obj.nickname + '退出了聊天室');
    }
  })
  io.attach(app)
}
