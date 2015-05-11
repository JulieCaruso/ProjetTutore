<?php

function obtenir_options_fichiers()
{
	$scanned_directory = array_diff(scandir("xml"), array('..', '.'));
	foreach ($scanned_directory as $key => $value) {
		echo "<option value=\"".$value."\">".$value."</option>";
	}
}

?>


<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>Contrôle Aérien</title>
		<link rel="stylesheet" media="screen" href="./css/styles.css" type="text/css" />
		<script src="./js/jquery.js"></script>
		
		
	</head>
	<body>
		<div id="titre">Choisissez votre fichier de jeu :</div>
		<form action="index_with_starter.php" method="post">
			
			<select name="xml_name" id="xml_name">
				<?php obtenir_options_fichiers(); ?>
		  </select>
			
			 <input type="submit">

		</form>
		
		<footer></footer>
	</body>
</html>
