<?php
?>
<!DOCTYPE html>
<html>
<head>
	<title>Klickspel</title>
	<link href="css/style.css" rel="stylesheet" type="text/css">
	<meta http-equiv="content-type" content="text/html;charset=UTF-8">
</head>
<body>
	<div id="wrapper">

		<div class="reg">
			<h1>Välkommen till Kockspelet</h1>
			<p>Skriv ditt namn i rutan:</p>
			<form id="form" name="form" method="POST" action="">
				<input type="text" name="name">
				<input id="send" type="submit" name="sent" value="skicka">
			</form>
		</div>

<?php

	if(isset($_POST['name'])){

	$name = $_POST['name'];

	echo '<br>Välkommen ' . $name;

	}
?>	


		<div class="instruction">
			<p class="intro_text">Lorem ipsum dolor sit amet, maecenas felis donec pede pellentesque quam libero, consequat mauris, ullamcorper ullamcorper non, dolor odio orci, aut donec viverra. Mollicras hendrerit id erat duis. Ullamcorper ullamcorper non.</p>
			<button id="start" class="start">Börja laga</button>
		</div>

		<div id="timer">00:00:00</div>

		<div>
			<div id="recipe"></div>
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

	</div>

	<div id="ranking">
		<div class="recipeImg"></div>
		<div class="name"></div>
		<div class="time"></div>
	</div>


	<script type="text/javascript" src="jquery.js"></script>
	<script type="text/javascript" src="jquery-ui/jquery-ui.min.js"></script>
	<script type="text/javascript" src="src/js/main.js"></script>
</body>
</html>

