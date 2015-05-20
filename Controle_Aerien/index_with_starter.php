<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>Contrôle Aérien</title>
		<link rel="stylesheet" media="screen" href="./css/styles.css" type="text/css" />
		<script src="./js/jquery.js"></script>
        <script src="./js/xmlToJavascript.js"></script>
		<script src="./js/calculation.js"></script>
		<script src="./js/Objets/ordre.js"></script>
		<script src="./js/Objets/avion.js"></script>
		<script src="./js/Objets/niveau.js"></script>
		<script src="./js/Objets/interface.js"></script>
        <script src="./js/score.js"></script>
		<script src="./js/Objets/zone.js"></script>
        <script src="./js/tests.js"></script>
		<script src="./js/loadPerformances.js"></script>
		<script src="./js/panneauAvion.js"></script>
		<script src="./js/panneauCible.js"></script>
		<script src="./js/jeu.js"></script>
		
	</head>
	<body>
		<div id="titre"></div>
		
		<div id="accueil">
			<div id="titreAccueil"></div>
			<div id="texte"></div>
			<div id="image"></div>
			<div id="boutonJeu"></div>
		</div>
		
		<div id="jeu">
			<div id="id_jeu_XML"><?php echo (isset($_POST["xml_name"]) ? $_POST["xml_name"] : ""); ?></div>
			<div id="consigne"></div>
            <div id="animation"></div>
            <div id="panneaux">
                <div id="panneauLateral"></div>
                <div id="panneauCible"></div>
            </div>
			<div id="zoneOrdres"></div>
            <div id="temps"></div>
            <div id="score"></div>
			<div id="boutonQuitter"></div>
            <div id="boutonPause"></div>
		</div>
		
		<div id="bilan">
			<div id="recap"></div>
            <div id="detail">
                <div id="nbmanips"></div>
                <div id="nbavionZoneFin"></div>
                <div id="nbairprox"></div>
            </div>
            <div id="bilan_ordres">
                <div id="titre_liste_ordres"></div>
                <p id="liste_ordres"></p>
            </div>
			<div id="boutonAccueil"></div>
            <div id="boutonNiveauSuivant"></div>
			<div id="boutonRejouer"></div>
		</div>
		
		<footer></footer>
	</body>
</html>

