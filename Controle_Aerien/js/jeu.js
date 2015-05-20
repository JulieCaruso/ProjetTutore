// VARIABLES GLOBALES

// Correspond à l'échelle des distances sur le canva (ratio réalité/simulation)
var scale = -1;

// Correspond à l'intervalle de rafraichissement du jeu
var inter = -1;

// Correspond à l'indice de l'avion selectionné
var selectedPlane = -1 ;

// Correspond aux dimensions du canvas
var canvasWidth = "579";
var canvasHeight = "436";

// Correspond au niveau actuel
var niveauCourant = 0;

var pause = 0;

// FIN VARIABLES GLOBALES

$(function () {
	init0();
	$("#id_jeu_XML").hide();
});

function init0() {
	begin = setInterval(chgt, 100);
}

function chgt(){
	if (Niveau.getChargementDonnees() == 0) {
		clearInterval(begin);
        init();
    }
}

function init(){
	// STRUCTURE
	// contenus initiaux de l'écran d'accueil
	$('#titreAccueil').html("Level/"+Niveau.getListeNiveaux()[niveauCourant].getTitle());
	$('#texte').html(Niveau.getListeNiveaux()[niveauCourant].getInitInterface().getTexts().getTabTextIntro()["FR"]);
	$('#image').html("<img src='images/jeu.png' id=\"wallpaper_game\">");
	$('#boutonJeu').html("<input type=\"submit\" value=\"Commencer le jeu !\">");
	$('footer').html("Copyright INSA Toulouse 2015 - Version 1");

	// contenu initial de l'écran de jeu
	$('#animation').html("<canvas id=\"dessin\" width=\""+canvasWidth+"\" height=\""+canvasHeight+"\">Texte pour les navigateurs qui \
                            ne supportent pas canvas</canvas>");
	initPanneauLateral();
	initPanneauCible();
	$('#boutonQuitter').html("<input type=\"submit\" value=\"Quitter\">");
    $('#boutonPause').html("<input id=\"leBoutonPause\" type=\"submit\" value=\"Pause\">");
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
    $('#boutonNiveauSuivant').html("<input type=\"submit\" value=\"Niveau suivant\">");

	// DONNEES
	listeNiveaux  = Niveau.getListeNiveaux();

	// VARIABLES
	tempsJeu = 0;
	tempsNiveau = 0;
	ecranCourant = null;
	tempsLimite = 600;
	tempsNiveauLimite = 200;
    score = new Score(400,0,0,0);
    scale = Niveau.getListeNiveaux()[niveauCourant].getInitInterface().getScale();
    
	//init target initial sur le premier targetPoint ou sur rien
	for (var a=0; a < listeNiveaux[niveauCourant].getListOfAvions().length; a++){
        if (listeNiveaux[niveauCourant].getListOfAvions()[a].getListOfTargetPoints().length > 0){
            updateHeadToTargetPoint(listeNiveaux[niveauCourant].getListOfAvions()[a]);
        }
	} 

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
    // gestionnaire du bouton #boutonPause
	$('#boutonPause').click(function() {
		if (pause == 0) {
//      *****************************************      
//            
//            
//            NOTHING WORKS HERE
//            
//            
//            
//       ****************************************     
            document.getElementById('leBoutonPause').value = "Play";
            clearInterval(inter);
            pause = 1;
        }
        else if (pause == 1) {
            document.getElementById('leBoutonPause').value = "Pause";
            var curseur_vitesse = parseInt($("#vitesse_jeu").val());
            var rafraichissement_ms = getSpeedWithCursor(curseur_vitesse);
            inter = setInterval(regles, rafraichissement_ms);
            pause = 0;
        }
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
    $('#boutonNiveauSuivant').click(function() {
        
        // On incrémente le niveau
		 var length = Niveau.getListeNiveaux().length;

        if (niveauCourant <= length-1)
        {
            // On incrémente le niveau actuel
            niveauCourant++;   
            reinitialisationPanneau();
            reinitialisationPanneauCible();
            afficheAccueil();
            init();
        }
        else
        {  
            alert("Plus de niveau disponible");
        }
	});

	// REGLES
	// Réglage de la vitesse du jeu (dynamique)
	// On fixe l'évènement
	$("#vitesse_jeu").change(traitementVitesseJeu);
	// On récupère la valeur par défaut
	var curseur_vitesse = parseInt($("#vitesse_jeu").val());
	var rafraichissement_ms = getSpeedWithCursor(curseur_vitesse);
	inter = setInterval(regles, rafraichissement_ms);
    
	// LANCEMENT
	afficheAccueil();
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
        var tps = tempsJeu;
        var heures = Math.floor(tps / 3600);
        var minutes = Math.floor((tps % 3600) / 60);
        var secondes = (tps % 3600) % 60;
		$('#temps').html("Temps écoulé : "+heures+":"+minutes+":"+secondes);
		animer();
        afficher_score();
	}
}

function afficher_score() {
    $('#score').html("Score : "+score.getValue());
}
function afficheBilan(){
	ecranCourant = "bilan";
	// affichage de l'écran et masquage des autres écrans
	$('#accueil').hide();
	$('#jeu').hide();
	$('#bilan').show();
	$('#recap').html("Votre score est de "+score.getValue()+" ! ");
    $('#nbmanips').html("Nombre d'ordres envoyés : "+score.getNumberActions());
    $('#nbavionZoneFin').html("Nombre d'avions ayant atteint leur zone de fin de jeu : "+score.getNumberPlanesEndZone());
    $('#nbairprox').html("Nombre d'airprox détectés : "+score.getNumberAirprox());
}

function animer() {
	
    var niveau = Niveau.getListeNiveaux()[niveauCourant];
   
	if((tempsJeu > tempsLimite) || (niveauCourant > Niveau.getNombreNiveaux()-1)){
		generateBilan();
	}
	else if (tempsNiveau > tempsNiveauLimite || niveau.getNbAvionsFinis() == niveau.getListOfAvions().length){
		generateBilan();
		tempsNiveau = 0;
	}
	else {
		tempsJeu++;
		tempsNiveau++;
		// effaçage
		ctx.clearRect(0,0, monCanvas.width,monCanvas.height);
		dessinerImage();
        
        // On trace les zones de turbulences
		var listOfZones = listeNiveaux[niveauCourant].getListOfZones();
        for (var i in listOfZones) {
			if (listOfZones[i].getNature() === "alteration") {
                var zone = listOfZones[i].getListOfPoints_Cercle()[0];
                dessinZoneAlteration(zone.getX()*scale,zone.getY()*scale,zone.getRadius(), "lightblue");
			}
		} 
        
        // On trace les endGameTargets
        dessinEndGameTargets();
        
		for (var a=0; a < listeNiveaux[niveauCourant].getListOfAvions().length; a++){
			avion = listeNiveaux[niveauCourant].getListOfAvions()[a];
            var listTP = avion.getListOfTargetPoints();
                 
            // test airproc pour toutes les combinaisons d'avions
            if (a < listeNiveaux[niveauCourant].getListOfAvions().length - 1){
                for (var b=a+1; b < listeNiveaux[niveauCourant].getListOfAvions().length; b++){
                    testAirProX(avion, listeNiveaux[niveauCourant].getListOfAvions()[b]);
                }
            }   
            
            // test airproc limite écran
            testAirProXLim(avion);
            
            // test end zone pour cet avion
            testEndZone(avion);
            
            // test avec les targets seulement si l'avion suit ses target points
            if (avion.getSuivreTarget() == 1) {
                if (avion.getIndexCurrentTarget() < avion.getListOfTargetPoints().length){
                    testTargetP(avion, listTP[avion.getIndexCurrentTarget()]);
                }
            }
            
            // dessin target points + noms 	si l'avion n'a pas atteint sa end zone
            if (avion.getEnd() == 0) {
                for (var t = 0; t < listTP.length; t++) {		
                    dessinA(listTP[t].getX()*scale, listTP[t].getY()*scale, 5, "green")
                    ctx.font = "10px Arial";
                    ctx.fillText(listTP[t].getLabel(), (listTP[t].getX()*scale+10), (listTP[t].getY()+20)*scale);
                }
                dessineAvion(avion);
            }            
        }
    }
    if (selectedPlane != -1) {
        dessinerChemin(selectedPlane);
        var a = listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane];
        a.setColor("orange");
    }
}

