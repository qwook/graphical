
var {
  Circle,
  Line,
  Rectangle,
  Drawable,
  Text,
  graphical
} = require('.');

// start listening

graphical(8111);

// draw a simple rectangle

var rectangle = new Rectangle();
rectangle.setColor('blue');
rectangle.setSize(20, 20);
rectangle.setOutlineWidth(2);
rectangle.setOutlineColor('yellow');

// draw text

var text = new Text();
text.setText('Hello, world!\npoop\nworld');
text.setFont("bold 40px Arial");
text.setPos(50, 100);
text.setLineHeight(40);
text.setColor("yellow")
text.setOutlineWidth(2);
text.setOutlineColor("black");

// draw a spinning ball on a string

var circle = new Circle();

circle.setColor('red');
circle.setRadius(4);
circle.setOutlineWidth(2);

var line = new Line();
line.setColor('black');
line.setPos(50, 50);
line.setWidth(5);
line.setZ(-1);

setInterval(() => {
  circle.setRadius(Math.sin(new Date().getTime() / 500)*5 + 11);
  circle.setPos(Math.sin(new Date().getTime() / 500)*20 + 50, Math.cos(new Date().getTime() / 500)*20 + 50);
  line.setPos2(Math.sin(new Date().getTime() / 500)*20 + 50, Math.cos(new Date().getTime() / 500)*20 + 50);
}, 10);

// manipulating text

var marquee = new Text();
marquee.setPos(150, 20);
marquee.setFont('16pt Courier New');
var marqueeText = 'Lorem ipsum dolar set amet!';
var marqueeIndex = 0;
setInterval(() => {
  marqueeIndex = (marqueeIndex + 1) % (marqueeText.length + 3);
  marquee.setText((marqueeText + ' - ' + marqueeText + ' - ').substring(marqueeIndex, marqueeIndex+marqueeText.length));
}, 100);

setInterval(() => {
  marquee.setColor(['green', 'red', 'blue', 'black'][Math.floor(Math.random() * 4)]);
}, 1000);

setInterval(() => {
  marquee.setFont(`${16 + (Math.sin(new Date().getTime() / 1000) + 1) * 5}pt Courier New`);
}, 10);

// creating and destroying objects

var flashingCircle;
setInterval(() => {
  if (!flashingCircle) {
    flashingCircle = new Circle();
    flashingCircle.setColor(['green', 'red', 'blue', 'black'][Math.floor(Math.random() * 4)]);
    flashingCircle.setRadius(60);
    flashingCircle.setPos(200, 150);
  } else {
    flashingCircle.destroy();
    flashingCircle = null;
  }
}, 1000);
