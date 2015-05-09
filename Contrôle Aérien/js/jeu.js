// VARIABLES GLOBALES

// Correspond à l'échelle des distances sur le canva (ratio réalité/simulation)
var scale = -1;

// Correspond à l'intervalle de rafraichissement du jeu
var inter = -1;

var selectedPlane = -1 ;

// Correspond aux dimensions du canvas
var canvasWidth = "579";
var canvasHeight = "436";

// FIN VARIABLES GLOBALES

$(function () {
	init0();
});

function init0() {
	begin = setInterval(chgt, 100);
}

// PROBLEME ECHELLE

function chgt(){
	if (Niveau.getChargementDonnees() == 0) {
		clearInterval(begin);

		// TEST ALEX
		/*
		var compteur = 0;
		Avion.getListeAvions()[0].setHTarget((Avion.getListeAvions()[0].getH()+310)%360);
		while(Avion.getListeAvions()[0].getHTarget() != Avion.getListeAvions()[0].getH()){
		console.debug("*********************************** CALCUL DE L'INCREMENT DE CAP ***********************************");
		calculateHead(Avion.getListeAvions()[0],1);
		compteur++;
	}
	console.debug("Nombre de secondes nécessaires pour atteindre le cap = "+compteur+" secondes");*/
	/*
	var compteur = 0;
	Avion.getListeAvions()[0].setVTarget(Avion.getListeAvions()[0].getV()-80);
	while(Avion.getListeAvions()[0].getVTarget() != Avion.getListeAvions()[0].getV()){
	console.debug("*********************************** CALCUL DE L'INCREMENT DE VITESSE ***********************************");
	calculateSpeed(Avion.getListeAvions()[0]);
	compteur++;
}
console.debug("Nombre de secondes nécessaires pour atteindre le cap = "+compteur+" secondes");


//PARTIE POUR JULIE R
/*var changements = [];
changements.push(Ordre.Changement.INCREASE_ALTITUDE);
changements.push(Ordre.Changement.INCREASE_SPEED);
changements.push(Ordre.Changement.CHANGE_HEAD_BETTER_WAY);
Avion.getListeAvions()[0].setHTarget((Avion.getListeAvions()[0].getH()-120)%360+1);
var ordre = new Ordre(Avion.getListeAvions()[0],changements);
var changements2 = [];
changements2.push(Ordre.Changement.DECREASE_SPEED);
changements2.push(Ordre.Changement.CHANGE_HEAD_BY_LEFT);
Avion.getListeAvions()[1].setHTarget((Avion.getListeAvions()[1].getH()-40)%360+1);
var ordre2 = new Ordre(Avion.getListeAvions()[1],changements2);
// FIN TEST*/
init();
}
}

