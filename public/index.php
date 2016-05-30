<?php
?>
<!DOCTYPE html>
<html>
<head>
<title>Klickspel</title>
<link href="css/style.css" rel="stylesheet" type="text/css">
<meta http-equiv="content-type" content="text/html;charset=UTF-8">
<link href='https://fonts.googleapis.com/css?family=Nunito:400,700' rel='stylesheet' type='text/css'>
</head>
<body>
	<div id="wrapper">


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
					<?php 
						if(isset($_POST['name'])){
							$name = $_POST['name'];
						}
					?>
				</div>
			</div>
		</div>

		<div id="timer"><p id="timer_text">00:00</p></div>

		<div id="recipe_list">
			<div id="recipe"></div>
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

	</div>

	<div id="result">
		<div class="recipeImg"></div>
		<div class="nameAndTime">
			<div id="name"></div>
			<div id="time"></div>
		</div>
		<p>Snabbaste spelarna</p>
		<ul class="ranking"></ul>
		<div class="playAgain">
			<img src="img/button.png" alt="playagain">
			<p>Spela igen</p>
		</div>
	</div>
	<?php
		$playersList[] = $_POST['data'];

		$inp = file_get_contents('players.json');
		$tempArray = json_decode($inp);
		array_push($tempArray, $data);
		$jsonData = json_encode($tempArray);
		file_put_contents('players.json', $jsonData);
	?>


	<script type="text/javascript" src="jquery.js"></script>
	<script type="text/javascript" src="jquery-ui/jquery-ui.min.js"></script>
	<script src="jquery-ui-touch-punch/jquery.ui.touch-punch.min.js"></script>
	<script type="text/javascript" src="src/js/main.js"></script>

</body>
</html>

