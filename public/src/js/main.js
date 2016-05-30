var timer, minutes, points = 0, currentSecond = 0, currentTime = 0, correctItems = 0;
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

		// Gå directly to the game if the player wants to play the game again
		if(window.location.href.indexOf('reload=true') > -1) {
			startGame();
		}
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
	// Displays the recipe list
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
	// Gets the ingredients and displays them
	var items = "";

	for (var i=1; i < totalRecipe; i++) {
		items += "<img src='"+recipe[i].img+"' class='draggableItem ok "+recipe[i].ingr+"' id='"+recipe[i].id+"'>";
	}
	$('#items').html(items);

	// functions
	makeDraggable();
	dragAndDrop();
}

function countTime() {
	currentTime++; 
	var time = "";

	//If less than one minute has passed show seconds else start counting minutes
	if(currentTime < 60){
		if(currentTime < 10){
			time = "00:0" + currentTime;
		}else{
			time = "00:" + currentTime;
		}
	}else{	
		minutes = Math.floor(currentTime/60);	
		var seconds = Number(currentTime-60);
		if(seconds < 10){
			time = "0" + minutes + ":0" + seconds;
		}else{
			time = "0" + minutes + ":" + seconds;
		}
	}
	$('#timer_text').html(time);
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
				result();
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

function result() {
	$('#wrapper').hide();
	$('#result').fadeIn('slow');
	var recipeTitle = "<img src='"+recipe[0].img+"'>";
	$('.recipeImg').html(recipeTitle);

	// If the player wants to play the game again, go back to the game
	$('.playAgain').on('click', function() {
		window.location = 'index.php?reload=true';
	});
}

