//var t=null;

function initPanneauLateral() {
    $('#panneauLateral').html("<table border= \"1\"><tr><td><table><tr><td><b>Nom de l'avion :</b><span id=\"nomAvion\"/></td></tr> \
    <tr><td><b>Vitesse :</b> <br/><span class=\"marge\">Actuelle : <span id=\"vitesseAvion\"/></span><br/><span class=\"marge\">Nouvelle vitesse :<select name=\"selectVitesse\" \
    id=\"selectVitesse\"></select></span></td></tr><tr><td><b>Altitude :</b> <br/><span class=\"marge\">Actuelle : \
    <span id=\"currentAltitude\"/></span><br/><span class=\"marge\">Nouvelle altitude :<select name=\"selectAltitude\" \
    id=\"selectAlt\"></select></span></td></tr><tr><td><b>Cible :</b><br/><span class=\"marge\">Actuelle : <span id=\"currentTarget\"/> \
    </span><br/><span class=\"marge\">Nouvelle cible :<select name=\"selectTarget\" id=\"selectTarget\"></select></span></td></tr><tr> \
    <td><b>Cap :</b><br/><span class=\"marge\">Actuel :<span id=\"currentCap\"/></span><br/><span class=\"marge\">Nouveau cap :   <select disabled=\"disabled\" name=\"selectCap\" \
    id=\"selectCap\"></select><br/><input type=\"radio\" id=\"virageC\" name=\"virage\" checked=\"checked\" value=\"0\"/>Virage le plus court <input type=\"radio\" name=\"virage\" \
    id=\"virageD\" value=\"1\"/>Virage droite<input type=\"radio\" name=\"virage\" id=\"virageG\" value=\"2\"/>Virage gauche<br/></span></td></tr> \
    <tr><td><input type=\"radio\" id=\"followTarget\" name=\"follow\" checked=\"checked\" value=\"1\"/>Suivre la cible \
    <input type=\"radio\" name=\"follow\" id=\"followCap\" value=\"0\"/>Suivre le cap \
    <tr><td><input id=\"bSend\" type=\"submit\" value=\"Envoyer\"/> \
    </td></tr></table><table><tr><td><b>Vitesse du jeu</b><div id=\"vitesseJeu\"/><input id=\"vitesse_jeu\" type=\"range\" min=\"1\"\
    max=\"6\" step=\"1\" value=\"4\"/></td></tr></table></td></tr></table>");
    
    $('#bSend').click(function () {
        sendData();
    });
    
    $('#followTarget').click(function () {
        followHasChanged();
    });
    
    $('#followCap').click(function () {
        followHasChanged();
    });
}

/* fonction appelee pour actualiser periodiquement le panneau lateral
TODO : valeurs par defaut dans le menu deroulant !!!!
 * */
function update() {
    if (selectedPlane != -1) {
        if (vHasChanged()) {
            updatePanneauLateralVitesse();
        }
        if (zHasChanged()) {
            updatePanneauLateralAltitudeCourante();
        }
        if (hHasChanged()) {
            updatePanneauLateralCapCourant();
        }
        if (tHasChanged()) {
            updatePanneauLateralCibleCourante();
        }
    }
}


function sendData() {
    //selectedPlane correspond au numero de l'avion actuellement cliqué
    // selectedPlane = -1 => aucun avion cliqué
    if (selectedPlane != -1) {
        var changements =[];
        traitementVitesse(changements);
        traitementAltitude(changements);
		( $("#followCap").attr("checked") != undefined ? traitementCap(changements) :  traitementCible(changements) );
        if (changements.length > 0) {
            var ordre = new Ordre(Avion.getListeAvions()[selectedPlane], changements);
        }
    }
}

function followHasChanged () {
    var update_follow = function () {
        if ($("#followCap").is(":checked")) {
            $('#selectCap').prop('disabled', false);
            $('#selectTarget').prop('disabled', 'disabled');
        } else {
            $('#selectCap').prop('disabled', 'disabled');
            $('#selectTarget').prop('disabled', false);
        }
    }
    $(update_follow);
    $("#followCap").change(update_follow);
}

/* FONCTIONS DE TRAITEMENT */

function traitementVitesse(changements) {
    var vCourante = listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].getV();
    var vVoulue = document.getElementById('selectVitesse').value;
    if (vCourante > vVoulue) {
        changements.push(Ordre.Changement.DECREASE_SPEED);
        Avion.getListeAvions()[selectedPlane].setVTarget(vVoulue);
        updatePanneauLateralVitesse();
    } else if (vCourante < vVoulue) {
        changements.push(Ordre.Changement.INCREASE_SPEED);
        Avion.getListeAvions()[selectedPlane].setVTarget(vVoulue);
        updatePanneauLateralVitesse();
    }
}

