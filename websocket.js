import WebSocket from 'ws';

const ws = new WebSocket('ws://127.0.0.1:7777/api/ws', {
  headers: {
    // "Sec-WSS-Token": process.env.Sec_WSS_Token,
    'Sec-WSS-Token': '',
  },
});

ws.on('error', console.error);

ws.on('open', function open() {
  ws.send('ping');
});

ws.on('message', async function message(data) {
  if (data === 'ping') {
    return;
  }
});
