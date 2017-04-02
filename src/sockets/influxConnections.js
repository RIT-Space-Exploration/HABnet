
const writeConnectionOpen = (client, data) => {
  client.write('http')
    .field({
      connectionSource: data.type,
      connectionName: data.name,
      connected: true,
    })
    .then(() => console.info('New Connection Recorded'))
    .catch(console.error);
};

const writeConnectionClose = (client, data, name) => {
  client.write('http')
    .field({
      connectionSource: name,
      connectionName: data.name,
      connected: false,
    })
    .then(() => console.info('Connection Closed Recorded'))
    .catch(console.error);
};

const writeDataPacket = (client, data) => {
  client.write('http')
    .field({
      socketName: data.name,
      data: JSON.stringify(data.buffer),
    })
    .queue();

  if (client.writeQueueLength >= 100) {
    client.syncWrite()
      .then(() => console.info('Socket data queue write'))
      .catch(console.error);
  }
};

module.exports = {
  writeConnectionOpen,
  writeConnectionClose,
  writeDataPacket,
};
