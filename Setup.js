// globals
var canvas;
var ctx;

var alpha=0;
var beta=0;
var gamma=0;
var motionDevice = false;

var collisionCounter = document.querySelector('.collisions .count');
var gammaCounter = document.querySelector('.motion .gamma');
var betaCounter = document.querySelector('.motion .beta');

// for game controls
var keysDown = {};

// game objects
var player;
var goals = [];
var enemies = [];
var items = [];
var decorations = [];
var allObjects = [];

var possibleCollisions = [];


// for game levels
var level = "demo";
var levelLogicBefore = function() {}; // a function to execute before each level
var levelLogicLoop = function() {}; // a function to execute every time the loop is called



// basic canvas setup
canvas = document.getElementById('main-canvas');
ctx = canvas.getContext('2d');
ctx.clearRect(0,0, canvas.width, canvas.height);


// check if device has motion
if(window.DeviceMotionEvent){
	console.log("Device motion events enabled");

	window.ondeviceorientation = function(event) {
		alpha = Math.round(event.alpha);
		beta = Math.round(event.beta);
		gamma = Math.round(event.gamma);
		
		// visual output
		gammaCounter.innerHTML = gamma+"";
		betaCounter.innerHTML = beta+"";
	};
	motionDevice = true;

} else {
	console.log("No device motion events");
}



