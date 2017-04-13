
const Drawable = require('./Drawable.js');

module.exports = class Rectangle extends Drawable {
  constructor(state) {
    super(Object.assign({
      size: {w: 100, h: 100},
      outlineWidth: 0,
      outlineColor: 'black'
    }, state));
  }

  setSize(w, h) {
    this.setState({
      size: {w, h}
    });
  }

  setWidth(w) {
    this.setState({
      size: Object.assign(this.state.size, { w })
    });
  }

  setHeight(h) {
    this.setState({
      size: Object.assign(this.state.size, { h })
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

  draw (ctx) {
    ctx.fillStyle = this.state.color;
    ctx.strokeStyle = this.state.outlineColor;

    ctx.beginPath();
    ctx.rect( this.state.pos.x, this.state.pos.y, this.state.size.w, this.state.size.h );

    if (this.state.color != "transparent")
      ctx.fill();

    if (this.state.outlineWidth > 0) {
      ctx.lineWidth = this.state.outlineWidth;
      ctx.stroke();
    }
  }
}
