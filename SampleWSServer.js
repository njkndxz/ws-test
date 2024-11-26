var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var WebsocketServer = require('ws').Server;
wss = new WebsocketServer({ port: 60001 });

wss.on('connection', (ws) => {
    console.log('客户端已连接');
    var clientConnected = true;

    ws.on('message', (message) => {
        console.log('收到客户端消息:' + message);
    });

    ws.on('close', () => {
        console.log('客户端断开连接');
        clientConnected = false;
    });

    rl.on('line', (line) => {
        ws.send(`向客户端发送数据:${line}`);
    });

    let i = 1
    //发送心跳消息
    setInterval(() => {
        if (clientConnected) {
            ws.send(i);
            i++;
        }
    }, 3000);

})
console.log('服务器启动');
