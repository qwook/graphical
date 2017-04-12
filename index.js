var http = require('http');
var ws = require('ws');
var clientJs = require('./client.js');

var server = http.createServer((req, res) => {
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

function graphical(port = 3355) {
	server.listen(port, () => console.log(`visual debugger on http://localhost:${port}/`));
}

var id = 0;
var drawables = [];

const wss = new ws.Server({ server });

wss.on('connection', (ws) => {
	ws.send(JSON.stringify({
		cmd: 'initial',
		drawables: drawables.map((drawable) =>
			drawable.toJSON()
		)
	}));
});

wss.on('error', () => {});

function broadcast(data) {
	wss.clients.forEach((client) => {
		if (client.readyState == ws.OPEN) {
			client.send(JSON.stringify(data))
		}
	})
}

class Drawable {
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
		broadcast({cmd: 'update', id: this.id, newState});
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

class Circle extends Drawable {
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

class Line extends Drawable {
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

class Rectangle extends Drawable {
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

class Text extends Drawable {
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

module.exports = {
	Circle,
	Line,
	Rectangle,
	Drawable,
	Text,
	graphical
}
