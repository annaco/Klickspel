var timer, points = 0, timerCount = 0, correctItems = 0;
var recipe;
var currentRecipe = 0;
var totalRecipe = 0;
var id = "";
var playersList;
var playerName;
var playerTime;
var ajax = new XMLHttpRequest();
var values = $(this).serialize();

function parseXML() {
	var xml = ajax.responseXML; // Gets the response data as XML data

	var player = xml.getElementsByTagName("player");
	var names = xml.getElementsByTagName("name");
	var ranking = "";

	for (var i = 0; i < player.length; i++) {
		if (player[i].children) {

			ranking += '<li>';
			ranking += '<img src="../img/star-green.png" alt="greenstar">' + player[i].children[0].innerHTML;
			ranking += '<span>' + player[i].children[1].innerHTML + '</span></li>';
		}
	}
	document.getElementById('ranking').innerHTML = ranking;
	document.getElementById("name").innerHTML = name;
}

$(document).ready(function() {

	$('#send').click(function(event) {
		event.preventDefault();
		startGame();
		var name = $('#name').val();
  
    	localStorage.setItem('playerName', name);
	});

	// Connects with JSON - ingredients list
	$.getJSON("../recipes.json", function(data) {
		recipe = data.recipe;
		totalRecipe = recipe.length;
		getIngredients();

		// Go directly to the game if the player wants to play the game again
		if(window.location.href.indexOf('reload=true') > -1) {
			startGame();
		} else {
			//localStorage.clear();
		}
	});
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

	// functions
	getList();
	arrowDown();
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
}

function startTimer(){
	// Starts the timer function
	timer = setInterval(countTime, 1000);
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

function dragAndDrop() {

	$('.draggableItem').draggable({
		revert: function(happyFace){

			if(!happyFace){
				var normalFace = "<img src='../img/normal.png'>";
					$('#face').html("<img src='../img/fail.png'>");
					setTimeout(function(){
						$('#face').html(normalFace);
					}, 1000);
				return true;
			}
		}
	});

	$('.kastrull').droppable({
		accept: '.ok',
		drop:function(event, ui){
			var userAnswer = ui.draggable[0].id;
			var userAnswerID = "#" + userAnswer;
			
			// Loops the recipe
			for (var i=1; i < totalRecipe; i++) {
				if(recipe[i].id == userAnswer){

					// Adds a class when the right ingredient is dropped
					$(userAnswerID).addClass("done");

					// The ingredient disappears
					ui.draggable.hide();

					// The stars appear everytime a right ingredient is dropped
					$('.star').show().animate({
					    bottom: '+=150px'
					}, 'slow', function() { 
						$(this).removeAttr('style'); 
					});

					var normalFace = "<img src='../img/normal.png'>";
					$('#face').html("<img src='../img/success.png'>");
					setTimeout(function(){
						$('#face').html(normalFace);
					}, 1000);
				}
			}

			if ($('.done').length == 4) {
				setTimeout(stopTimer);
				result();
			}
		}
	});
}

function stopTimer(){
	clearInterval(timer);
}

// The arrow pointing down into the pan 3 times and then fading out
function arrowDown() {
	for (i = 0; i < 3; i++) {
		$("#arrowDown").animate({ "top": "+=40px" }, 450).delay(150);
		$("#arrowDown").animate({ "top": "-=40px" }, 450);	
    }
    $('#arrowDown').fadeOut();

    //Starts timer and activates dragable objects
    setTimeout(startTimer, 3150);
	//setTimeout(makeDraggable, 3150);
	setTimeout(dragAndDrop, 3150);
}

function result() {
	playerName = localStorage.getItem('playerName');
	playerTime = document.getElementById('timer_text').innerHTML;

	$.ajax({
	url: "save.php",
	type: "POST",
	data: {name:playerName, time: playerTime},
	success: function(response) {
			/* Specifies the type of request */
			ajax.open("GET", "players.xml", true);

			/* Send a request to a server */
			ajax.send();
		}
	});

	ajax.onreadystatechange = function() {
		if(ajax.readyState == 4 && ajax.status == 200) {
			parseXML();
		}
	}

	$('#wrapper').hide();
	$('#result').fadeIn('slow');
	var recipeTitle = "<img src='"+recipe[0].img+"'>";
	$('.recipeImg').html(recipeTitle);


	// If the player wants to play the game again, go back to the game
	$('.playAgain').on('click', function() {
		window.location = 'index.php?reload=true';
	});
}


