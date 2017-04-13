
const Drawable = require('./Drawable.js');

module.exports = class Text extends Drawable {
  constructor(state) {
    super(Object.assign({
      text: '',
      font: '12px Arial',
      color: 'black',
      outlineWidth: 0,
      outlineColor: 'black',
      lineHeight: 0
    }, state));
  }

  setText(text) {
    this.setState({
      text
    });
  }

  setFont(font) {
    this.setState({
      font
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

  setLineHeight(lineHeight) {
    this.setState({
      lineHeight
    });
  }

  draw (ctx) {
    ctx.fillStyle = this.state.color;
    ctx.strokeStyle = this.state.outlineColor;

    ctx.beginPath();
    ctx.font = this.state.font;

    var lines = this.state.text.split('\n');

    if (this.state.color != "transparent") {
      if (this.state.lineHeight > 0) {
        for (var i in lines) {
          ctx.fillText(lines[i], this.state.pos.x, this.state.pos.y + i * this.state.lineHeight);
        }
      } else {
        ctx.fillText(this.state.text, this.state.pos.x, this.state.pos.y);
      }
    }

    if (this.state.outlineWidth > 0) {
      ctx.lineWidth = this.state.outlineWidth;
      if (this.state.lineHeight > 0) {
        for (var i in lines) {
          ctx.strokeText(lines[i], this.state.pos.x, this.state.pos.y + i * this.state.lineHeight);
        }
      } else {
        ctx.strokeText(this.state.text, this.state.pos.x, this.state.pos.y);
      }
    }
  }
}
