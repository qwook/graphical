
const {graphical} = require('./server.js');
const Drawable = require('./components/Drawable.js');
const Circle = require('./components/Circle.js')
const Line = require('./components/Line.js')
const Rectangle = require('./components/Rectangle.js')
const Text = require('./components/Text.js')

module.exports = {
  Drawable,
  Circle,
  Line,
  Rectangle,
  Text,
  graphical
}
