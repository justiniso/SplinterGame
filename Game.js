


// test implementation of the game objects

// globals
var canvas,
	ctx,
	player,
	goal,
	enemies,
	items;

// contains all objects on the level, player is always first
var allObjects = [];
var possibleCollisions = [];

var keysDown = {};

var level = 1;

// a function to execute before each level
var levelLogicBefore = function() {};

// a function to execute every time the loop is called
var levelLogicLoop = function() {};




canvas = document.getElementById('main-canvas');
ctx = canvas.getContext('2d');
ctx.clearRect(0,0, canvas.width, canvas.height);




if(level==1){

	// instances for level 1
	player = new Hero({
		x: 300,
		y: 300,
		hitRadius: 5, 
		angle: 0,
		speed: 5
	});

	goal = new GameObject({
		x: 550,
		y: 550,
		hitRadius: 10,
		angle: 0
	});

	items = [];

	enemies = [
		new Urchin({
			x:100,
			y: 100,
			rotateSpeed: 0.01,
			hitRadius: 4,
			arms: [
				new Arm({length: 50, angle: 0.11*Math.PI, growSpeed: 0.9}),
				new Arm({length: 80, angle: 0.28*Math.PI, growSpeed: 0.8}),
				new Arm({length: 20, angle: 0.35*Math.PI, growSpeed: 0.6}),
				new Arm({length: 30, angle: 0.48*Math.PI, growSpeed: 0.7}),
				new Arm({length: 50, angle: 0.91*Math.PI, growSpeed: 0.9}),
				new Arm({length: 30, angle: 0.99*Math.PI, growSpeed: 0.7})

		]}),

		new Urchin({
			x:200,
			y: 200,
			rotateSpeed: -0.005,
			hitRadius: 4,
			arms: [
				new Arm({length: 20, angle: 1.4*Math.PI, growSpeed: 0.8}),
				new Arm({length: 10, angle: 1.7*Math.PI, growSpeed: 0.1}),
				new Arm({length: 30, angle: 2.2*Math.PI, growSpeed: 0.1}),
				new Arm({length: 20, angle: 2.6*Math.PI, growSpeed: 0.2}),
				new Arm({length: 10, angle: 3.2*Math.PI, growSpeed: 0.4})
		]}),

		new Urchin({
			x:375,
			y: 125,
			rotateSpeed: -0.005,
			hitRadius: 4,
			arms: [
				new Arm({length: 80, angle: 1.4*Math.PI, growSpeed: 0.8}),
				new Arm({length: 90, angle: 1.7*Math.PI, growSpeed: 0.1}),
				new Arm({length: 110, angle: 2.2*Math.PI, growSpeed: 0.1}),
				new Arm({length: 100, angle: 2.6*Math.PI, growSpeed: 0.2}),
				new Arm({length: 90, angle: 3.2*Math.PI, growSpeed: 0.4})
		]}),

		new Urchin({
			x:500,
			y: 400,
			rotateSpeed: -0.005,
			hitRadius: 4,
			arms: [
				new Arm({length: 40, angle: 0.1*Math.PI, growSpeed: 0.3}),
				new Arm({length: 80, angle: 0.15*Math.PI, growSpeed: 0.1}),
				new Arm({length: 50, angle: 0.3*Math.PI, growSpeed: 0.1}),
				new Arm({length: 60, angle: 0.35*Math.PI, growSpeed: 0.2}),
				new Arm({length: 80, angle: 1.3*Math.PI, growSpeed: 0.1}),
				new Arm({length: 40, angle: 1.5*Math.PI, growSpeed: 0.2}),
				new Arm({length: 30, angle: 1.7*Math.PI, growSpeed: 0.4})
		]}),

		new Urchin({
			x:400,
			y: 500,
			rotateSpeed: -0.01,
			hitRadius: 4,
			arms: [
				new Arm({length: 60, angle: 0.4*Math.PI, growSpeed: 0.4}),
				new Arm({length: 50, angle: 1.2*Math.PI, growSpeed: 0.1}),
				new Arm({length: 40, angle: 1.7*Math.PI, growSpeed: 0.1}),
				new Arm({length: 50, angle: 1.9*Math.PI, growSpeed: 0.2}),
				new Arm({length: 60, angle: 3.4*Math.PI, growSpeed: 0.3}),
		]}),

		new Urchin({
			x:100,
			y: 450,
			rotateSpeed: 0.01,
			hitRadius: 4,
			arms: [
				new Arm({length: 10, angle: 0.11*Math.PI, growSpeed: 0.9}),
				new Arm({length: 10, angle: 0.28*Math.PI, growSpeed: 0.8}),
				new Arm({length: 10, angle: 0.35*Math.PI, growSpeed: 0.6}),
				new Arm({length: 10, angle: 0.48*Math.PI, growSpeed: 0.7}),
				new Arm({length: 10, angle: 0.91*Math.PI, growSpeed: 0.9}),
				new Arm({length: 10, angle: 0.99*Math.PI, growSpeed: 0.7})

		]})
	];

	// add all of the objects into one array
	allObjects = [player, goal];
	allObjects = allObjects.concat(enemies);
}