function traitementAltitude(changements) {
    var altitudeCourante = listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].getZ();
    var altitudeVoulue = document.getElementById('selectAlt').value;
    if (altitudeCourante > altitudeVoulue) {
        changements.push(Ordre.Changement.DECREASE_ALTITUDE);
        Avion.getListeAvions()[selectedPlane].setZTarget(altitudeVoulue);
        updatePanneauLateralAltitudeCourante();
    } else if (altitudeCourante < altitudeVoulue) {
        changements.push(Ordre.Changement.INCREASE_ALTITUDE);
        Avion.getListeAvions()[selectedPlane].setZTarget(altitudeVoulue);
        updatePanneauLateralAltitudeCourante();
    }
}

function traitementCap(changements) {
    var capCourant = listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].getH();
    var capVoulu = document.getElementById('selectCap').value;
    if (capCourant > capVoulu) {
        changementCap(changements);
        Avion.getListeAvions()[selectedPlane].setHTarget(capVoulu);
        updatePanneauLateralCapCourant();
    } else if (capCourant < capVoulu) {
        changementCap(changements);
        Avion.getListeAvions()[selectedPlane].setHTarget(capVoulu);
        updatePanneauLateralCapCourant();
    }
}

function changementCap(changements) {
    if (document.getElementById('virageC').checked) {
        changements.push(Ordre.Changement.CHANGE_HEAD_BETTER_WAY);
    } else if (document.getElementById('virageD').checked) {
        changements.push(Ordre.Changement.CHANGE_HEAD_BY_RIGHT);
    } else {
        changements.push(Ordre.Changement.CHANGE_HEAD_BY_LEFT);
    }
}

function traitementCible(changements) {
    var indexCurrentCible = listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].getIndexCurrentTarget();
    var cibleCourante = listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].getListOfTargetPoints()[indexCurrentCible].getLabel();
    var cibleVoulue = document.getElementById('selectTarget').value;
    if (cibleCourante != cibleVoulue) {
        Avion.getListeAvions()[selectedPlane].setIndexCurrentTarget(cibleVoulue);
        updateHeadToTargetPoint(listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane]);
        changements.push(Ordre.Changement.MODIFY_TARGET_POINT);
        updatePanneauLateralCibleCourante();
    }
}

/*
/ Fonction permettant de modifier la vitesse de jeu en cas de changement
*/
function traitementVitesseJeu() {
	
	// On supprime l'ancienne valeur
	clearInterval(inter);
	
	// On récupère la nouvelle
	var curseur_vitesse = parseInt($("#vitesse_jeu").val());
	var rafraichissement_ms = getSpeedWithCursor(curseur_vitesse);
	inter = setInterval(regles, rafraichissement_ms);
	
}

/*
/ Fonction permettant de trouver la vitesse de jeu en fonction du curseur, renvoie le temps de rafraichissement en ms
*/
function getSpeedWithCursor(curseur){
	
	// Stockage du résultat
	var resultat = -1;
	
	// On effectue un switch sur le curseur
	switch(curseur)
	{
		case(1):
			resultat = 2000;
		break;
		case(2):
			resultat = 1000;
		break;
		case(3):
			resultat = 750;
		break;
		case(4):
			resultat = 500;
		break;
		case(5):
			resultat = 250;
		break;
		case(6):
			resultat = 100;
		break;
	}
	
	return resultat;
	
}

/* MISE A JOUR DU PANNEAU LATERAL */

function updatePanneauLateral() {
    updatePanneauLateralNom();
    updatePanneauLateralVitesse();
    fillPanneauLateralVitessesPossibles();
    updatePanneauLateralAltitudeCourante();
    fillPanneauLateralAltitudesPossibles();
    updatePanneauLateralCapCourant();
    fillPanneauLateralCapPossibles();
    updatePanneauLateralCibleCourante();
    fillPanneauLateralCiblesPossibles();
    
    function affichageDynamique() {
        update();
        t = setInterval("update()", 1000);
    }
    affichageDynamique();
    //$('#nomAvion').html(nomAvion+"-"+typeAvion);
}

/* REINIT PANNEAU LATERAL */
function reinitialisationPanneau() {
    clearNomAvion();
    clearVitesse();
    clearVitessesPossibles();
    clearAltitudeCourante();
    clearCapCourant();
    clearCibleCourante();
    clearCapPossibles();
    clearAltitudesPossibles();
    clearCiblesPossibles();
}

function updatePanneauLateralNom() {
    var spanNomAvion = document.getElementById('nomAvion');
    var nomAvion = listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].nameOfPlane;
    var typeAvion = listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].typeOfPlane;
    spanNomAvion.textContent = "  " + nomAvion + "-" + typeAvion;
}

