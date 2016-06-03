<?php

file_put_contents('ajaxlogg.txt', print_r($_POST, true) . print_r($_GET, true));

define('HIGHSCORE_FILE', 'players.xml');



	$xml = simplexml_load_file(HIGHSCORE_FILE);
	$sxe = new SimpleXMLElement($xml->asXML());

	// @TODO: Kör escape funktion typ htmlenteties på dessa:
	$time = $_POST["time"];
	$name = $_POST["name"];

	$new_item = $sxe->addChild("player"); 

	$new_item->addChild("name", $name);
	$new_item->addChild("time", $time);




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

/* Kod för att konvrtera xml till array som ska sorteras och
början på kod till att konvertera array till xml

$json = json_encode($sxe);
$array = json_decode($json,TRUE);
$players = $array['player'];
uasort($players, "compArr");


echo "<pre>", var_dump($players), "</pre>";

echo $array['player'][2]['time'];

// Konvertera players till XML!
// Skriv det objektet till HIGHSCORE_FILE
// Skrive ÖVER filen.

$data = array('total_stud' => 500);

// creating object of SimpleXMLElement
$xml_data = new SimpleXMLElement('<?xml version="1.0"?><data></data>');

// function call to convert array to xml
array_to_xml($players,$xml_data);

//saving generated xml file; 
$result = $xml_data->asXML('/file/path/name.xml');




$xml = new SimpleXMLElement('<players/>');
array_walk_recursive($players, array ($xml, 'addChild'));
//print $xml->asXML();

var_dump($xml);*/

	$sxe->asXML(HIGHSCORE_FILE);

?>