function init(){
	// On récupère les informations contenues dans le fichier XML
	scale = Niveau.getListeNiveaux()[0].getInitInterface().getScale();

	// STRUCTURE
	// contenus initiaux de l'écran d'accueil
	$('#titreAccueil').html("conflit GAI MTL / JAMBI MTL - Level/Niveau 1");
	$('#texte').html(Niveau.getListeNiveaux()[0].getInitInterface().getTexts().getTabTextIntro()["FR"]);
	$('#image').html("<img src='images/jeu.png' id=\"wallpaper_game\">");
	$('#boutonJeu').html("<input type=\"submit\" value=\"Commencer le jeu !\">");
	$('footer').html("Copyright INSA Toulouse 2015 - Version 1");

	// contenu initial de l'écran de jeu
	$('#animation').html("<canvas id=\"dessin\" width=\""+canvasWidth+"\" height=\""+canvasHeight+"\">Texte pour les navigateurs qui ne supportent pas canvas</canvas>");
	initPanneauLateral();
	initPanneauCible();
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
    $('#choixNiveau').html("Veuillez sélectionner un niveau : <select name=\"selectCap\" id=\"selectNiveau\"></select>");
    var selectNiveau = document.getElementById('selectNiveau');
    for (var i = 0; i < Niveau.getNombreNiveaux(); i++) {
        var Element = document.createElement('option');
        Element.value = i;
        // si le cap est le cap courant, alors cette valeur est selectionnee par defaut
        if (i == 0) {
            Element.selected = "selected";
        }
        Element.textContent = parseInt(i);
        selectNiveau.appendChild(Element);
    }
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
	tempsLimite = 600;
	tempsNiveauLimite = 200;
	//init target initial sur le premier target point
	for (var a=0; a < listeNiveaux[niveauCourant].getListOfAvions().length; a++){
		updateHeadToTargetPoint(listeNiveaux[niveauCourant].getListOfAvions()[a]);
	}

	// GESTIONNAIRES
	// gestionnaire du bouton #boutonJeu
	$('#boutonJeu').click(function() {
        niveauCourant = document.getElementById('selectNiveau').value;
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
	// Réglage de la vitesse du jeu
	
	// On fixe l'évènement
	$("#vitesse_jeu").change(traitementVitesseJeu);
	
	// On récupère la valeur par défaut
	

	//INITIALISATION DE LA VITESSE DE JEU - PARTIE A DECOMMENTER DES QUE LE DEVELOPPEMENT EST FINI

	var curseur_vitesse = parseInt($("#vitesse_jeu").val());
	var rafraichissement_ms = getSpeedWithCursor(curseur_vitesse);
	inter = setInterval(regles, rafraichissement_ms);
	// LANCEMENT
	afficheAccueil();

}

function dessinerImage() {
	monCanvas = document.getElementById('dessin');
	if (monCanvas.getContext){
		ctx = monCanvas.getContext('2d');
		var img = new Image();   // Crée un nouvel objet Image
		img.src = 'images/jeu.png'; // Définit le chemin vers sa source
		ctx.drawImage(img, 0, 0);
	}
	else {
		alert('canvas non supporté par ce navigateur');
	}
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
			avion = listeNiveaux[niveauCourant].getListOfAvions()[a];
			if (avion.getIndexCurrentTarget() >= avion.getListOfTargetPoints().length){
				// end of game?
				// afficheBilan();
			}
			else {
                var listTP = avion.getListOfTargetPoints();
                
				// test airproc pour toutes les combinaisons d'avions
				if (a < listeNiveaux[niveauCourant].getListOfAvions().length - 1){
					for (var b=a+1; b < listeNiveaux[niveauCourant].getListOfAvions().length; b++){
						testAirProX(avion, listeNiveaux[niveauCourant].getListOfAvions()[b]);
					}
				}

				// test airproc limite écran
				testAirProXLim(avion);

                // test avec les targets si le'avion suit ses target points
                if (avion.getSuivreTarget() == 1) {
				    testTargetP(avion, listTP[avion.getIndexCurrentTarget()]);
                }

				dessineAvion(avion);
				

				for (var t = 0; t < listTP.length; t++) {
					
					dessinA(listTP[t].getX()*scale, listTP[t].getY()*scale, 5, "green")
					// On ajoute le nom du target point
                    ctx.font = "10px Arial";
					ctx.fillText(listTP[t].getLabel(), (listTP[t].getX()*scale+10), (listTP[t].getY()+20)*scale);
				}
			}
		}
		
		if (selectedPlane != -1) {
			dessinerChemin(selectedPlane);
			var a = listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane];
			a.setColor("orange");
		}
	}
}

