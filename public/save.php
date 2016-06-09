<?php

file_put_contents('ajaxlogg.txt', print_r($_POST, true) . print_r($_GET, true));

define('HIGHSCORE_FILE', 'players.xml');

// Open high score file for sorting
$xml = simplexml_load_file(HIGHSCORE_FILE);
$sxe = new SimpleXMLElement($xml->asXML());

// Get current player end time and current player name
$time = htmlentities($_POST["time"]);
$name = htmlentities($_POST["name"]);

// Encode XML file to array
$json = json_encode($sxe);
$array = json_decode($json,TRUE);
$players = $array['player'];

// Add current player to array, med array_push
array_push($players, array("name" => $name, "time" => $time));

// Sort array based on time
uasort($players, "compArr");

function compArr($a, $b) {
	$a = $a['time'];
	$b = $b['time'];

	if ($a > $b) {
		return 1;
	} else if ($a < $b) {
		return -1;
	} else {
		return 0;
	}
}


echo "<pre>", var_dump($players), "</pre>";

$xml2 = new SimpleXMLElement('<?xml version="1.0" ?><players/>');

$counter = 1; // counter to track max 10 entries


foreach($players as $player) {

	// for each player add a new node to xml file
	$playerNode = $xml2->addChild("player");

	if(is_string($player["name"])) {
		$playerNode->addChild("name", $player["name"]);
		$playerNode->addChild("time", $player["time"]);

	}

	$counter++; // count up to 10


	if($counter > 10) {
		// if more than 10, exit the loop
		// no need to save more than 10 highscores
		continue;
	}
}

$xml2->asXML('players2.xml'); // save new file

//var_dump($xml);
$sxe->asXML(HIGHSCORE_FILE);


?>

