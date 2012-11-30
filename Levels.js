level = 1;

if(level=="demo"){

	// instances for level 1
	player = new Hero({
		x: 300,
		y: 300,
		hitRadius: 5, 
		angle: 0,
		speed: 80
	});

	goals = [
		new GameObject({
			x: 550,
			y: 550,
			hitRadius: 10,
			angle: 0
		})
	];

	items = [];

	enemies = [
		new Urchin({
			x:200,
			y: 200,
			rotateSpeed: 0.000,
			hitRadius: 4,
			active: false,
			activeRadius: 130,
			explodeToLength: 100,
			arms: [
				new Arm({length: 22, angle: 0.11*Math.PI, growSpeed: 0.05, explodeLength: 100}),
				new Arm({length: 14, angle: 0.28*Math.PI, growSpeed: 0.05, explodeLength: 100}),
				new Arm({length: 13, angle: 0.35*Math.PI, growSpeed: 0.05, explodeLength: 100}),
				new Arm({length: 17, angle: 0.48*Math.PI, growSpeed: 0.05, explodeLength: 100}),
				new Arm({length: 20, angle: 0.91*Math.PI, growSpeed: 0.05, explodeLength: 100}),
				new Arm({length: 19, angle: 0.99*Math.PI, growSpeed: 0.05, explodeLength: 100})

		]}),

		new Urchin({
			x:500,
			y: 200,
			rotateSpeed: 0.005,
			hitRadius: 4,
			activeRadius: 130,
			explodeToLength: 20,
			arms: [
				new Arm({length: 40, angle: 0.1*Math.PI, growSpeed: 0.0}),
				new Arm({length: 50, angle: 0.5*Math.PI, growSpeed: 0.0}),
				new Arm({length: 60, angle: 0.9*Math.PI, growSpeed: 0.0}),
				new Arm({length: 70, angle: 1.3*Math.PI, growSpeed: 0.0}),
				new Arm({length: 60, angle: 1.7*Math.PI, growSpeed: 0.0})
		]}),
	];

	// add all of the objects into one array
	allObjects = [player];
	allObjects = allObjects.concat(goals, enemies, items, decorations);
}


if(level==1){

	// instances for level 1
	player = new Hero({
		x: 300,
		y: 300,
		hitRadius: 5, 
		angle: 0,
		speed: 80
	});

	goals = [
		new GameObject({
			x: 550,
			y: 550,
			hitRadius: 10,
			angle: 0
		})
	];

	items = [];

	enemies = [
		new Urchin({
			x:100,
			y: 100,
			rotateSpeed: 0.000,
			hitRadius: 4,
			activeRadius: 110,
			explodeToLength: 200,
			arms: [
				new Arm({length: 10, angle: 0.11*Math.PI, growSpeed: 0.05, explodeLength: 100}),
				new Arm({length: 10, angle: 0.28*Math.PI, growSpeed: 0.05, explodeLength: 100}),
				new Arm({length: 10, angle: 0.35*Math.PI, growSpeed: 0.05, explodeLength: 100}),
				new Arm({length: 10, angle: 0.48*Math.PI, growSpeed: 0.05, explodeLength: 100}),
				new Arm({length: 10, angle: 0.91*Math.PI, growSpeed: 0.05, explodeLength: 100}),
				new Arm({length: 10, angle: 0.99*Math.PI, growSpeed: 0.05, explodeLength: 100})

		]}),

		new Urchin({
			x:200,
			y: 200,
			rotateSpeed: -0.002,
			hitRadius: 4,
			arms: [
				new Arm({length: 20, angle: 1.4*Math.PI, growSpeed: 0.08}),
				new Arm({length: 10, angle: 1.7*Math.PI, growSpeed: 0.01}),
				new Arm({length: 30, angle: 2.2*Math.PI, growSpeed: 0.01}),
				new Arm({length: 20, angle: 2.6*Math.PI, growSpeed: 0.02}),
				new Arm({length: 10, angle: 3.2*Math.PI, growSpeed: 0.04})
		]}),

		new Urchin({
			x:375,
			y: 125,
			rotateSpeed: -0.002,
			hitRadius: 4,
			arms: [
				new Arm({length: 80, angle: 1.4*Math.PI, growSpeed: 0.08}),
				new Arm({length: 90, angle: 1.7*Math.PI, growSpeed: 0.01}),
				new Arm({length: 110, angle: 2.2*Math.PI, growSpeed: 0.01}),
				new Arm({length: 100, angle: 2.6*Math.PI, growSpeed: 0.02}),
				new Arm({length: 90, angle: 3.2*Math.PI, growSpeed: 0.04})
		]}),

		new Urchin({
			x:500,
			y: 400,
			rotateSpeed: -0.002,
			hitRadius: 4,
			arms: [
				new Arm({length: 40, angle: 0.1*Math.PI, growSpeed: 0.03}),
				new Arm({length: 80, angle: 0.15*Math.PI, growSpeed: 0.01}),
				new Arm({length: 50, angle: 0.3*Math.PI, growSpeed: 0.01}),
				new Arm({length: 60, angle: 0.35*Math.PI, growSpeed: 0.02}),
				new Arm({length: 80, angle: 1.3*Math.PI, growSpeed: 0.01}),
				new Arm({length: 40, angle: 1.5*Math.PI, growSpeed: 0.02}),
				new Arm({length: 30, angle: 1.7*Math.PI, growSpeed: 0.04})
		]}),

		new Urchin({
			x:400,
			y: 500,
			rotateSpeed: -0.001,
			hitRadius: 4,
			arms: [
				new Arm({length: 60, angle: 0.4*Math.PI, growSpeed: 0.04}),
				new Arm({length: 50, angle: 1.2*Math.PI, growSpeed: 0.01}),
				new Arm({length: 40, angle: 1.7*Math.PI, growSpeed: 0.01}),
				new Arm({length: 50, angle: 1.9*Math.PI, growSpeed: 0.02}),
				new Arm({length: 60, angle: 3.4*Math.PI, growSpeed: 0.03}),
		]}),

		new Urchin({
			x:100,
			y: 450,
			rotateSpeed: 0.001,
			hitRadius: 4,
			arms: [
				new Arm({length: 10, angle: 0.11*Math.PI, growSpeed: 0.09}),
				new Arm({length: 10, angle: 0.28*Math.PI, growSpeed: 0.08}),
				new Arm({length: 10, angle: 0.35*Math.PI, growSpeed: 0.06}),
				new Arm({length: 10, angle: 0.48*Math.PI, growSpeed: 0.07}),
				new Arm({length: 10, angle: 0.91*Math.PI, growSpeed: 0.09}),
				new Arm({length: 10, angle: 0.99*Math.PI, growSpeed: 0.07})

		]})
	];

	// add all of the objects into one array
	allObjects = [player];
	allObjects = allObjects.concat(goals, enemies, items, decorations);
}