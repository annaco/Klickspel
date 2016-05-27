<<<<<<< HEAD
$(document).ready(function() {
	init();
	dragAndDrop();
});

function init(){
	$('.apple, .orange').draggable({ revert: 'invalid'});
}

function dragAndDrop() {
	$('.kastrull').droppable({
		accept: '.apple',
		drop:function(event, ui){
			if (ui.draggable.is('.apple')) {
				$('.grattis').show();
				$('.apple').hide();
			} else {
                ui.draggable.draggable('option','revert',true);
			}
		}
	});
}
=======
var timer, minutes, points = 0, currentSecond = 0, currentTime = 0, correctItems = 0;
$(document).ready(function() {
	$('#result').submit

	// När man klickar på "börja laga" i instruktionsrutan startar spelet
	$("#start").on('click', startGame);
	// The timer stops when the stop button is clicked
	$('#stop').on('click', endGame);
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
	// The stop button appears
	$('#stop').show();

	// functions
	makeDraggable();
	dragAndDrop();
	arrowDown();
}
function countTime() {
	currentTime++; 
	var time = "";

	//If less than one minute has passed show seconds else start counting minutes
	if(currentTime < 60){
		if(currentTime < 10){
			time = "00:0" + currentTime;
		}else{
			time = "00." + currentTime;
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
		accept: '.apple, .chocolate',
		drop:function(event, ui){
			if (ui.draggable.is('.apple')) {
				$('.apple').hide().addClass('ok');
			} else if (ui.draggable.is('.chocolate')) {
				$('.chocolate').hide().addClass('ok');
			}
			if ($('.ok').length == 2) {
				$('.grattis').show();
				setTimeout(endGame);
			}
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



 
          


         
           


>>>>>>> 249b72247c8a5d97564ff7848dafab7323640754