function updatePanneauLateralVitesse() {
    var spanVitesseAvion = document.getElementById('vitesseAvion');
    var vitesseAvion = listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].getV();
    spanVitesseAvion.textContent = "  " + vitesseAvion + " noeuds";
}

function updatePanneauLateralAltitudeCourante() {
    var spanAltitudeCouranteAvion = document.getElementById('currentAltitude');
    var AltitudeCouranteAvion = listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].getZ();
    spanAltitudeCouranteAvion.textContent = "  " + AltitudeCouranteAvion + " pieds";
}

function fillPanneauLateralVitessesPossibles() {
    var selectElement = document.getElementById('selectVitesse');
    var perfos = Avion.getPerformancesPerType()[listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].typeOfPlane];
    for (var i in perfos[ "performances"]) {
        // il faut verifier que la vitesse n'est pas deja dans le menu déroulant
        var selectElementVitesses = document.getElementById('selectVitesse');
        var opts = selectElementVitesses.getElementsByTagName('option');
        var ecrire = true;
        for (var j = 0; j < opts.length; j++) {
            if (opts[j].value == perfos[ "performances"][i][ "Vpc"]) {
                ecrire = false;
            }
        };
        
        if (ecrire) {
            var Element = document.createElement('option');
            Element.value = perfos[ "performances"][i][ "Vpc"];
            // si l'altitude est l'altitude courante, alors cette valeur est selectionnee par defaut
            if (perfos[ "performances"][i][ "Vpc"] == listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].getV()) {
                Element.selected = "selected";
            }
            Element.textContent = parseInt(perfos[ "performances"][i][ "Vpc"]);
            selectElement.appendChild(Element);
        }
    }
}


function fillPanneauLateralAltitudesPossibles() {
    var selectElement = document.getElementById('selectAlt');
    var perfos = Avion.getPerformancesPerType()[listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].typeOfPlane];
    for (var i in perfos[ "performances"]) {
        var Element = document.createElement('option');
        Element.value = i;
        // si l'altitude est l'altitude courante, alors cette valeur est selectionnee par defaut
        if (i == listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].getZ()) {
            Element.selected = "selected";
        }
        Element.textContent = parseInt(i);
        selectElement.appendChild(Element);
    }
}

/* cap */

function fillPanneauLateralCapPossibles() {
    var selectElement = document.getElementById('selectCap');
    for (var i = 1; i < 361; i++) {
        var Element = document.createElement('option');
        Element.value = i;
        // si le cap est le cap courant, alors cette valeur est selectionnee par defaut
        if (i == listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].getH()) {
            Element.selected = "selected";
        }
        Element.textContent = parseInt(i);
        selectElement.appendChild(Element);
    }
}

function updatePanneauLateralCapCourant() {
    var spanCurrentCapAvion = document.getElementById('currentCap');
    var CurrentCapAvion = listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].getH();
    spanCurrentCapAvion.textContent = "  " + CurrentCapAvion;
}

/* cible */

function updatePanneauLateralCibleCourante() {
    var spanCurrentCibleAvion = document.getElementById('currentTarget');
    var indexCurrentCible = listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].getIndexCurrentTarget();
    var CurrentCibleAvion = listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].getListOfTargetPoints()[indexCurrentCible].getLabel();
    var indexAffiche = parseInt(indexCurrentCible);
    indexAffiche = indexAffiche + 1;
    spanCurrentCibleAvion.textContent = "  " + CurrentCibleAvion + " (point " +(indexAffiche) + ")";
}

function fillPanneauLateralCiblesPossibles() {
    var selectElement = document.getElementById('selectTarget');
    var indexCurrentCible = listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].getIndexCurrentTarget();
    var listeCiblesAvion = listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].getListOfTargetPoints();
    for (var i in listeCiblesAvion) {
        var Element = document.createElement('option');
        var nomCibleAvion = listeCiblesAvion[i].getLabel();
        Element.value = i;
        // si le cap est le cap courant, alors cette valeur est selectionnee par defaut
        if (i == indexCurrentCible) {
            Element.selected = "selected";
        }
        //Element.textContent = nomCibleAvion+" (point "+parseInt(i+1)+")";;
        var valeurAffichee = parseInt(i);
        valeurAffichee = valeurAffichee + 1;
        Element.textContent = nomCibleAvion + " (point " + valeurAffichee + ")";;
        selectElement.appendChild(Element);
    }
}

/* FONCTIONS CLEAR */

function clearNomAvion() {
    var spanNomAvion = document.getElementById('nomAvion');
    spanNomAvion.textContent = "";
}
function clearVitesse() {
    var spanVitesseAvion = document.getElementById('vitesseAvion');
    spanVitesseAvion.textContent = "";
}

