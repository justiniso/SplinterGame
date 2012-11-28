
var alpha=0,
	beta=0,
	gamma=0
	motionDevice = false;




// check if device has motion
if(window.DeviceMotionEvent){
	console.log("Device motion events enabled");

	window.ondeviceorientation = function(event) {
		alpha = Math.round(event.alpha);
		beta = Math.round(event.beta);
		gamma = Math.round(event.gamma);
		document.querySelector('.motion .gamma').innerHTML = gamma+"";
		document.querySelector('.motion .beta').innerHTML = beta+"";
	};
	motionDevice = true;

} else {
	console.log("No device motion events");
}


