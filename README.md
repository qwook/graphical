
# graphical
  
Graphical is a very lightweight framework used to dynamically draw graphics  from NodeJS straight to the browser. Graphical is great for visualizing server-side data such as X, Y coordinates and accelerometer output in real-time.

No more having to deal with console.log spamming, make your debugging graphical!

## Getting started


### First steps

Install graphical through NPM:

`npm install --save-dev graphical`

```
var { graphical } = require('graphical');

graphical(8111); // listen on port 8111

```
  
Graphical should now be accessible on http://localhost:8111/

### Drawing Shapes

```
var { Rectangle, graphical } = require('graphical');

graphical(8111);

var rectangle = new Rectangle();
rectangle.setPos(0, 0);
rectangle.setColor('blue');
rectangle.setSize(20, 20);

```

Check out `./test.js` for more examples.


## API

### `new Drawable()`
Base class for all graphical objects.

* `.destroy()` Removes the Drawable. 
* `.setColor( color: String )` Sets the fill-color of the drawable. `color ` could be any variation of a CSS-style color: "red", "#ff0000", "rgb(255, 0, 0)".
* `.setPos( x: Number, y: Number )`
* `.setZ( zIndex: int = 0 )` Changes drawing order. Set z-index to a *negative* number to draw behind every Drawable. Set z-index to a *positive* number to draw in front of every Drawable. If two objects have the same z-index, then they are drawn based on creation time.

### `new Circle()`
extends from `Drawable`

* `.setRadius( radius: Number )`
* `.setOutlineWidth( width: Number = 0 )` Thickness of the circle's outline, in pixels.
* `.setOutlineColor( color: String )`

### `new Rectangle()`
extends from `Drawable`

* `.setSize( width: Number, height: Number )`
* `.setWidth( width: Number )`
* `.setHeight( height: Number )`
* `.setOutlineWidth( width: Number = 0 )` Thickness of the rectangle's outline, in pixels.
* `.setOutlineColor( color: String )`

### `new Line()`
extends from `Drawable`

* `.setPos2( x: Number, y: Number )` Sets the position for the line's second end-point. (To be used in-conjunction with `setPos`)
* `.setWidth( width: Number )` Thickness of the line, in pixels.

### `new Text()`
extends from `Drawable`

* `.setFont( font: String ) ` CSS-style description of font and font size. Ex: "12pt Times New Roman", "bold 12px Arial", "italic bold 16px Arial".
* `.setText( text: String )`
* `.setLineHeight( lineHeight: number = 0 )` How tall each line should be (in pixels) when breaking up multi-line text. If set to `0`, don't break up multiline text.
* `.setOutlineWidth( width: Number = 0 )` Thickness of the text's outline, in pixels.
* `.setOutlineColor( color: String )`
