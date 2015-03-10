
function initPanneauLateral() {
    $('#panneauLateral').html("<table border= \"1\"><tr><td><table><tr><td>Nom<span id=\"nomAvion\"/></td></tr> \
    <tr><td>Vitesse : <br/><span class=\"marge\">Actuelle : <span id=\"vitesseAvion\"/></span><br/><span class=\"marge\">Nouvelle vitesse :<select name=\"selectVitesse\" \
    id=\"selectVitesse\"></select></span></td></tr><tr><td>Altitude : <br/><span class=\"marge\">Actuelle : \
    <span id=\"currentAltitude\"/></span><br/><span class=\"marge\">Nouvelle altitude :<select name=\"selectAltitude\" \
    id=\"selectAlt\"></select></span></td></tr><tr><td>Cible :<br/><span class=\"marge\">Actuelle : <span id=\"currentTarget\"/> \
    </span><br/><span class=\"marge\">Nouvelle cible :<select name=\"selectTarget\" id=\"selectTarget\"></select></span></td></tr><tr> \
    <td>Cap :<br/><span class=\"marge\">Actuel :<span id=\"currentCap\"/></span><br/><span class=\"marge\">Nouveau cap :   <select name=\"selectCap\" \
    id=\"selectCap\"></select><br/><input type=\"radio\" id=\"virageC\" name=\"virage\" checked=\"checked\" value=\"0\"/>Virage le plus court <input type=\"radio\" name=\"virage\" \
    id=\"virageD\" value=\"1\"/>Virage droite<input type=\"radio\" name=\"virage\" id=\"virageG\" value=\"2\"/>Virage gauche<br/></span></td></tr><tr><td><input id=\"bSend\" type=\"submit\" value=\"Envoyer\"/> \
    </td></tr></table><table><tr><td>Vitesse du jeu<div id=\"vitesseJeu\"/><input type=\"range\" min=\"1\"\
    max=\"10\" step=\"1\"/></td></tr></table></td></tr></table>");
    
    $('#bSend').click(function() {
		sendData();
	});		
}

function sendData() {
    //selectedPlane correspond au numero de l'avion actuellement cliqué
    // selectedPlane = -1 => aucun avion cliqué
    if (selectedPlane != -1) {
        var changements = [];
        traitementAltitude(changements);
        traitementCap(changements);
        if (changements.length > 0) {
            var ordre = new Ordre(Avion.getListeAvions()[selectedPlane],changements);
        }
    }
}

/* FONCTIONS DE TRAITEMENT */

function traitementAltitude(changements) {
        var altitudeCourante = listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].getZ() ;
        var altitudeVoulue = document.getElementById('selectAlt').value;
        if (altitudeCourante > altitudeVoulue) {
            changements.push(Ordre.Changement.DECREASE_ALTITUDE);
            Avion.getListeAvions()[selectedPlane].setZTarget(altitudeVoulue);
            updatePanneauLateralAltitudeCourante();
        }
        else if (altitudeCourante < altitudeVoulue) {
            changements.push(Ordre.Changement.INCREASE_ALTITUDE);
            Avion.getListeAvions()[selectedPlane].setZTarget(altitudeVoulue);
            updatePanneauLateralAltitudeCourante();
        }
}

function traitementCap(changements) {
        var capCourant = listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].getH() ;
        var capVoulu = document.getElementById('selectCap').value;
        if (capCourant > capVoulu) {
            changementCap(changements);
            Avion.getListeAvions()[selectedPlane].setHTarget(capVoulu);
            updatePanneauLateralCapCourant();
        }
        else if (capCourant < capVoulu) {
            changementCap(changements);
            Avion.getListeAvions()[selectedPlane].setHTarget(capVoulu);
            updatePanneauLateralCapCourant();
        }
}

function changementCap(changements) {
    if(document.getElementById('virageC').checked){
		changements.push(Ordre.Changement.CHANGE_HEAD_BETTER_WAY);
	} else if (document.getElementById('virageD').checked) { 
		changements.push(Ordre.Changement.CHANGE_HEAD_BY_RIGHT);
	}
	else {
	    changements.push(Ordre.Changement.CHANGE_HEAD_BY_LEFT);
	}
    
}

function traitementCible(changements) {
    /*  TODO / IL MANQUE LA FCT CHANGEMENT CIBLE */
    /*
        var indexCurrentCible = listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].getIndexCurrentTarget();
	    var cibleCourante = listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].getListOfTargetPoints()[indexCurrentCible].getLabel() ; 
        var cibleVoulue = document.getElementById('selectTarget').value;
        if (cibleCourante != cibleVoulue) {
            changements.push(Ordre.Changement.TODO);
            Avion.getListeAvions()[selectedPlane].setIndexCurrentTarget(cibleVoulue);
            updatePanneauLateralCibleCourante();
        }*/
}

