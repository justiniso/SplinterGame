


// test implementation of the game objects


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

	allGoals: function(ctx, goals) {
		for(var i=0; i<goals.length; i++){
			this.goal(ctx, goals[i]);
		}
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

			// draw a long triangle
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


// methods for handling a collision with the player
var CollisionHandler = {

	urchinProximityTouched: function(player, urch) {
		if(urch.activeRadius > 0){
			urch.explode();
		}
	},

	urchinBodyTouched: function(player, urch) {

	},

	urchinArmTouched: function(player, arm) {

	}

};

function collision() {
	possibleCollisions = [];

	// check enemies (urchins)
	for(var i=0; i<enemies.length; i++){
		var enemy = enemies[i];
		var distToBody = Distance.dist(player.vector(), enemy.vector());

		if(distToBody < enemy.activeRadius){
			CollisionHandler.urchinProximityTouched(player, enemy);
		}

		// check enemies' arms
		for(var j=0; j<enemies[i].arms.length; j++){
			var arm = enemies[i].arms[j];
			var endPoints = arm.end();
			var distToArm = Distance.distToLineSegment( player.vector(), arm.origin(), arm.end() );

			if( distToArm < player.hitRadius ){
				alert("collision!");
				return true;
			}

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

		}
	}

	// check items
	for(var i=0; i<items.length; i++){

	}


	// check goals
	for(var i=0; i<goals.length; i++){
		var goal = goals[i];

		if(Distance.dist(player.vector(), goal.vector()) < (player.hitRadius+goal.hitRadius) ){
			alert("win");
			return true;
		}
	}


	// visual output
	collisionCounter.innerHTML = possibleCollisions.length;


	return false;
}



function step() {
	// wipe the canvas
	ctx.clearRect(0,0, canvas.width, canvas.height);

	// enemies step
	for(var i=0; i<enemies.length; i++){
		enemies[i].step();
	}

	// render the player, goals, and enemies
	Render.player(ctx, player);
	Render.allGoals(ctx, goals);
	Render.allUrchins(ctx, enemies);
}


function main() {
	var now = Date.now();
	var delta = now - then;
	var modifier = delta/1000;

	step();

	if( collision() ){
		clearInterval(loop);
	};

	var shiftVect = {x: 0, y: 0};



	if(motionDevice){
		var motionCorrection = 10;
		var speedCorrection = 20;

		if(player.speed/speedCorrection < 1){
			speedCorrection = 1;
		}

		// cap gamma and beta at 10
		if(gamma<-10) gamma=-10;
		else if(gamma>10) gamma=10;

		if(beta<-10) beta=-10;
		else if(beta>10) beta=10;


		if(gamma >= 0) {
			shiftVect.x = (player.speed/speedCorrection) * (-1)*(gamma/motionCorrection); 
		}

		if(gamma < 0) {
			shiftVect.x = (player.speed/speedCorrection) * (-1)*(gamma/motionCorrection);
		}

		if(beta >= 0) {
			shiftVect.y = (player.speed/speedCorrection) * (-1)*(beta/motionCorrection); 
		}

		if(beta < 0) {
			shiftVect.y = (player.speed/speedCorrection) * (-1)*(beta/motionCorrection);
		}


	}







	if(38 in keysDown) { //Up key
		shiftVect.y = player.speed * modifier;
	}
	if(40 in keysDown) { //down key
		shiftVect.y = (-1)*player.speed * modifier;
	}
	if(37 in keysDown) { //left key
		shiftVect.x = player.speed * modifier;
	}
	if(39 in keysDown) { //Up key
		shiftVect.x = (-1)*player.speed * modifier;
	}

	// shift all other objects excluding player
	for(var m=1; m<allObjects.length; m++){
		allObjects[m].shift(shiftVect.x, shiftVect.y);
	}

	levelLogicLoop();

	then = now;
}


addEventListener("keydown", function(e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e) {
	delete keysDown[e.keyCode];
}, false);

var then = Date.now();
var loop = setInterval(main, 1);