function dessineAvion(a){
	
	var listOfZones;
	
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

    if (a.getZ() != a.getZTarget()) {
            calculateAltitude(a);
    }
    else if (a.getV() != a.getVTarget()) {
            calculateSpeed(a);
    }
    
    // si suivre targets
    if (avion.getSuivreTarget() == 1) {
        // si l'avion a atteint sa derniere target, il continue sur son dernier cap
        if (avion.getIndexCurrentTarget() < avion.getListOfTargetPoints().length){
            updateHeadToTargetPoint(a);
        }
    }
    
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
	
    // Calcul des paramètres de l'avion puis on modifie les coordonnées dans l'avion
    setCoordinates(a,calculateXY(a));
	
	// On vérifie si l'on se trouve dans une zone d'altération
	listOfZones = listeNiveaux[niveauCourant].getListOfZones();	
	for (var i in listOfZones) {
		if (listOfZones[i].getNature() === "alteration") {
			var zone = listOfZones[i].getListOfPoints_Cercle()[0];
			testAlterationZone(avion, zone);				
		}
	}
    
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

// Permet de dessiner un cercle
function dessinA(x, y, R, couleur){
	ctx.save();
	ctx.translate(x, y);
	ctx.beginPath();
	ctx.arc(0, 0, R, 0, 2 * Math.PI, false);
	ctx.fillStyle = couleur;
	ctx.fill();
	ctx.restore();
}

// Permet de dessiner l'image de fond
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

// Permet de dessiner une zone d'altération
function dessinZoneAlteration(x, y, R, couleur){
	ctx.save();
	ctx.translate(x, y);
	ctx.beginPath();
	ctx.globalAlpha = 0.30;
	ctx.arc(0, 0, R, 0, 2 * Math.PI, false);
	ctx.fillStyle = couleur;
	ctx.fill();
	ctx.restore();
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
    // pour chaque avion, on regarde s'il a été selectionné puis traitement
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
            animer();
		}
		else {
			avion.setColor("blue");	
		}
        // pour chaque target point, on regarde s'il a été selectionné puis traitement
		for (var t = 0; t < avion.getListOfTargetPoints().length; t++){
			if(Math.abs(avion.getListOfTargetPoints()[t].getX()*scale-xSourisCanvas) < R
			&& Math.abs(avion.getListOfTargetPoints()[t].getY()*scale-ySourisCanvas) < R){
				// on lui passe l'objet target?
				selectedTarget = avion.getListOfTargetPoints()[t];
				targetSelected = 1;
				updatePanneauCible();
			}
		}
	}
    // aucun avion selectionné -> clear du panneau
	if (avionSelected == 0) {
		reinitialisationPanneau();
		selectedPlane = -1;
	}
    // aucun target selectionné -> clear du panneau
	if (targetSelected == 0) {
		reinitialisationPanneauCible();
		selectedTarget = -1;
	}
}

