const { app, port } = require('./Express');
const { onJoined, onDisconnect } = require('./sockets/Sockets.js');
const { Connections } = require('./utils/Connections');
const io = require('socket.io').listen(app.listen(port));

const clientConnections = new Connections();

clientConnections.pullDBMeasurements().then(() => {
  // call all setup code
  io.sockets.on('connection', (socket) => {
    console.log('started');
    onJoined(socket);
    onDisconnect(socket);
  });
  console.log(`Listening on 127.0.0.1: ${port}`);
});

