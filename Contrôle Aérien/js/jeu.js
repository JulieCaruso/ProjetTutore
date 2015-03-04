$(function() {
	init0();	
});

function init0(){
	begin = setInterval(chgt, 100);
}

// faire test Target !!!


function chgt(){
	if (Niveau.getChargementDonnees() == 0){
		clearInterval(begin);

		// TEST ALEX
		/*
		var compteur = 0;
		Avion.getListeAvions()[0].setHTarget((Avion.getListeAvions()[0].getH()+120)%360);
		while(Avion.getListeAvions()[0].getHTarget() != Avion.getListeAvions()[0].getH()){
			console.debug("*********************************** CALCUL DE L'INCREMENT DE CAP ***********************************");
			calculateHead(Avion.getListeAvions()[0],1);
			compteur++;
		}
		console.debug("Nombre de secondes nécessaires pour atteindre le cap = "+compteur+" secondes");
		
		// FIN TEST*/
		var ordre = new Ordre(Avion.getListeAvions()[0],"IS");
		init();
	}
}

function init(){
	
	// STRUCTURE
	// contenus initiaux de l'écran d'accueil
	$('#titreAccueil').html("conflit GAI MTL / JAMBI MTL - Level/Niveau 1");
	$('#texte').html("Le but de ces exercices est de développer la capacité d'orientation des élèves par rapport aux cap magnétiques dans \
	les différentes zones de conflit du secteur. Chaque exercice présente une série de conflits sur une même zone mais avec des positions \
	respectives des avions différentes. <br\> \
	Le but est de respecter le minimum de 5Nm latéral et de ne pas s'approcher des limites secteurs à moins de 3Nm.");
	$('#image').html("<img src='images/jeu.png'>");
	$('#boutonJeu').html("<input type=\"submit\" value=\"Commencer le jeu !\">");
	$('footer').html("Copyright INSA Toulouse 2015 - Version 1");
	
	// contenu initial de l'écran de jeu
	$('#animation').html("<canvas id=\"dessin\" width=\"579\" height=\"436\">Texte pour les navigateurs qui ne supportent pas canvas</canvas>");
	initPanneauLateral();
	$('#boutonQuitter').html("<input type=\"submit\" value=\"Quitter\">");
	monCanvas = document.getElementById('dessin');
	if (monCanvas.getContext){
		ctx = monCanvas.getContext('2d');
		dessinerImage();
	} else {
		alert('canvas non supporté par ce navigateur');
	}	

	// contenu initial de l'écran de bilan
	$('#boutonRejouer').html("<input type=\"submit\" value=\"Rejouer\">");
	$('#boutonAccueil').html("<input type=\"submit\" value=\"Accueil\">");
		
	// DONNEES
	// liste des avions
	// construire la liste a partir du xml
	listeNiveaux  = Niveau.getListeNiveaux();
	
	// VARIABLES
	tempsJeu = 0;
	tempsNiveau = 0;
	niveauCourant = 0;
	ecranCourant = null;
	tempsLimite = 60;
	tempsNiveauLimite = 20;

	// GESTIONNAIRES
	// gestionnaire du bouton #boutonJeu
	$('#boutonJeu').click(function() {
		afficheJeu();
	});
	// interactivité sur le canvas
	monCanvas.addEventListener("click", clicCanvas, false);	
	// gestionnaire du bouton #boutonJeu
	$('#boutonQuitter').click(function() {
		reinitialisation();
		afficheAccueil();
	});
	// gestionnaires
	$('#boutonRejouer').click(function() {
		reinitialisation();
		afficheJeu();
	});
	$('#boutonAccueil').click(function() {
		reinitialisation();
		afficheAccueil();
	});		
	
	// REGLES
	inter = setInterval(regles, 100);	
	
	// LANCEMENT
	afficheAccueil();
	
}

function dessinerImage() {
    monCanvas = document.getElementById('dessin');
	if (monCanvas.getContext){
		ctx = monCanvas.getContext('2d');
		var img = new Image();   // Crée un nouvel objet Image
        img.src = 'Images/jeu.png'; // Définit le chemin vers sa source
        ctx.drawImage(img, 0, 0);
        }
    else {
		alert('canvas non supporté par ce navigateur');
	}	
}

