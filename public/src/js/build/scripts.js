var timer, points = 0, timerCount = 0, correctItems = 0;
var recipe;
var currentRecipe = 0;
var totalRecipe = 0;
var id = "";

$(document).ready(function() {
	
	$('#timer').hide();
	$('#recipe_list').hide();

	$('#send').click(function(event) {
		event.preventDefault();
		//$('.reg').fadeOut();
		startGame();
	});

	// Connects with JSON - ingredients list
	$.getJSON("../recipes.json", function(data) {
		recipe = data.recipe;
		totalRecipe = recipe.length;
		getIngredients();
	});
	// När man klickar på "börja laga" i instruktionsrutan startar spelet
	//$("#start").on('click', startGame);
});

function startGame() {
	// Instruktionsrutan försvinner och spelet startar
	$(".instruction").hide();

	$('#timer').show();

	$('#recipe_list').show();

	// Removes the event listener from the start button
	$('#start').off('click', startGame);

	// Removes the start button when the game is started
	$('#start').hide();

	// Starts the timer function
	timer = setInterval(countTime, 1000);

	// functions
	arrowDown();
	getList();
}

function getList() {
	// Displays the ingredients list
	var ingredients = "";
	var recipeTitle = "<img src='"+recipe[0].img+"'>";
	
	for (var i=1; i < totalRecipe; i++) {
		ingredients += "<li class='pannkakor' id='"+recipe[i].id+"'>";
		ingredients += "<img src='"+recipe[i].img+"'>";
		ingredients += "</li>";
	}
	$('#ingredients').html(ingredients);
	$('#recipe').html(recipeTitle);
}

function getIngredients() {
	var items = "";
	for (var i=1; i < totalRecipe; i++) {
		items += "<img src='"+recipe[i].img+"' class='draggableItem ok "+recipe[i].ingr+"' id='"+recipe[i].id+"'>";
	}
	$('#items').html(items);
	makeDraggable();
	dragAndDrop();
}

function countTime() {

	timerCount++;

	var minutes = Math.floor(timerCount/60);
	var hours = Math.floor(minutes/60); // TODO: Fix that the timer works indefinitely

	if(minutes<60){
	$("#timer_text").html(padNumber(minutes) + ":" + padNumber(timerCount - (minutes * 60)));
	}else{
		$("#timer_text").html(padNumber(hours) + ":" + padNumber(minutes - (hours * 60)) + ":" + padNumber(timerCount - (minutes * 60)));
	}
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


function makeDraggable(){
	$('.draggableItem').draggable({revert: 'invalid', cursor: 'pointer'});
};

function dragAndDrop() {
	$('.kastrull').droppable({
		accept: '.ok',
		drop:function(event, ui){
			var userAnswer = ui.draggable[0].id;
			var userAnswerID = "#" + userAnswer;
			// Loops the recipe
			for (var i=1; i < totalRecipe; i++) {
				if((recipe[i].id == userAnswer)){

					// Adds a class when the right ingredient is dropped
					$(userAnswerID).addClass("done");

					// The ingredient disappears
					ui.draggable.hide();

					// The stars appear everytime a right ingredient is dropped
					$('.star').show().animate({
					    bottom: 250
					}, 'slow', function() { 
						$(this).removeAttr('style'); 
					});
				}
			}
			if ($('.done').length == 4) {
				setTimeout(endTimer);
				ranking();
			}
		}
	});
}
function endTimer(){
	clearInterval(timer);
}
// Pilen pekar ner i kastrullen 3 ggr och tonar sedan ut
function arrowDown() {
	for (i = 0; i < 3; i++) {
		$("#arrowDown").animate({ "top": "+=40px" }, 450).delay(150);
		$("#arrowDown").animate({ "top": "-=40px" }, 450);	
    }
    $('#arrowDown').animate({"opacity": "0"}, 1000);
}
function ranking() {
	$('#wrapper').hide();
	$('#ranking').fadeIn('slow');
	var recipeTitle = "<img src='"+recipe[0].img+"'>";
	$('.recipeImg').html(recipeTitle);
}

