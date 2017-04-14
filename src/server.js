
const http = require('http');
const clientJs = require('./client.js');
const WebSockets = require('ws');

const server = http.createServer((req, res) => {
  res.end(`
    <html>
      <head>
        <style>
          body { padding: 0; margin: 0; }
        </style>
      </head>
      <body>
        <canvas id="canvas" width="250px" height="250px"></canvas>
        <script>
          (${clientJs.toString()})()
        </script>
      </body>
    </html>
  `)
})

const drawables = [];

const wss = new WebSockets.Server({ server });

wss.on('connection', (ws) => {
  ws.send(JSON.stringify({
    cmd: 'initial',
    drawables: drawables.map((drawable) =>
      drawable.toJSON()
    )
  }));

  ws.on('error', () => {});
});

wss.on('error', () => {});

var broadcastState = {};

function updateState() {
  broadcast({cmd: 'update', broadcastState});
  broadcastState = {};
};

function applyState(id, state) {
  broadcastState[id] = broadcastState[id] || {};
  Object.assign(broadcastState[id], state);
}

function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState == WebSockets.OPEN) {
      client.send(JSON.stringify(data))
    }
  })
}

var called = false;
function graphical(port = 3355, updateStateInterval = 10) {
  if (called) return;
  called = true;
  server.listen(port, () => console.log(`visual debugger on http://localhost:${port}/`));
  setInterval(updateState, updateStateInterval);
}

module.exports = {
  drawables,
  broadcast,
  applyState,
  graphical
}
