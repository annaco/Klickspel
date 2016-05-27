// MER LÄSNING OM KOMMENTARER, denna rad behöver alltså inte finnas med i en fil: http://usejsdoc.org/about-getting-started.html

var recipe;
var currentRecipe = 0;
var totalRecipe = 0;
var timer;
var started = false;
var timerCount = 0;

/**
* When the DOM is completely loaded, init the game.
**/
$(document).ready(function() {
	init();
});

/**
* This function is run when the document is loaded. Sets everything up.
**/
function init() {

	$.getJSON("questions.json", function(data) {
		recipe = data.recipe;

		totalRecipe = recipe.length;

		setupGame();

	});
}

/**
* This function sets up the game. It is also used to restart the game, i.e. reset variables.
**/
function setupGame() {
	$("#startQuiz").on('click', nextQuestion);
	$(".pannkakor").on('click', checkAnswer);
}

/**
* Displays the next question.
**/
function nextQuestion() {

	// Check if timer should be started
	if(!started) {
		started = true;
		timer = setInterval(timerTick, 1000);
	}
	
	$("#recipe").html(recipe[0].rubrik);
	$("#ingr1").html(recipe[1].ingr1);
	$("#ingr2").html(recipe[2].ingr2);
	$("#ingr3").html(recipe[3].ingr3);
	$("#ingr4").html(recipe[4].ingr4);
	$("#ingr5").html(recipe[5].ingr5);

}

/**
* Check if the selected pannkakor is correct.
* @param {event} e - The element that was clicked on
**/
function checkAnswer(e) {

	// Extract id number to compare selected pannkakor with the
	// correct pannkakor
	var userAnswer = e.currentTarget.id.replace("ingr", "");
	var userAnswerID = "#" + e.currentTarget.id;

	console.log(e.currentTarget.id);
	console.log(recipe[1].id);
	console.log(totalRecipe);

	if((recipe[1].id == userAnswer) || (recipe[2].id == userAnswer) || (recipe[3].id == userAnswer) 
		|| (recipe[4].id == userAnswer) || (recipe[5].id == userAnswer)){
		$(userAnswerID).addClass("done");
		console.log(userAnswerID);
		console.log("rätt");
	
	} else {
		console.log("fel");
	}


	

	if() {
		nextQuestion();
	} else {
		gameOver()
	}
}

/**
* Game over, stop timer, clear inputs.
**/
function gameOver() {
	clearInterval(timer);

	$(".pannkakor").html("");
	$("#recipe").html("Grattis!");

	// TODO: Display end screen
}

/**
* Updates the timer every second.
**/
function timerTick() {
	timerCount++;

	var minutes = Math.floor(timerCount/60);
	//var hours = Math.floor(minutes/60); // TODO: Fix that the timer works indefinitely

	$("#timer").html(padNumber(minutes) + ":" + padNumber(timerCount - (minutes * 60)));
}

/**
* Pad a number with a zero if it's less than 10
* @param {number} num - Input number to check if it's less than 10
**/
function padNumber(num) {
	if(num < 10) {
		return "0"+num;
	} else {
		return num;
	}
}