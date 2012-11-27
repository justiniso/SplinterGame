
// cache pi for performance
var PI = Math.PI; 

// Game objects are anything displayed on the screen to a user. Can be
// a player, NPC, goal, wall, item, etc
var GameObject = Class.create({

	initialize: function(spec){

		// allows objects to be called without providing an spec object
		spec = spec || {};

		// neutral, player, enemy, item
		this.class = "neutral";

		// positions to tell how to render
		this.x = spec.x || 0;
		this.y = spec.y || 0;
		this.angle = spec.angle || PI/2;	// defines an angle in radians

		// Defines the inner circle to be used for collision detection with
		// other game objects
		this.hitRadius = spec.hitRadius || 0;

	},


	// a method to draw the object with their x-position and y-position
	draw: function() {

	},

	// return object's x- and y-coordinates as a vector-like object
	vector: function() {
		return {x: this.x, y: this.y};
	},

	// shift the object's position
	shift: function(x, y) {
		this.x += x;
		this.y += y;
	}

});


// Characters are any moving game objects (such as the player and NPC's)
var Character = Class.create(GameObject, {
	
	initialize: function($super, spec) {
		$super(spec);

		spec = spec || {};

		this.class="neutral";

		// movement
		this.speed = spec.speed || 0;
		this.acceleration = spec.acceleration || 0;
		this.deceleration = spec.deceleration || 0;
		this.delay = spec.delay || 0;

	},

	draw: function() {

	}
});



// The player's main character
var Hero = Class.create(Character, {


	initialize: function($super, spec) {
		$super(spec);

		spec = spec || {};
		this.class = "player";
	},


	draw: function() {
		
	}
});



// Urchins are the primary enemy. They have multiple arms which extend
// outward in an attempt to strike the player or block their path
var Urchin = Class.create(Character, {

	initialize: function($super, spec) {
		$super(spec);

		spec = spec || {};
		this.class = "enemy";

		this.hitRadius = 3;

		// 0 = no rotation, (+) = clockwise, (-) = counterclockwise
		this.rotateSpeed = spec.rotateSpeed || 0;

		// the distance from the player at which the special behavior activates
		this.activeProximity = spec.activeProximity || 0;

		this.arms = spec.arms || [];	// stores the actual arms
		this.initialArmLengths = [];

		// initialize arms, setting body and x- and y-coordinates
		this.initArms();
	},

	// 
	initArms: function() {
		
		// set the body, x- and y-coords of each arm
		for(var i in this.arms){
			var arm = this.arms[i];
			arm.body = this;
			arm.x = this.x;
			arm.y = this.y;

			this.initialArmLengths.push(this.arms[i].length);
		}
	},

	explode: function() {
		for(var i=0; i<this.arms.length; i++){
			var arm = this.arms[i];
			arm.length = arm.explodeLength;
		}
	}, 

	explodeTo: function(length) {
		for(var i=0; i<this.arms.length; i++){
			var arm = this.arms[i];
			arm.length = length;
		}
	}, 

	// arms increase by amount parameter
	explodeBy: function(length) {
		for(var i=0; i<this.arms.length; i++){
			var arm = this.arms[i];
			arm.length += length;
		}
	},

	getArmCount: function() {
		return this.arms.length;
	},

	// groups everything an urchin will do (e.g. grow arms, rotate, etc.)
	step: function() {

		// rotation, rotate all arms and body
		if(this.rotateSpeed != 0){

			// increase all arms' angles by the rotate speed
			for(var i=0; i<this.arms.length; i++){
				this.arms[i].angle += this.rotateSpeed;
			}

			this.angle += this.rotateSpeed;
		}

		// moving, move all arms and body
		if(this.speed > 0){

		}

		// growing arms
		for(var i=0; i<this.arms.length; i++){
			this.arms[i].grow();
		}

	}
});


// 
var Arm = Class.create(Character, {
	
	initialize: function($super, spec) {
		$super(spec);

		spec = spec || {};
		this.class = "enemy";

		this.body;	// the arms's parent body
		this.length = spec.length || 0;
		this.growSpeed = spec.growSpeed || 0;
		this.explodeLength = this.explodeLength || 0;
		this.implodeLength = this.implodeLength || 0;

	},

	// the point from which the arm expands outward
	origin: function() {
		return {x: this.body.x, y: this.body.y};
	},

	// the end point of the arm (away from the body)
	end: function() {
		var endX = this.body.x + this.length * Math.cos(this.angle);
		var endY = this.body.y + this.length * Math.sin(this.angle);
		return {x: endX, y: endY};
	},

	// increase the arm's length by the amount parameter, if provided,
	// default to the default grow speed
	grow: function(amount) {
		if(amount){
			this.length += amount;
		} else {
			this.length += this.growSpeed;
		}
	}
});

var Item = Class.create(Character, {

	initialize: function($super, spec) {
		$super(spec);

		spec = spec || {};
		this.class = "item";
	},

	// execute when player gets item
	claimed: function() {

	}

});

