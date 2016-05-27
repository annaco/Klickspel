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