function initPanneauLateral() {
    $('#panneauLateral').html("<table border= \"1\"><tr><td><form action=\"post\"><table><tr><td>Nom<span id=\"nomAvion\"/></td></tr> \
    <tr><td>Vitesse<span id=\"vitesseAvion\"/></td></tr><tr><td>Altitude : <br/><span class=\"marge\">Actuelle : \
    <span id=\"currentAltitude\"/></span><br/><span class=\"marge\">Nouvelle altitude :<select name=\"selectAltitude\" \
    id=\"selectAlt\"></select></span></td></tr><tr><td>Cible :<br/><span class=\"marge\">Actuelle : <span id=\"currentTarget\"/> \
    </span><br/><span class=\"marge\">Nouvelle cible :<select name=\"selectTarget\" id=\"selectTarget\"></select></span></td></tr><tr> \
    <td>Cap :<br/><span class=\"marge\">Actuel :<span id=\"currentCap\"/></span><br/><span class=\"marge\">Nouveau cap :   <select name=\"selectCap\" \
    id=\"selectCap\"></select><br/><input type=\"checkbox\" name=\"virageCourt\" value=\"0\"/>Virage le plus court <input type=\"checkbox\" name=\"virageDroite\" \
    value=\"1\"/>Virage droite<input type=\"checkbox\" name=\"virageGauche\" value=\"2\"/>Virage gauche<br/></span></td></tr><tr><td><input type=\"button\" \
    name=\"bSend\" value=\"Envoyer\"onclick=\"sendData\"/></td></tr></table><table><tr><td>Vitesse du jeu<div id=\"vitesseJeu\"/><input type=\"range\" min=\"1\"\
    max=\"10\" step=\"1\"/></td></tr></table></form></td></tr></table>");
}


function updatePanneauLateral(a) {
	updatePanneauLateralNom(a);
	updatePanneauLateralVitesse(a);
	updatePanneauLateralAltitudeCourante(a);
	fillPanneauLateralAltitudesPossibles(a);
	updatePanneauLateralCapCourant(a);
	fillPanneauLateralCapPossibles(a);
	//$('#nomAvion').html(nomAvion+"-"+typeAvion);
}

function updatePanneauLateralNom(a) {
	var spanNomAvion = document.getElementById('nomAvion');
	var nomAvion = listeNiveaux[niveauCourant].getListOfAvions()[a].nameOfPlane ;
	var typeAvion = listeNiveaux[niveauCourant].getListOfAvions()[a].typeOfPlane ;
	spanNomAvion.textContent = "  "+nomAvion+"-"+typeAvion;
}

function updatePanneauLateralVitesse(a) {
	var spanVitesseAvion = document.getElementById('vitesseAvion');
	var vitesseAvion = listeNiveaux[niveauCourant].getListOfAvions()[a].getV() ;
	spanVitesseAvion.textContent = "  "+vitesseAvion+" noeuds";
}

function updatePanneauLateralAltitudeCourante(a) {
	var spanAltitudeCouranteAvion = document.getElementById('currentAltitude');
	var AltitudeCouranteAvion = listeNiveaux[niveauCourant].getListOfAvions()[a].getZ() ;
	spanAltitudeCouranteAvion.textContent = "  "+AltitudeCouranteAvion+" pieds";
}

function fillPanneauLateralAltitudesPossibles(a) {
	var selectElement = document.getElementById('selectAlt');
	var perfos = Avion.getPerformancesPerType()[listeNiveaux[niveauCourant].getListOfAvions()[a].typeOfPlane];
	for(var i in perfos["performances"])
	{
		var Element = document.createElement('option');
		Element.value = i;
		// si l'altitude est l'altitude courante, alors cette valeur est selectionnee par defaut
		if (i == listeNiveaux[niveauCourant].getListOfAvions()[a].getZ()) {
			Element.selected = "selected" ;
		}
		Element.textContent = parseInt(i);
		selectElement.appendChild(Element);
	}
}

function fillPanneauLateralCapPossibles(a) {
	var selectElement = document.getElementById('selectCap');
	for(var i=1; i<361;i++)
	{
		var Element = document.createElement('option');
		Element.value = i;
		// si l'altitude est l'altitude courante, alors cette valeur est selectionnee par defaut
		if (i == listeNiveaux[niveauCourant].getListOfAvions()[a].getH()) {
			Element.selected = "selected" ;
		}
		Element.textContent = parseInt(i);
		selectElement.appendChild(Element);
	}
}

function updatePanneauLateralCapCourant(a) {
	var spanCurrentCapAvion = document.getElementById('currentCap');
	var CurrentCapAvion = listeNiveaux[niveauCourant].getListOfAvions()[a].getH() ;
	spanCurrentCapAvion.textContent = "  "+CurrentCapAvion;
}

