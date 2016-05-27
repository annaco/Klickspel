var timer, minutes, points = 0, currentSecond = 0, currentTime = 0, correctItems = 0;
var recipe;
var currentRecipe = 0;
var totalRecipe = 0;
var id = "";
$(document).ready(function() {
	// Connects with JSON - ingredients list
	$.getJSON("../recipes.json", function(data) {
		recipe = data.recipe;
		totalRecipe = recipe.length;
		getIngredients();
	});
	// När man klickar på "börja laga" i instruktionsrutan startar spelet
	$("#start").on('click', startGame);
});

function startGame() {
	// Instruktionsrutan försvinner och spelet startar
	$(".instruction").hide();

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
	var recipeTitle = recipe[0].rubrik;
	
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
	$('#timer').html(time);
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
			for (var i=1; i < totalRecipe; i++) {
				if((recipe[i].id == userAnswer)){
					$(userAnswerID).addClass("done");
					ui.draggable.hide();
					//console.log(userAnswerID);
					//console.log("rätt");
				}
			}

			
			if ($('.done').length == 2) {
				$('.grattis').show();
				setTimeout(endGame);
			}


			/*if (ui.draggable.is('.apple')) {
				$('.apple').hide().addClass('pannkakor');
			} else if (ui.draggable.is('.chocolate')) {
				$('.chocolate').hide().addClass('pannkakor');
			}
			if ($('.pannkakor').length == 2) {
				$('.grattis').show();
				setTimeout(endGame);
			}*/
		}
	});
}
function endGame(){
	clearInterval(timer);
}
// Pilen pekar ner i kastrullen 3 ggr
function arrowDown() {
	for (i = 0; i < 3; i++) {
		$("#arrowDown").animate({ "top": "+=40px" }, 450).delay(150);
		$("#arrowDown").animate({ "top": "-=40px" }, 450);
    }
}


/*var theContent = "";
var theTimes = "";
for (var i=0; i<totalRecipe;i++) {
	theContent += recipe[i].name + '<br>';
	theTimes += recipe[i].time + '<br>';
}
$('#nameText').html(theContent);
$('#timeText').html(theTimes);
*/


 
          


         
           


