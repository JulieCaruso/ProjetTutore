$(function() {
	init();	
});

function init(){
	
	// STRUCTURE
	// contenus initiaux de l'écran d'accueil
	$('#titre').html("conflit GAI MTL / JAMBI MTL - Level/Niveau 1");
	$('#texte').html("Le but de ces exercices est de développer la capacité d'orientation des élèves par rapport aux cap magnétiques dans \
	les différentes zones de conflit du secteur. Chaque exercice présente une série de conflits sur une même zone mais avec des positions \
	respectives des avions différentes. <br\> \
	Le but est de respecter le minimum de 5Nm latéral et de ne pas s'approcher des limites secteurs à moins de 3Nm.");
	$('#image').html("<img src='images/jeu.png'>");
	$('#boutonJeu').html("<input type=\"submit\" value=\"Commencer le jeu !\">");
	$('footer').html("Copyright INSA Toulouse 2015 - Version 1");
	
	// contenu initial de l'écran de jeu
	$('#animation').html("<canvas id=\"dessin\" width=\"450\" height=\"300\">Texte pour les navigateurs qui ne supportent pas canvas</canvas>");
	$('#boutonQuitter').html("<input type=\"submit\" value=\"Quitter\">");
	monCanvas = document.getElementById('dessin');
	if (monCanvas.getContext){
		ctx = monCanvas.getContext('2d');
	} else {
		alert('canvas non supporté par ce navigateur');
	}	

	// contenu initial de l'écran de bilan
	$('#boutonRejouer').html("<input type=\"submit\" value=\"Rejouer\">");
	$('#boutonAccueil').html("<input type=\"submit\" value=\"Accueil\">");
		
	// DONNEES
	// liste des avions
	// construire la liste a partir du xml
	listeAvions = [];
	listeAvions[0] = new Avion(10, 10, 5, 5, 6, 7, true, "AZ", "ola", 5, "fsbjk", null);
	
	// VARIABLES
	tempsJeu = 0;
	niveauCourant = 0;
	ecranCourant = null;
	tempsLimite = 60;

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
// constructeurs: a voir ou les mettre en fonction de la fonction xml-> var js
function Avion(xIni, yIni, vIni, zIni, hIni, rateIni, controllable, planeType, planeName, zTarget, typeDansEtiquette, listTargets) {
	this.xIni = xIni;
	this.yIni = yIni;
	this.vIni = vIni;
	this.zIni = zIni;
	this.hIni = hIni;
	this.rateIni = rateIni;
	this.controllable = controllable;
	this.planeType = planeType;
	this.planeName = planeName;
	this.zTarget = zTarget;
	this.typeDansEtiquette = typeDansEtiquette;
	this.listTargets = listTargets;
}
function TargetPoint(x, y, label) {
	this.x = x;
	this.y = y;
	this.label = label;
}
function animer() {
	if(tempsJeu/10 > tempsLimite){
			afficheBilan();
	} else {
		tempsJeu++;		
		// effaçage
		ctx.clearRect(0,0, monCanvas.width,monCanvas.height);
		for (var j=0; j<listeAvions.length; j++){
			dessineAvion(j);
		}			
	}			
}
function dessineAvion(idA){
	// paramètres de l'avion
	var v = listeAvions[idA].vIni;
	var R = 5;
	var x = listeAvions[idA].xIni + v*1;
	var y = listeAvions[idA].yIni + v*1;
	listeAvions[idA].xIni = x;
	listeAvions[idA].yIni = y;
	// sauvegarde de l'état du contexte
	ctx.save();
	// dessin
	ctx.translate(x,y);
   	ctx.beginPath();
   	ctx.arc(0, 0, R, 0, 2 * Math.PI, false);
   	ctx.fillStyle = "#046380";
   	ctx.fill();
   	ctx.lineWidth = 1;
    ctx.strokeStyle = '#000';
  	ctx.stroke();
  	// retour à l'état précédent du contexte
	ctx.restore()
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
	var xSourisDocument = e.pageX 
    var ySourisDocument = e.pageY;
	// position du canvas / document
	var xCanvas = monCanvas.offsetLeft;
	var yCanvas = monCanvas.offsetTop;
	// position du clic / canvas
	xSourisCanvas = xSourisDocument - xCanvas;
	ySourisCanvas = ySourisDocument - yCanvas;
	// test si une balle est cliquée
	for (var c=0; c<listeAvions.length; c++){
		var R = 5;
		if(Math.abs(listeAvions[c].xIni-xSourisCanvas) < R
			&& Math.abs(listeAvions[c].yIni-ySourisCanvas) < R){
		}
	}
}
function reinitialisation(){
	niveauCourant = 0;
	// test
	listeAvions[0] = new Avion(10, 10, 5, 5, 6, 7, true, "AZ", "ola", 5, "fsbjk", null);
	// init avions recup xml initial
}

