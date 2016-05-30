<?php
?>
<html>
<head>
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
			<h3 id="recipe"></h3>
			<ul id="ingredients"></ul>
		</div>

		<img src="img/banana.png" class="draggableItem banana">

		<img src="img/cactus.png" class="draggableItem cactus">

		<img src="img/candy.png" class="draggableItem candy">

		<img src="img/carrot.png" class="draggableItem carrot">

		<img src="img/duck.png" class="draggableItem duck">

		<img src="img/juice.png" class="draggableItem juice">

		<img src="img/ball.png" class="draggableItem ball">

		<img src="img/pepper.png" class="draggableItem pepper">

		<div id="items"></div>

		<div class="kastrull"></div>
		<img src="img/arrowDown.png" id="arrowDown">
		
		<img src="img/stars2.png" class="star">
		<img src="img/grattis.gif" class="grattis">

		<div id="result">
			<div class="name"></div>
			<div class="time"></div>
		</div>
	</div>


	<script type="text/javascript" src="jquery.js"></script>
	<script type="text/javascript" src="jquery-ui/jquery-ui.min.js"></script>
	<script src="jquery-ui-touch-punch/jquery.ui.touch-punch.min.js"></script>
	<script type="text/javascript" src="src/js/main.js"></script>

</body>
</html>