var Distance = {
	
	// square a value
	sqr: function(x) {
		return x * x;
	},

	// squared distance between 2 points
	dist2: function(vec1, vec2) {
		return this.sqr(vec1.x-vec2.x) + this.sqr(vec1.y-vec2.y);
	},

	dist: function(vec1, vec2) {
		return Math.sqrt(this.dist2(vec1, vec2));
	},

	distToLineSegment2: function(point, line1, line2) {
		// the squared length of the line
		var len2 = this.dist2(line1, line2);

		// line's endpoints are the same, i.e. 0 length
		if(len2==0) return this.dist2(point, line1);

		var dotProduct = (point.x - line1.x) * (line2.x - line1.x) + 
						 (point.y - line1.y) * (line2.y - line1.y);

		var t = dotProduct / len2;

		// point beyond line1 point
		if(t < 0) return this.dist2(point, line1);

		// point beyond line2 point
		if(t > 1) return this.dist2(point, line2);

		return this.dist2(point, {
			x: line1.x + t*(line2.x - line1.x),
			y: line1.y + t*(line2.y - line1.y)
		});

	},

	distToLineSegment: function(point, line1, line2) {
		return Math.sqrt( this.distToLineSegment2(point, line1, line2) );
	}
};


var Render = {

	circle: function(ctx, centerX, centerY, radius, startAngle, endAngle, antiClockwise) {
		startAngle = startAngle || 0;
		endAngle = endAngle || 2*Math.PI;
		antiClockwise = antiClockwise || true;

		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, startAngle, endAngle, antiClockwise);
		ctx.closePath();
		ctx.fill();
	},

	rectangle: function() {

	},

	image: function() {

	},

	player: function(ctx, player) {
		this.circle(ctx, player.x, player.y, player.hitRadius);
	},

	goal: function(ctx, goal) {
		this.circle(ctx, goal.x, goal.y, goal.hitRadius);
	},

	urchin: function(ctx, urchin) {
		var origin = urchin.vector();

		ctx.strokeStyle = 'black';
		ctx.lineWidth = 0.5;

		// draw a circle
		this.circle(ctx, origin.x, origin.y, urchin.hitRadius, 0, urchin.angle, true);

		for(var i=0; i<urchin.arms.length; i++){
			var arm = urchin.arms[i];
			var armEnd = arm.end();

			ctx.beginPath();
			ctx.moveTo(origin.x, origin.y);
			ctx.moveTo(origin.x+1, origin.y+1);
			ctx.lineTo(armEnd.x, armEnd.y);
			ctx.lineTo(origin.x-1, origin.y-1);
			ctx.closePath();
			ctx.fill();
			
			// fill the stroke
			ctx.stroke();
		}
	},

	allUrchins: function(ctx, urchins) {
		for(var i=0; i<urchins.length; i++) {
			this.urchin(ctx, urchins[i]);
		}
	}
};

function collision() {
	possibleCollisions = [];

	// check enemies
	for(var i=0; i<enemies.length; i++){

		// check enemies' arms
		for(var j=0; j<enemies[i].arms.length; j++){
			var arm = enemies[i].arms[j];
			var endPoints = arm.end();
			var distToPlayer = Distance.distToLineSegment( player.vector(), arm.origin(), arm.end() );

			if( distToPlayer < player.hitRadius ){
				alert("collision!");
				return true;
			}

			/* Omitted due to unknown bug (not detecting collisions properly), efficiency not primary concern
			// if player is outside outer bounding box of the arm, do not run collision detection 
			// calculations (inefficient)
			if(arm.x < (player.x-player.hitRadius) && endPoints.x < (player.x-player.hitRadius) ||
				arm.x > (player.x+player.hitRadius) && endPoints.x > (player.x+player.hitRadius) ||
				arm.y < (player.y-player.hitRadius) && endPoints.y < (player.y-player.hitRadius) ||
				arm.y > (player.y+player.hitRadius) && endPoints.y > (player.y+player.hitRadius) ) {
				continue;
			} else {

				possibleCollisions.push(enemies[i].arms[j]);

				// run collision detection against the possible collision objects
				for(var k=0; k<possibleCollisions.length; k++){

					var distToPlayer = Distance.distToLineSegment(
						player.vector(), possibleCollisions[k].origin(), possibleCollisions[k].end() );

					if( distToPlayer < player.hitRadius ){
						alert("collision!");
						return true;
					}
				}
			}
			*/

		}
	}

	// check items
	for(var i=0; i<items.length; i++){

	}


	// check goal
	if(Distance.dist(player.vector(), goal.vector()) < (player.hitRadius+goal.hitRadius) ){
		alert("win");
		return true;
	}


	return false;
}



function step() {
	// wipe the canvas
	ctx.clearRect(0,0, canvas.width, canvas.height);

	// enemies step
	for(var i=0; i<enemies.length; i++){
		enemies[i].step();
	}

	// render the player, goal, and enemies
	Render.player(ctx, player);
	Render.goal(ctx, goal);
	Render.allUrchins(ctx, enemies);
}


function main() {
	step();

	if( collision() ){
		clearInterval(loop);
	};

	var shiftVect = {x: 0, y: 0};

	if(38 in keysDown) { //Up key
		shiftVect.y = player.speed;
	}
	if(40 in keysDown) { //down key
		shiftVect.y = (-1)*player.speed;
	}
	if(37 in keysDown) { //left key
		shiftVect.x = player.speed;
	}
	if(39 in keysDown) { //Up key
		shiftVect.x = (-1)*player.speed;
	}

	// shift all other objects excluding player
	for(var m=1; m<allObjects.length; m++){
		allObjects[m].shift(shiftVect.x, shiftVect.y);
	}

	levelLogicLoop();
}


addEventListener("keydown", function(e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e) {
	delete keysDown[e.keyCode];
}, false);

var loop = setInterval(main, 100);