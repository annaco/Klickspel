<?php
?>
<html>
<head>
<link href="css/style.css" rel="stylesheet" type="text/css">
<meta http-equiv="content-type" content="text/html;charset=UTF-8">
<link href='https://fonts.googleapis.com/css?family=Nunito:400,700' rel='stylesheet' type='text/css'>
</head>
<body>
	<div id="wrapper">

<?php

	if(isset($_POST['name'])){

	$name = $_POST['name'];

	echo '<br>Välkommen ' . $name;

	}
?>	


		<div class="instruction">
			<div class="monster"><img src="../img/monster.png"></div>
			<div class= "bubble">
				<div class="intro_text">
					<h1>Nu ska vi laga pannkakor!</h1>
					
					<form id="form" name="form" method="POST" action="">
					<label>Vad heter du?</label>
						<input type="text" name="name">
						<input id="send" type="submit" name="sent" value="skicka">
					</form>
					<!--button id="start" class="start">Börja laga</button-->
				</div>
			</div>
		</div>

		<div id="timer">00:00:00</div>

		<div>
			<h3 id="recipe"></h3>
			<ul id="ingredients"></ul>
		</div>

		<div class="draggableItem banana"></div>

		<div class="draggableItem cactus"></div>

		<div class="draggableItem candy"></div>

		<div class="draggableItem carrot"></div>

		<div class="draggableItem duck"></div>

		<div class="draggableItem juice"></div>

		<div class="draggableItem ball"></div>

		<div class="draggableItem pepper"></div>

		<div id="items"></div>

		<div class="kastrull"></div>
		<div id="arrowDown"></div>
		
		<div class="star"></div>
		<div class="grattis"></div>

		<div id="result">
			<div class="name"></div>
			<div class="time"></div>
		</div>
	</div>


	<script type="text/javascript" src="jquery.js"></script>
	<script type="text/javascript" src="jquery-ui/jquery-ui.min.js"></script>
	<script type="text/javascript" src="src/js/main.js"></script>
</body>
</html>