function afficheAccueil(){
	ecranCourant = "accueil";
	// affichage de l'écran et masquage des autres écrans
	$('#accueil').show();
	$('#jeu').hide();
	$('#bilan').hide();	
}
function afficheJeu(){
	ecranCourant = "jeu";
	// affichage de l'écran et masquage des autres écrans
	$('#accueil').hide();
	$('#jeu').show();
	$('#bilan').hide();
	// affichage de la consigne du premier niveau de l'animation
	afficheConsigne(niveauCourant);
}
function afficheConsigne(ni){
	var cons = "";
	$('#consigne').html(cons);
}
function regles(){
	if (ecranCourant == "jeu"){
		$('#temps').html(tempsJeu/10);
		animer();
	}	
}
function animer() {
	if((tempsJeu/10 > tempsLimite) || (niveauCourant > Niveau.getNombreNiveaux()-1)){
		afficheBilan();
	}
	else if (tempsNiveau/10 > tempsNiveauLimite){
		niveauCourant++;
		tempsNiveau = 0;
	}
	else {
		tempsJeu++;
		tempsNiveau++;
		// effaçage
		ctx.clearRect(0,0, monCanvas.width,monCanvas.height);
		dessinerImage();
		for (var a=0; a < listeNiveaux[niveauCourant].getListOfAvions().length; a++){
			dessineAvion(listeNiveaux[niveauCourant].getListOfAvions()[a]);
		}			
	}			
}
function dessineAvion(a){
	if (tempsNiveau == 2) {
		a.setX1(x);
		a.setY1(y);
	}
	else if (tempsNiveau == 3) {
		a.setX2(a.getX1());
		a.setY2(a.getY1());
		a.setX1(x);
		a.setY1(y);
	}
	else if (tempsNiveau == 4) {
		a.setX3(a.getX2());
		a.setY3(a.getY2());
		a.setX2(a.getX1());
		a.setY2(a.getY1());
		a.setX1(x);
		a.setY1(y);
	}
	else if (tempsNiveau > 4) {
		a.setX4(a.getX3());
		a.setY4(a.getX3());
		a.setX3(a.getX2());
		a.setY3(a.getY2());
		a.setX2(a.getX1());
		a.setY2(a.getY1());
		a.setX1(x);
		a.setY1(y);
	}
	if (a.getH() != a.getHTarget()){
		// sensVirage a changer plus tard en fonction du panneau a droite
		calculateHead(a, 0);
	}
	else {
	// paramètres de l'avion
		var v = a.getV();
		var x = a.getX() + v*1;
		var y = a.getY() + v*1;
		a.setX(x);
		a.setY(y);
	}
	// sauvegarde de l'état du contexte
	dessinA(a.getX()/500, a.getY()/500, 5, "#FF9900");
	dessinA(a.getX1()/500, a.getY1()/500, 2.5, "#FFAD5C");
	dessinA(a.getX2()/500, a.getY2()/500, 2, "#FFCE9D");
	dessinA(a.getX3()/500, a.getY3()/500, 1.5, "#FFCE9D");
	dessinA(a.getX4()/500, a.getY4()/500, 1, "#FFCE9D");
}
function dessinA(x, y, R, couleur){
	// sauvegarde de l'état du contexte
	ctx.save();
	ctx.translate(x, y);
	ctx.beginPath();
   	ctx.arc(0, 0, R, 0, 2 * Math.PI, false);
   	ctx.fillStyle = couleur;
   	ctx.fill();
	// restore le contexte
	ctx.restore();	
}
function afficheBilan(){
	ecranCourant = "bilan";
	// affichage de l'écran et masquage des autres écrans
	$('#accueil').hide();
	$('#jeu').hide();
	$('#bilan').show();
	$('#recap').html("Votre score est de ");		
}
function clicCanvas(e){
	// position de la souris / document
	var xSourisDocument = e.pageX; 
    var ySourisDocument = e.pageY;
	// position du canvas / document
	var xCanvas = monCanvas.offsetLeft;
	var yCanvas = monCanvas.offsetTop;
	// position du clic / canvas
	xSourisCanvas = xSourisDocument - xCanvas;
	ySourisCanvas = ySourisDocument - yCanvas;
	// test si un avion est cliqué
	for (var a=0; a < listeNiveaux[niveauCourant].getListOfAvions().length; a++){
	// TODO
		var R = 100000;
		if(Math.abs(listeNiveaux[niveauCourant].getListOfAvions()[a].getX()-xSourisCanvas) < R
			&& Math.abs(listeNiveaux[niveauCourant].getListOfAvions()[a].getY()-ySourisCanvas) < R){
			updatePanneauLateral(a);
		}
	}
}
function reinitialisation(){
	niveauCourant = 0;
	tempsJeu = 0;
	for (lv = 0; lv < Niveau.getNombreNiveaux(); lv++) {
		for (idA = 0; idA < listeNiveaux[lv].getListOfAvions().length; idA++){
			listeNiveaux[lv].getListOfAvions()[idA].setX(listeNiveaux[lv].getListOfAvions()[idA].getXInitial());
			listeNiveaux[lv].getListOfAvions()[idA].setY(listeNiveaux[lv].getListOfAvions()[idA].getYInitial());
			listeNiveaux[lv].getListOfAvions()[idA].setV(listeNiveaux[lv].getListOfAvions()[idA].getVInitial());
			listeNiveaux[lv].getListOfAvions()[idA].setZ(listeNiveaux[lv].getListOfAvions()[idA].getZInitial());
			listeNiveaux[lv].getListOfAvions()[idA].setH(listeNiveaux[lv].getListOfAvions()[idA].getHInitial());
			listeNiveaux[lv].getListOfAvions()[idA].setX1(listeNiveaux[lv].getListOfAvions()[idA].getXInitial());
			listeNiveaux[lv].getListOfAvions()[idA].setY1(listeNiveaux[lv].getListOfAvions()[idA].getYInitial());
			listeNiveaux[lv].getListOfAvions()[idA].setX2(listeNiveaux[lv].getListOfAvions()[idA].getXInitial());
			listeNiveaux[lv].getListOfAvions()[idA].setY2(listeNiveaux[lv].getListOfAvions()[idA].getYInitial());
		}
	}
}

