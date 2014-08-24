
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var player, comp, ball, score1, score2, scoreText1, scoreText2, cursors;

function preload() {
	game.load.image('raquet', 'assets/raquet.png');
	game.load.image('ball', 'assets/ball.png');
	game.load.image('ground', 'assets/platform.png');
}

function create() {

	game.physics.startSystem(Phaser.Physics.ARCADE);

	score1 = 0;
	score2 = 0;

	player = game.add.sprite(20, game.world.centerY-35.5, 'raquet');
	comp = game.add.sprite(800-41, game.world.centerY-35.5, 'raquet');

	game.physics.enable(player, Phaser.Physics.ARCADE);
	game.physics.enable(comp, Phaser.Physics.ARCADE);

	player.body.immovable = true;
	comp.body.immovable = true;

	ball = game.add.sprite(game.world.centerX, game.world.centerY, 'ball');

	game.physics.enable(ball, Phaser.Physics.ARCADE);

	ball.body.velocity.setTo(300,-300);
	ball.body.collideWorldBounds = true;
	ball.body.bounce.set(1);

	cursors = game.input.keyboard.createCursorKeys();

	scoreText1 = game.add.text((game.world.width - game.world.centerX)/2, 80, '0', {font: '92px VT323', fill: 'white'});
	scoreText1.anchor.setTo(0.5, 0.5);

	scoreText2 = game.add.text(3*(game.world.width - game.world.centerX)/2, 80, '0', {font: '92px VT323', fill: 'white'});
	scoreText2.anchor.setTo(0.5, 0.5);

	var x = game.world.centerX - 10.5, y = 5;
	while (y < game.world.height) {
		game.add.sprite(x, y, 'ball');
		y += 38;
	}

}

function update() {

	game.physics.arcade.collide(player, ball, hitBackRight, null, this);
	game.physics.arcade.collide(comp, ball, hitBackLeft, null, this);

	player.body.velocity.y = 0;

	if (cursors.up.isDown) {
		player.body.velocity.y -= 500;
	} else if (cursors.down.isDown) {
		player.body.velocity.y += 500;
	} 

	/*
	if (ball.body.velocity.x > 0) {

		if (parseInt(player.body.y, 10) > 266) {
			player.body.velocity.y = -510;
		} else if (parseInt(player.body.y, 10) < 261){
			player.body.velocity.y = 510;
		} else {
			player.body.velocity.y = 0;
			player.body.y = 264;
		}

	} else {
		
		var d_x = ball.body.x - player.body.x;
		var t = d_x/Math.abs(ball.body.velocity.x);

		var pos_y = parseInt(ball.body.velocity.y*t + ball.body.y, 10) - 35;

		if (parseInt(player.body.y, 10) > pos_y) {
			player.body.velocity.y = -510;
		} else if (parseInt(player.body.y, 10) < pos_y - 7){
			player.body.velocity.y = 510;
		} else {
			player.body.y = pos_y;
			player.body.velocity.y = 0;
		}
	
	}*/
	

	if (player.body.y < 0) {
		player.body.y = 0;	
	} else if (player.body.y > game.height - 77) {
		player.body.y = game.height-77;
	}

	if (ball.body.velocity.x < 0) {

		if (parseInt(comp.body.y, 10) > 266) {
			comp.body.velocity.y = -510;
		} else if (parseInt(comp.body.y, 10) < 261){
			comp.body.velocity.y = 510;
		} else {
			comp.body.velocity.y = 0;
			comp.body.y = 264;
		}

	} else {
		
		var d_x = comp.body.x-ball.body.x;
		var t = d_x/ball.body.velocity.x;

		var pos_y = parseInt(ball.body.velocity.y*t + ball.body.y, 10) - 35;

		if (parseInt(comp.body.y, 10) > pos_y) {
			comp.body.velocity.y = -510;
		} else if (parseInt(comp.body.y, 10) < pos_y - 7){
			comp.body.velocity.y = 510;
		} else {
			comp.body.y = pos_y;
			comp.body.velocity.y = 0;
		}
	
	}
		
	if (comp.body.y < 0) {
		comp.body.y = 0;	
	} else if (comp.body.y > game.height - 77) {
		comp.body.y = game.height-77;
	}

	if (ball.body.x < 5) {
		score2 += 1;
		scoreText2.text = score2+'';
		restart();
	} else if (ball.body.x > 775) {
		score1 += 1;
		scoreText1.text = score1+'';
		restart();
	}

}

function hitBackRight() {
	ball.body.velocity.x += 15*Math.random();
	ball.body.velocity.y += Math.random()*player.body.velocity.y;	
}

function hitBackLeft() {
	ball.body.velocity.x -= 15*Math.random();
	ball.body.velocity.y += Math.random()*comp.body.velocity.y;		
}

function restart() {

	ball.reset(game.world.centerX, game.world.centerY);
	player.reset(20, game.world.centerY-35.5);
	comp.reset(800-41, game.world.centerY-35.5);

	var m = 1, n = 1, rand = Math.random();

	if (rand < 0.2) {
		m = 1;
		n = -1;
	} else if (rand < 0.5) {
		m = -1;
		n = -1;
	} else if (rand < 0.7) {
		m = -1;
		n = 1;
	}

	ball.body.velocity.setTo(m*300,n*300);
}