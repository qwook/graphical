
const {drawables, broadcast, applyState} = require('../server.js');

var id = 0;

module.exports = class Drawable {
  constructor(state) {
    this.id = id++;
    this.state = {};

    Object.assign(this.state, {
      color: "red",
      pos: {x:0, y: 0},
      z: 0
    }, state);

    drawables.push(this);
    broadcast({cmd: 'initial', drawables: [ this.toJSON() ]});
  }

  destroy() {
    drawables.splice(drawables.indexOf(this), 1);
    broadcast({cmd: 'delete', id: this.id});
  }

  setState(newState) {
    applyState(this.id, newState);
    Object.assign(this.state, newState);
  }

  setColor(color) {
    this.setState({
      color
    });
  }

  setPos(x, y) {
    this.setState({
      pos: {x, y}
    });
  }

  setZ(z) {
    this.setState({
      z
    });
  }

  toJSON() {
    return Object.assign({},
      this.state,
      {id: this.id},
      {draw: this.draw.toString()}
    );
  }

  draw(ctx) {}
}
