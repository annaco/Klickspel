$(document).ready(function() {
	// När man klickar på "börja laga" i instruktionsrutan startar spelet
	$("#start").on('click', startGame);
});

// Instruktionsrutan försvinner och spelet startar
function startGame() {
	$(".instruction").addClass("close");
	init();
	dragAndDrop();
	arrowDown();
}

function init(){
	$('.apple, .orange').draggable({ 
		revert: 'invalid',
		cursor: 'pointer',
	});
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

// Pilen pekar ner i kastrullen 3 ggr
function arrowDown() {
	for (i = 0; i < 3; i++) {
		$("#arrowDown").animate({ "top": "+=40px" }, 450).delay(150);
		$("#arrowDown").animate({ "top": "-=40px" }, 450);
    }
}



 
          


         
           


