
const Drawable = require('./Drawable.js');

module.exports = class Line extends Drawable {
  constructor(state) {
    super(Object.assign({
      pos2: {x:0, y: 0},
      width: 1
    }, state));
  }

  setWidth(width) {
    this.setState({
      width
    })
  }

  setPos2(x, y) {
    this.setState({
      pos2: {x, y}
    })
  }

  draw(ctx) {
    ctx.fillStyle = '';
    ctx.strokeStyle = this.state.color;

    ctx.lineWidth = this.state.width;
    ctx.beginPath();
    ctx.moveTo(this.state.pos.x, this.state.pos.y);
    ctx.lineTo(this.state.pos2.x, this.state.pos2.y);
    ctx.stroke();
  }
}
