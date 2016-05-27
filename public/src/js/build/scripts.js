var timer, minutes, points = 0, currentSecond = 0, currentTime = 0, correctItems = 0;
$(document).ready(function() {
	var formData = $("form.login").serialize();
	console.log(formData);
	$("#start").on('click', startGame);
	$('#stop').on('click', endGame);
});
function startGame() {
	$(".instruction").addClass("close");
	//Removes the event listener from the start button
	$('#start').off('click', startGame); 

	//Removes the start button when the game is started
	$('#start').css({'display':'none'});

	//Starts the timer function
	timer = setInterval(countTime, 1000);
	$('#stop').show();
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
	$('.draggableItem').draggable({revert: 'invalid'});
}
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