function dessinerChemin (avion) {
    a = listeNiveaux[niveauCourant].getListOfAvions()[avion];
    // si on suit une target
    if (a.getSuivreTarget() == 1) {
        i = a.getIndexCurrentTarget();
        indiceMax = parseInt(a.getListOfTargetPoints().length);
        for (indice = i ; indice<a.getListOfTargetPoints().length;indice++) {
            if (indice == i) {
                dessinerTrait(a.getX(),a.getY(),a.getListOfTargetPoints()[i].getX(),a.getListOfTargetPoints()[i].getY(), 'yellow');
            }
            else if (indice != (indiceMax)) {
                dessinerTrait(a.getListOfTargetPoints()[indice-1].getX(), a.getListOfTargetPoints()[indice-1].getY(), a.getListOfTargetPoints()[indice].getX(), a.getListOfTargetPoints()[indice].getY(), 'yellow');
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
		if (nextCoordinates["X"]*scale-a.getX()*scale !== 0) {
			p = (nextCoordinates["Y"]*scale-a.getY()*scale)/(parseFloat(nextCoordinates["X"]*scale-a.getX()*scale));
		}
		else {
			p = Math.POSITIVE_INFINITY;	
		}
		
		c = a.getY()*scale - p * a.getX()*scale;
		
		// On trouve alors la bonne orientation en fonction du cap
		head = a.getH();
		
		if (head < 90) {
			// Intersection avec Y_bord1 = 0
			Y_bord1 = 0;
			X_bord1 = - c / parseFloat(p);
			
			
			// Si p n'est pas infini
			if (p !== Math.POSITIVE_INFINITY) {
				// Intersection avec X_bord2 = canvasWidth
				X_bord2 = canvasWidth;
				Y_bord2 = p * X_bord2 + c;
			}
            // Sinon on prend le bord1 déjà calculé (la 1ère solution sera satisfaite)
			else {
				X_bord2 = a.getX()*scale;
				Y_bord2 = Y_bord1;
			}	
		}
		else if (head < 180) {
			// Intersection avec Y_bord1 = canvasHeight
			Y_bord1 = canvasHeight;
			X_bord1 = (Y_bord1 - c) / parseFloat(p);
            
			// Intersection avec X_bord2 = canvasWidth
			X_bord2 = canvasWidth;
			Y_bord2 = p * X_bord2 + c;
		}
		else if (head < 270) {
			// Intersection avec Y_bord1 = canvasHeight
			Y_bord1 = canvasHeight;
			X_bord1 = (Y_bord1 - c) / parseFloat(p);
			
			// Si p n'est pas infini
			if (p !== Math.POSITIVE_INFINITY) {
				// Intersection avec X_bord2 = 0
				X_bord2 = 0;
				Y_bord2 = c;
			}
            // Sinon on prend le bord1 déjà calculé (la 1ère solution sera satisfaite)
			else {
				X_bord2 = X_bord1;
				Y_bord2 = Y_bord1;
			}
		}
		else if (head = 360) {
			// Intersection avec Y_bord1 = 0
			Y_bord1 = 0;
			X_bord1 = - c / parseFloat(p);
			
			// Intersection avec X_bord2 = 0
			X_bord2 = 0;
			Y_bord2 = c;
		}
		else {
			alert("ERREUR, le cap dépasse 360 ° !");	
		}
		
		// On trace le trait
		if (X_bord1 > 0 && X_bord1 <= canvasWidth && Y_bord1 > 0 && Y_bord1 <= canvasHeight) {
            dessinerTrait(a.getX(), a.getY(), X_bord1/scale, Y_bord1/scale, 'yellow');
		}
		else {
            dessinerTrait(a.getX(), a.getY(), X_bord2/scale, Y_bord2/scale, 'yellow');
		}
    }    
}

function dessinerTrait (X1,Y1,X2,Y2, color) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle=color;
    ctx.lineWidth=2; 
    ctx.moveTo(X1*scale,Y1*scale);
    ctx.lineTo(X2*scale,Y2*scale);
    ctx.stroke(); 
    ctx.restore();
}

// Trace tous les endGameTargets avec le nom de l'avion concerné
function dessinEndGameTargets () {
    var listEndZones = Niveau.getListeNiveaux()[niveauCourant].getListOfZones();
    for (var i = 0; i < listEndZones.length; i++) {
        if (listEndZones[i].getNature() == "endGameTarget") {
            var listOfPoints = listEndZones[i].getListOfPoints_Cercle();
            var X1 = listOfPoints[0].getX();
            var Y1 = listOfPoints[0].getY();
            var X2 = listOfPoints[1].getX();
            var Y2 = listOfPoints[1].getY();;
            dessinerTrait(X1, Y1, X2, Y2, 'green');
            // On ajoute le nom de l'avion
            ctx.font = "10px Arial";
            ctx.fillText(listEndZones[i].getConcernedPlanes(), (X1*scale+3), (Y1*scale-5));
        }
    }
}

function reinitialisation(){
	niveauCourant = 0;
	tempsJeu = 0;
    pause = 0;
    tempsNiveau = 0;
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
            listeNiveaux[lv].getListOfAvions()[idA].setEnd(0);
            listeNiveaux[lv].getListOfAvions()[idA].setColor("blue");
            listeNiveaux[lv].setNbAvionsFinis(0);
		}
	}
	// réinitialisation des panneaux lateraux
	selectedPlane = -1;
	reinitialisationPanneau();
	reinitialisationPanneauCible();
    ctx.clearRect(0,0, monCanvas.width,monCanvas.height);
}
    
// Fonction permettant de synthétiser les données pour le bilan
function generateBilan(){
    
     // On affiche les éléments pour le bilan
    afficheBilan();
    
    $("#titre_liste_ordres").html("<strong>Bilan des ordres envoyés :</strong>");
    
    var liste_ordres = Ordre.getListeOrdresTotale();
    
    var bilan_ordres = "";
    
    // S'il y a des ordres, on les affiche
    if (liste_ordres != undefined)
    {
        for(var i = liste_ordres.length - 1; i >= 0; i--)
        {
               bilan_ordres += i + " : " +liste_ordres[i].getMessage() + "</br>";
        }
    }
    
    $("#liste_ordres").html(bilan_ordres);
	
	// On vide l'ensemble des ordres
	Ordre.flush();
    
}

