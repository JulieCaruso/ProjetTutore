/* fonction permettant de creer le panneau contenant les informations 
concernant une cible cliquée par l'utilisateur */
function initPanneauCible() {
    $('#panneauCible').html("<table border= \"1\"><tr><td><table><tr><td><b>Nom de la cible : </b><span id=\"nomCible\"/></td></tr> \
    <tr><td><b>x :</b><span id=\"coordX\"/>&nbsp;&nbsp;&nbsp;<b>y :</b><span id=\"coordY\"/></td></tr></table></td></tr></table>");
}
    
/* fonction permettant de mettre a jour le panneau */
function updatePanneauCible() {
        updateNomCible();
        updateAbscisseCible();
        updateOrdonneeCible();
}

/* fonction permettant de mettre a jour l'affichage du nom de la cible */
function updateNomCible(){
    if (selectedTarget != -1) {
        var spanNomCible = document.getElementById('nomCible');
        spanNomCible.textContent = "  "+selectedTarget.getLabel();
    }
}

/* fonction permettant de mettre a jour l'affichage de l'abscisse de la cible */
function updateAbscisseCible(){
    if (selectedTarget != -1) {
        var spanAbscisseCible = document.getElementById('coordX');
        spanAbscisseCible.textContent = "  "+selectedTarget.getX();
    }
}

/* fonction permettant de mettre a jour l'affichage de l'ordonnee de la cible */
function updateOrdonneeCible(){
    if (selectedTarget != -1) {
        var spanOrdonneeCible = document.getElementById('coordY');
        spanOrdonneeCible.textContent = "  "+selectedTarget.getY();
    }
}

/* fonction permettant de reinitialiser le contenu du panneau cible */
function reinitialisationPanneauCible() {
    clearNomCible();
    clearAbscisseCible();
    clearOrdonneeCible();
}

/* fonction permettant de reinitialiser l'affichage du nom de la cible */
function clearNomCible() {
    var spanNomCible = document.getElementById('nomCible');
	spanNomCible.textContent = "";   
}

/* fonction permettant de reinitialiser l'affichage de l'abscisse de la cible */
function clearAbscisseCible() {
    var spanAbscisseCible = document.getElementById('coordX');
	spanAbscisseCible.textContent = "";   
}

/* fonction permettant de reinitialiser l'affichage de l'ordonnee de la cible */
function clearOrdonneeCible() {
    var spanOrdonneeCible = document.getElementById('coordY');
	spanOrdonneeCible.textContent = "";   
}