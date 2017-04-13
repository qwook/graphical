
const Drawable = require('./Drawable.js');

module.exports = class Circle extends Drawable {
  constructor(state) {
    super(Object.assign({
      radius: 3,
      outlineWidth: 0,
      outlineColor: 'black'
    }, state));
  }

  setRadius(radius) {
    this.setState({
      radius
    });
  }

  setOutlineWidth(outlineWidth) {
    this.setState({
      outlineWidth
    });
  }

  setOutlineColor(outlineColor) {
    this.setState({
      outlineColor
    });
  }

  draw(ctx) {
    ctx.fillStyle = this.state.color;
    ctx.strokeStyle = this.state.outlineColor;

    ctx.beginPath();
    ctx.arc( this.state.pos.x, this.state.pos.y, this.state.radius, 0, 2 * Math.PI, false );

    if (this.state.color != "transparent")
      ctx.fill();

    if (this.state.outlineWidth > 0) {
      ctx.lineWidth = this.state.outlineWidth;
      ctx.stroke();
    }
  }
}