function dessineAvion(a){
	if (tempsNiveau == 2) {
		a.setX1(a.getX());
		a.setY1(a.getY());
	}
	else if (tempsNiveau == 3) {
		a.setX2(a.getX1());
		a.setY2(a.getY1());
		a.setX1(a.getX());
		a.setY1(a.getY());
	}
	else if (tempsNiveau == 4) {
		a.setX3(a.getX2());
		a.setY3(a.getY2());
		a.setX2(a.getX1());
		a.setY2(a.getY1());
		a.setX1(a.getX());
		a.setY1(a.getY());
	}
	else if (tempsNiveau > 4) {
		a.setX4(a.getX3());
		a.setY4(a.getY3());
		a.setX3(a.getX2());
		a.setY3(a.getY2());
		a.setX2(a.getX1());
		a.setY2(a.getY1());
		a.setX1(a.getX());
		a.setY1(a.getY());
	}

	// console.debug("h courant : "+a.getH()+", h target : "+a.getHTarget()+", current target : "+a.getIndexCurrentTarget());
    
    /* DEPLACEMENT DE L AVION
    PRIORITE :
    1. ALTITUDE 
    2. VITESSE
    */
    if (a.getZ() != a.getZTarget()) {
            calculateAltitude(a);
    }
    else if (a.getV() != a.getVTarget()) {
            calculateSpeed(a);
    }
    updateHeadToTargetPoint(a);
	if (a.getH() != a.getHTarget()){
		var sensVirage = -1;
		if(document.getElementById('virageC').checked){
			sensVirage = calculateBetterWayToReachTargetHead(a);
		} else if (document.getElementById('virageD').checked) {
			sensVirage = 1;
		}
		else {
			sensVirage = 0;
		}
		calculateHead(a, sensVirage);
	}
    // calcul paramètres de l'avion puis on modifie les coordonnées dans l'avion
    setCoordinates(a,calculateXY(a));

	// dessin avions et positions précédentes
	dessinA(a.getX()*scale, a.getY()*scale, 5, a.getColor());
	dessinA(a.getX1()*scale, a.getY1()*scale, 2.5, "#FFAD5C");
	dessinA(a.getX2()*scale, a.getY2()*scale, 2, "#FFCE9D");
	dessinA(a.getX3()*scale, a.getY3()*scale, 1.5, "#FFCE9D");
	dessinA(a.getX4()*scale, a.getY4()*scale, 1, "#FFCE9D");
    
	// On ajoute le nom de l'avion
	ctx.fillText(a.getNameOfPlane()+" - "+a.getTypeOfPlane()+" - "+a.getH()+"°", (a.getX()*scale+5), (a.getY()*scale-5));
	ctx.fillText(a.getV()+" noeuds - "+a.getZ()+" pieds", (a.getX()*scale+5), (a.getY()*scale-15));
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
	var avionSelected = 0;
	var targetSelected = 0;
	for (var a=0; a < listeNiveaux[niveauCourant].getListOfAvions().length; a++){
		var avion = listeNiveaux[niveauCourant].getListOfAvions()[a];


		var R = 5;
		if(Math.abs(listeNiveaux[niveauCourant].getListOfAvions()[a].getX()*scale-xSourisCanvas) < R
			&& Math.abs(listeNiveaux[niveauCourant].getListOfAvions()[a].getY()*scale-ySourisCanvas) < R){

			selectedPlane = a;
            reinitialisationPanneau();
			updatePanneauLateral();
			avionSelected = 1;
			avion.setColor("orange");
		}
		else
		{
			avion.setColor("blue");	
		}

		for (var t = 0; t < avion.getListOfTargetPoints().length; t++){
			if(Math.abs(avion.getListOfTargetPoints()[t].getX()/5-xSourisCanvas) < R
			&& Math.abs(avion.getListOfTargetPoints()[t].getY()/5-ySourisCanvas) < R){
				// on lui passe l'objet target?
				selectedTarget = avion.getListOfTargetPoints()[t];
				targetSelected = 1;
				updatePanneauCible();
			}
		}
	}
	if (avionSelected == 0) {
		// aucun avion selectionné -> clear du panneau
		reinitialisationPanneau();
		selectedPlane = -1;
	}
	if (targetSelected == 0) {
		// aucun avion selectionné -> clear du panneau
		reinitialisationPanneauCible();
		selectedTarget = -1;
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
            listeNiveaux[lv].getListOfAvions()[idA].setX3(listeNiveaux[lv].getListOfAvions()[idA].getXInitial());
			listeNiveaux[lv].getListOfAvions()[idA].setY3(listeNiveaux[lv].getListOfAvions()[idA].getYInitial());
            listeNiveaux[lv].getListOfAvions()[idA].setX4(listeNiveaux[lv].getListOfAvions()[idA].getXInitial());
			listeNiveaux[lv].getListOfAvions()[idA].setY4(listeNiveaux[lv].getListOfAvions()[idA].getYInitial());
            listeNiveaux[lv].getListOfAvions()[idA].setIndexCurrentTarget(0);
            listeNiveaux[lv].getListOfAvions()[idA].setSuivreTarget(1);
            listeNiveaux[lv].getListOfAvions()[idA].setColor("blue");
		}
	}
	// réinitialisation du panneau lateral
	selectedPlane = -1;
	reinitialisationPanneau();
	reinitialisationPanneauCible();
}

