$(document).ready(function() {
	// När man klickar på "börja laga" i instruktionsrutan startar spelet
	$("#start").on('click', startGame);
});

// Instruktionsrutan försvinner och spelet startar
function startGame() {
	$(".instruction").addClass("close");
	init();
	dragAndDrop();
}

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
