module.exports = function() {

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  function open(ws) {
    var drawables = {};

    // Loop through all the shapes and draw them

    function redraw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      var drawablesArray = [];
      for (var i in drawables) {
        drawablesArray.push(drawables[i]);
      }

      // Sort drawable by z-index

      drawablesArray.sort(function(a, b) {
        return a.z - b.z;
      })

      for (var i in drawablesArray) {
        var drawable = drawablesArray[i];
        drawable.draw.apply({state: drawable}, [ctx]);
      }
    }

    ws.addEventListener('message', function(event) {
      var data = JSON.parse(event.data);

      // Handle the creation of multiple drawables

      if (data.cmd == 'initial') {
        for (var i in data.drawables) {
          var drawable = data.drawables[i];
          drawables[drawable.id] = drawable;

          var draw;
          eval('function ' + drawable.draw);
          drawable.draw = draw;
        }

        redraw();
      }

      // Handle a broadcast state change

      if (data.cmd == 'update') {
        for (var id in data.broadcastState) {
          var drawable = drawables[id];
          var newState = data.broadcastState[id];
          if (drawable) {
            for (var k in newState) {
              drawable[k] = newState[k];
            }
          }
        }

        redraw();
      }

      // Delete a drawable

      if (data.cmd == 'delete') {
        delete drawables[data.id];

        redraw();
      }
    })
  }

  // Open up websockets with auto-reconnect

  var ws = null;
  function retry () {
    if (ws) return;

    ws = new WebSocket(`ws://${location.host}`);
    ws.addEventListener('open', function() { open(ws) });
    ws.addEventListener('close', function() { ws = null; setTimeout( retry, 1000 ) });
    ws.addEventListener('error', function() { ws == null; setTimeout( retry, 1000 ) });
  }
  retry();

}