/* MISE A JOUR DU PANNEAU LATERAL */

function updatePanneauLateral() {
	updatePanneauLateralNom();
	updatePanneauLateralVitesse();
	updatePanneauLateralAltitudeCourante();
	fillPanneauLateralAltitudesPossibles();
	updatePanneauLateralCapCourant();
	fillPanneauLateralCapPossibles();
	updatePanneauLateralCibleCourante();
	fillPanneauLateralCiblesPossibles();
	//$('#nomAvion').html(nomAvion+"-"+typeAvion);
}

    /* REINIT PANNEAU LATERAL */
function reinitialisationPanneau() {
    var spanNomAvion = document.getElementById('nomAvion');
    spanNomAvion.textContent = "";
}

function updatePanneauLateralNom() {
	var spanNomAvion = document.getElementById('nomAvion');
	var nomAvion = listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].nameOfPlane ;
	var typeAvion = listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].typeOfPlane ;
	spanNomAvion.textContent = "  "+nomAvion+"-"+typeAvion;
}

function updatePanneauLateralVitesse() {
	var spanVitesseAvion = document.getElementById('vitesseAvion');
	var vitesseAvion = listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].getV() ;
	spanVitesseAvion.textContent = "  "+vitesseAvion+" noeuds";
}

function updatePanneauLateralAltitudeCourante() {
	var spanAltitudeCouranteAvion = document.getElementById('currentAltitude');
	var AltitudeCouranteAvion = listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].getZ() ;
	spanAltitudeCouranteAvion.textContent = "  "+AltitudeCouranteAvion+" pieds";
}

function fillPanneauLateralAltitudesPossibles() {
	var selectElement = document.getElementById('selectAlt');
	var perfos = Avion.getPerformancesPerType()[listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].typeOfPlane];
	for(var i in perfos["performances"])
	{
		var Element = document.createElement('option');
		Element.value = i;
		// si l'altitude est l'altitude courante, alors cette valeur est selectionnee par defaut
		if (i == listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].getZ()) {
			Element.selected = "selected" ;
		}
		Element.textContent = parseInt(i);
		selectElement.appendChild(Element);
	}
}

/* cap */

function fillPanneauLateralCapPossibles() {
	var selectElement = document.getElementById('selectCap');
	for(var i=1; i<361;i++)
	{
		var Element = document.createElement('option');
		Element.value = i;
		// si le cap est le cap courant, alors cette valeur est selectionnee par defaut
		if (i == listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].getH()) {
			Element.selected = "selected" ;
		}
		Element.textContent = parseInt(i);
		selectElement.appendChild(Element);
	}
}

function updatePanneauLateralCapCourant() {
	var spanCurrentCapAvion = document.getElementById('currentCap');
	var CurrentCapAvion = listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].getH() ;
	spanCurrentCapAvion.textContent = "  "+CurrentCapAvion;
}

/* cible */

function updatePanneauLateralCibleCourante() {
	var spanCurrentCibleAvion = document.getElementById('currentTarget');
	var indexCurrentCible = listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].getIndexCurrentTarget();
	var CurrentCibleAvion = listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].getListOfTargetPoints()[indexCurrentCible].getLabel() ;
	spanCurrentCibleAvion.textContent = "  "+CurrentCibleAvion+" (point "+(indexCurrentCible+1)+")";
}

function fillPanneauLateralCiblesPossibles() {
	var selectElement = document.getElementById('selectTarget');
	var indexCurrentCible = listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].getIndexCurrentTarget();
	var listeCiblesAvion = listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].getListOfTargetPoints();
	for(var i in listeCiblesAvion)
	{
	    var Element = document.createElement('option');
	    var nomCibleAvion = listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].getListOfTargetPoints()[i].getLabel() ;
		Element.value = i;
		// si le cap est le cap courant, alors cette valeur est selectionnee par defaut
		if (i == indexCurrentCible) {
			Element.selected = "selected" ;
		}
		Element.textContent = nomCibleAvion+" (point "+parseInt(i+1)+")";;
		selectElement.appendChild(Element);
	}
}

/* FONCTIONS CLEAR */
function clearNomAvion() {
    var spanNomAvion = document.getElementById('nomAvion');
    spanNomAvion.textContent = "";
}