<?php
?>
<html>
<body>
<span id="timer">00:00</span>


<div class="reg">
	<p>Skriv ditt namn i rutan</p>
	<form id="form" name="form" method="POST" action="">
		<input type="text" name="name">
		<input type="submit" name="sent" value="skicka">
	</form>
</div>
</body>
</html>






<?php
echo "Hitta ingredienserna";

if(isset($_POST['sent'])){
	echo 'Välkommen' + $_POST['name'];
}

/*formulär där man skriver sitt namn
kontroll att det är unikt

koppla en klocka till namnet 
starta tidtagning

visa sluttid 

jämför med övriga tider
lägg till i highscore listan om tiden är bland de 10 bästa*/

?>