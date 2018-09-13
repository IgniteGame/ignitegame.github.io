$(document).ready(function() {
	$('#rollButton').on('click', doRoll).click();
});

const targetImgs = ['target1', 'target2', 'target3', 'target4', 'target forge', 'target forge'];
const damageImgs = ['small flame', 'med flame', 'large flame'];

function doRoll() {
	$('#targetDie').attr('src', 'assets/dice/' + targetImgs[getRandom(6)] + '.svg');
	$('#damageDie').attr('src', 'assets/dice/' + damageImgs[getRandom(3)] + '.svg');
}

function getRandom(sides) {
	return Math.floor(Math.random() * sides);
}