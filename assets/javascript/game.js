var playerSelected = false;
var fighterSelected = false;
var user;
var computer;
var enemiesLeft;

// create generic object and prototype if you have time
var luke = {
	health: 1000,
	baseAttack: 6,
	currentAttack: 6,
	counterAttack: 12,	
	imageStart: "<figure id='luke' class='card notSelected notCurrentEnemy'><figcaption class='topCap'>Luke Skywalker</figcaption><img src='assets/images/luke.png' /><figcaption class='bottomCap'>Health: ", 
	imageEnd: "</figcaption>",
	imageHtml: function () {
		return this.imageStart + this.health + this.imageEnd;
	}
}

var boba = {
	health: 100,
	baseAttack: 6,
	currentAttack: 6,
	counterAttack: 12,
	imageStart: "<figure id='boba' class='card notSelected notCurrentEnemy'><figcaption class='topCap'>Boba Fett</figcaption><img src='assets/images/boba.jpg' /><figcaption class='bottomCap'>Health: ", 
	imageEnd: "</figcaption></figure>",
	imageHtml: function () {
		return this.imageStart + this.health + this.imageEnd;
	}
}

var maul = {
	health: 100,
	baseAttack: 6,
	currentAttack: 6,
	counterAttack: 12,
	imageStart: "<figure id='maul' class='card notSelected notCurrentEnemy'><figcaption class='topCap'>Darth Maul</figcaption><img src='assets/images/darth_maul.jpg' /><figcaption class='bottomCap'>Health: ", 
	imageEnd: "</figcaption></figure>",
	imageHtml: function () {
		return this.imageStart + this.health + this.imageEnd;
	}
}

var solo = {
	health: 100,
	baseAttack: 6,
	currentAttack: 6,
	counterAttack: 12,
	imageStart: "<figure id='solo' class='card notSelected notCurrentEnemy'><figcaption class='topCap'>Han Solo</figcaption><img src='assets/images/han_solo.jpg' /><figcaption class='bottomCap'>Health: ", 
	imageEnd: "</figcaption></figure>",
	imageHtml: function () {
		return this.imageStart + this.health + this.imageEnd;
	}
}

var playerList = {
	"luke" : luke,
	"boba" : boba,
	"maul" : maul,
	"solo" : solo
}


$(document).ready(function() {
	window.onload = function() {
		//replace w/ for loop or forEach()???
		$('.yourCharacter').prepend(luke.imageHtml());
		$('.yourCharacter').prepend(boba.imageHtml());
		$('.yourCharacter').prepend(maul.imageHtml());
		$('.yourCharacter').prepend(solo.imageHtml());

		$('.card').on("click", function() {

			if(playerSelected === false) {
				playerSelected = true;
				$(this).removeClass("notSelected notCurrentEnemy").addClass("selected");
				$('#yourChar')[0].innerHTML = "You Are Playing As:";
				$('.yourCharacter').css("justify-content","center");
				user = playerList[$(this).attr('id')];	
				enemiesLeft = 3;
			}
			$('.notSelected').prependTo($('.remainingEnemies'));
			$('.notSelected img').css('background','#FFFF66');
			$('.notSelected figcaption').css('color', 'black');
			$('.remainingEnemies').css('justify-content','center');
		});	

		$('.remainingEnemies').on('click', function(e) {	// select an enemy
			if(fighterSelected === false) {
				fighterSelected = true;
				$(e.target).parent().removeClass('notSelected').addClass('currentEnemy').prependTo('.fighter')
			}				
				$('.currentEnemy img').css('background', '#CC0000');
				$('.currentEnemy figcaption').css('color', 'white');
				$('.fighter').css('justify-content','center');
				$('#attack').css('visibility', 'visible');
				$('#message').empty();
				computer = playerList[$(e.target).parent().attr('id')];			
		});


		$('#attack').on('click', function() {
			if(playerSelected === true && fighterSelected === true) {
				//update fighter one, fighter two health
				user.health -= computer.counterAttack;
				$('.selected')[0].lastChild.innerHTML = "Health: " + user.health;	//write updated user.health to screen
				computer.health -= user.currentAttack;
				$('.currentEnemy')[0].lastChild.innerHTML = "Health: " + computer.health;	//write updated user.health to screen
				user.currentAttack += user.baseAttack;
				// console.log('user health: ' + user.health);
				// console.log('cpu health: ' + computer.health);

				if(user.health <= 0) {
					$('.selected img').css('background','red');
					$('#message').append("<h1>Game over</h1>");
					$('#reset').css('visibility', 'visible');
					$('#attack').css('visibility', 'hidden');
				} else if (computer.health <= 0) {	//remove defeated enemy
					fighterSelected = false;
					$('.currentEnemy').remove();
					$('#attack').css('visibility', 'hidden');
					$('#message').append("<h3>Choose Another Enemy To Fight");
					enemiesLeft--;
					if(enemiesLeft === 0) {
						$('#message').empty().append("<h1>You win!</h1>");
						$('#reset').css('visibility', 'visible');
						$('#attack').css('visibility', 'hidden');
					}
				}
			} else {
				alert('no enemy');
			}
		});

		$('#reset').on('click', function() {
			location.reload();
		});




	};	// window.onload()
});	// $(document).ready()







