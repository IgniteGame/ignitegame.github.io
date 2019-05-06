//roll on button click, page load and enter key
$(document).ready(function() {
	$('#rollButton').on('click', roll).click();
});
document.onkeyup = function(e) {
  let code = e.keyCode ? e.keyCode : e.which;
  if(code == 13 && ! $('#rollButton').is(':focus') ) roll(); //enter
}

//names for images and for description
const targetImgs = ['slot 1', 'slot 2', 'slot 3', 'slot 4', 'forge', 'forge'];
const damageImgs = ['small explosion', 'medium explosion', 'large explosion'];
let rolls = [];

function roll() {
	let intvl = setInterval(doRoll, 100);
	setTimeout(function() {
		clearInterval(intvl);

		doRoll();
		$('#desc').html('Hit ' + targetImgs[rolls[0] ] + ' with a ' + damageImgs[rolls[1] ] );
		$('#numRolls').html(parseInt($('#numRolls').html() )+1);
	}, 500);
}

function doRoll() {
	rolls = [getRandom(6), getRandom(3)];
	$('#targetDie').attr('src', '/assets/images/dice/' + targetImgs[rolls[0] ] + '.svg');
	$('#damageDie').attr('src', '/assets/images/dice/' + damageImgs[rolls[1] ] + '.svg');
}

function getRandom(sides) {
	return Math.floor(Math.random() * sides);
}