function clearVitessesPossibles() {
    var selectElementVitesse = document.getElementById('selectVitesse');
    var opts = selectElementVitesse.getElementsByTagName('option');
    while (opts[0]) {
        selectElementVitesse.removeChild(opts[0]);
    }
}

function clearAltitudeCourante() {
    var spanAltitudeCouranteAvion = document.getElementById('currentAltitude');
    spanAltitudeCouranteAvion.textContent = "";
}

function clearAltitudesPossibles() {
    var selectElementAltitude = document.getElementById('selectAlt');
    var opts = selectElementAltitude.getElementsByTagName('option');
    while (opts[0]) {
        selectElementAltitude.removeChild(opts[0]);
    }
}
function clearCapCourant() {
    var spanCurrentCapAvion = document.getElementById('currentCap');
    spanCurrentCapAvion.textContent = "";
}

function clearCapPossibles() {
    var selectElementCap = document.getElementById('selectCap');
    var opts = selectElementCap.getElementsByTagName('option');
    while (opts[0]) {
        selectElementCap.removeChild(opts[0]);
    }
}

function clearCibleCourante() {
    var spanCurrentCibleAvion = document.getElementById('currentTarget');
    spanCurrentCibleAvion.textContent = "";
}

function clearCiblesPossibles() {
    selectElementTarget = document.getElementById('selectTarget');
    var opts = selectElementTarget.getElementsByTagName('option');
    while (opts[0]) {
        selectElementTarget.removeChild(opts[0]);
    }
}

/* les fonctions xHasChanged permettent de savoir si "x" a changé */

// pour la vitesse
function vHasChanged() {
    var spanVitesseAvion = document.getElementById('vitesseAvion');
    var vitesseAvion = listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].getV();
    if (spanVitesseAvion.textContent != "  " + vitesseAvion + " noeuds") {
        //console.debug("vitesse changee");
        return 1;
    } else {
        //console.debug("vitesse non changee");
        return 0;
    }
}

// pour le cap
function hHasChanged() {
    var spanCurrentCapAvion = document.getElementById('currentCap');
    var CurrentCapAvion = listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].getH();
    if (spanCurrentCapAvion.textContent != "  " + CurrentCapAvion) {
        //console.debug("cap changé");
        return 1;
    } else {
        //console.debug("cap non changé");
        return 0;
    }
}

// pour l'altitude
function zHasChanged() {
    var spanAltitudeCouranteAvion = document.getElementById('currentAltitude');
    var AltitudeCouranteAvion = listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].getZ();
    if (spanAltitudeCouranteAvion.textContent != "  " + AltitudeCouranteAvion + " pieds") {
        //console.debug("altitude changee");
        return 1;
    } else {
        //console.debug("altitude non changee");
        return 0;
    }
}

// pour la cible
function tHasChanged() {
    var spanCurrentCibleAvion = document.getElementById('currentTarget');
    var indexCurrentCible = listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].getIndexCurrentTarget();
    var CurrentCibleAvion = listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].getListOfTargetPoints()[indexCurrentCible].getLabel();
    var indexAffiche = parseInt(indexCurrentCible);
    indexAffiche = indexAffiche + 1;
    if (spanCurrentCibleAvion.textContent != "  " + CurrentCibleAvion + " (point " +(indexAffiche) + ")") {
        //console.debug("target has changed");
        return 1;
    } else {
        //console.debug("target hasnt changed");
        return 0;
    }
}



/////////////////////////////////////////////////////////////////////////
// fonctions updateSelectedX utilisées pour mettre a jour les valeurs
// par defaut dans le menu deroulant X possibles

//  A SUPPRIMER ??? normalement inutile

/////////////////////////////////////////////////////////////////////////

function updateSelectedVitesse() {
}

function updateSelectedAltitude() {
    var altitudeCouranteAvion = listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].getZ();
    var selectAltPossibles = document.getElementById('selectAlt');
    var opts = selectAltPossibles.getElementsByTagName('option');
    for (var j = 0; j < opts.length; j++) {
        if (opts[j].value == altitudeCouranteAvion) {
            opts[j].selected = "selected";
        }
    }
}

function updateSelectedCap() {
}

function updateSelectedCible() {
    var indexCurrentTarget = listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane].getIndexCurrentTarget();
    var selectPossiblesTarget = document.getElementById('selectTarget');
    var opts = selectPossiblesTarget.getElementsByTagName('option');
    for (var j = 0; j < opts.length; j++) {
        if (opts[j].value == indexCurrentTarget) {
            opts[j].selected = "selected";
        }
    }
}