function dessinerChemin (avion) {
    a = listeNiveaux[niveauCourant].getListOfAvions()[avion];
    
    if (a.getSuivreTarget() == 1) {
        // on suit une target
        i = a.getIndexCurrentTarget();
        indiceMax = parseInt(a.getListOfTargetPoints().length);
        for (indice = i ; indice<a.getListOfTargetPoints().length;indice++) {
            if (indice == i) {
                dessinerTrait(a.getX(),a.getY(),a.getListOfTargetPoints()[i].getX(),a.getListOfTargetPoints()[i].getY());
            }
            else if (indice != (indiceMax)) {
                dessinerTrait(a.getListOfTargetPoints()[indice-1].getX(),a.getListOfTargetPoints()[indice-1].getY(),a.getListOfTargetPoints()[indice].getX(),a.getListOfTargetPoints()[indice].getY());
            }
        }
    }
    else {
        // On trace une ligne en fonction du cap
		
		var p, c, head, X_bord1, Y_bord1, X_bord2, Y_bord2;
		
		// Calcul des prochaines coordonnées de l'avion (sans les modifier !)
		var nextCoordinates = calculateXY(a);
		
		// On détermine alors la droite (liée au cap) du type y = p * x + c
		// Si p est infini, c'est qu'il n'y a pas d'intersection entre les deux droites
		if (nextCoordinates["X"]*scale-a.getX()*scale !== 0)
		{
			p = (nextCoordinates["Y"]*scale-a.getY()*scale)/(parseFloat(nextCoordinates["X"]*scale-a.getX()*scale));
		}
		else
		{
			p = Math.POSITIVE_INFINITY;	
		}
		
		c = a.getY()*scale - p * a.getX()*scale;
		
		// On trouve alors la bonne orientation en fonction du cap
		head = a.getH();
		
		if (head < 90)
		{
			// Intersection avec Y_bord1 = 0
			Y_bord1 = 0;
			X_bord1 = - c / parseFloat(p);
			
			
			// Si p n'est pas infini
			if (p !== Math.POSITIVE_INFINITY)
			{
				// Intersection avec X_bord2 = canvasWidth
				X_bord2 = canvasWidth;
				Y_bord2 = p * X_bord2 + c;
			}
			else
			{
				// Sinon on prend le bord1 déjà calculé (la 1ère solution sera satisfaite)
				X_bord2 = a.getX()*scale;
				Y_bord2 = Y_bord1;
			}
			
		}
		else if (head < 180)
		{
			// Intersection avec Y_bord1 = canvasHeight
			Y_bord1 = canvasHeight;
			X_bord1 = (Y_bord1 - c) / parseFloat(p);
			
			// Intersection avec X_bord2 = canvasWidth
			X_bord2 = canvasWidth;
			Y_bord2 = p * X_bord2 + c;
		}
		else if (head < 270)
		{
			// Intersection avec Y_bord1 = canvasHeight
			Y_bord1 = canvasHeight;
			X_bord1 = (Y_bord1 - c) / parseFloat(p);
			
			// Si p n'est pas infini
			if (p !== Math.POSITIVE_INFINITY)
			{
				// Intersection avec X_bord2 = 0
				X_bord2 = 0;
				Y_bord2 = c;
			}
			else
			{
				// Sinon on prend le bord1 déjà calculé (la 1ère solution sera satisfaite)
				X_bord2 = X_bord1;
				Y_bord2 = Y_bord1;
			}
		}
		else if (head = 360)
		{
			// Intersection avec Y_bord1 = 0
			Y_bord1 = 0;
			X_bord1 = - c / parseFloat(p);
			
			// Intersection avec X_bord2 = 0
			X_bord2 = 0;
			Y_bord2 = c;
		}
		else
		{
			alert("ERREUR, le cap dépasse 360 ° !");	
		}
		
		// On trace le trait
		
		
		if (X_bord1 > 0 && X_bord1 <= canvasWidth && Y_bord1 > 0 && Y_bord1 <= canvasHeight)
		{
			
			 ctx.save();
			ctx.beginPath();
			ctx.strokeStyle='yellow';
			ctx.lineWidth=2; 
			ctx.moveTo(a.getX()*scale,a.getY()*scale);
			ctx.lineTo(X_bord1,Y_bord1);
			ctx.stroke(); 
			ctx.restore();
		}
		else
		{
			 ctx.save();
			ctx.beginPath();
			ctx.strokeStyle='yellow';
			ctx.lineWidth=2; 
			ctx.moveTo(a.getX()*scale,a.getY()*scale);
			ctx.lineTo(X_bord2,Y_bord2);
			ctx.stroke(); 
			ctx.restore();
		}
    }    
}

function dessinerTrait (X1,Y1,X2,Y2) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle='yellow';
    ctx.lineWidth=2; 
    ctx.moveTo(X1*scale,Y1*scale);
    ctx.lineTo(X2*scale,Y2*scale);
    ctx.stroke(); 
    ctx.restore();
}
