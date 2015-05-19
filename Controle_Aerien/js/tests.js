var airproxEnCours = 0;

//quand 2 avions se rapprochent
function testAirProX(avion1, avion2) {
    var normHorizontalSeparation = parseInt(Niveau.getListeNiveaux()[0].getInitInterface().getNormHorizontalSeparation());
    var normVerticalSeparation = parseInt(Niveau.getListeNiveaux()[0].getInitInterface().getNormVerticalSeparation());
	var aX1 = avion1.getX() * scale;
	var aY1 = avion1.getY() * scale;
	var aZ1 = avion1.getZ() * scale;
	var aX2 = avion2.getX() * scale;
	var aY2 = avion2.getY() * scale;
	var aZ2 = avion2.getZ() * scale;
	var dist_a1_a2 = Math.sqrt(Math.pow(aX1 - aX2, 2)+Math.pow(aY1 - aY2, 2)+Math.pow(aZ1 - aZ2, 2));
	
    if (Math.abs(aX1 - aX2) <= normHorizontalSeparation && Math.abs(aY1 - aY2) <= normVerticalSeparation) {
		avion1.setColor("red");
		avion2.setColor("red");
        if (airproxEnCours ==0) {
            /* TODOOOOO */
            //score.airproxDetecte();
            airproxEnCours =1;
        }
	}
	else if (avion1.getColor()=="red") {
        airproxEnCours = 0 ;
		var a_selected = listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane];
		if (selectedPlane !== -1 && avion1.getNameOfPlane() === a_selected.getNameOfPlane()) {
			avion1.setColor("orange");
			avion2.setColor("blue");
		}
		else if (selectedPlane !== -1 && avion2.getNameOfPlane() === a_selected.getNameOfPlane()) {
			avion1.setColor("blue");
			avion2.setColor("orange");
		}
		else {
			avion1.setColor("blue");
			avion2.setColor("blue");
		}
	}
}

//quand l'avion s'approche la limite de la carte
function testAirProXLim(avion){
    var normDistanceToZone = parseInt(Niveau.getListeNiveaux()[0].getInitInterface().getNormDistanceToZone());
	var aX1 = avion.getX() * scale;
	var aY1 = avion.getY() * scale;

	if (Math.abs(aX1 - parseInt(canvasWidth)) <= normDistanceToZone || Math.abs(aY1-parseInt(canvasHeight)) <= normDistanceToZone || Math.abs(aX1) <= normDistanceToZone || Math.abs(aY1) <= normDistanceToZone){
		avion.setColor("purple");
	} else if (avion.getColor() == "purple") {avion.setColor("blue");}
}

// quand l'avion est proche d'un de ses target points
function testTargetP(avion, targetPoint){
    var normDistanceToZone = parseInt(Niveau.getListeNiveaux()[0].getInitInterface().getNormDistanceToZone());
	var dist_avion_targetP = Math.sqrt(Math.abs(Math.pow(avion.getX()*scale-targetPoint.getX()*scale,2)+Math.pow(avion.getY()*scale-targetPoint.getY()*scale,2))); 
	if (dist_avion_targetP <= normDistanceToZone){
        avion.setIndexCurrentTarget(avion.getIndexCurrentTarget()+1);
		if (avion.getIndexCurrentTarget() < avion.getListOfTargetPoints().length){
			updateHeadToTargetPoint(avion);
		}
	}
}

// Permet de tester si l'avion se trouve près d'un zone de fin de jeu (de SA zone de fin de jeu)
function testEndZone(avion) {
    var normLineSeparation = parseInt(Niveau.getListeNiveaux()[0].getInitInterface().getNormLineSeparation());
	var aX = avion.getX() * scale;
	var aY = avion.getY() * scale;
    var listEndZones = Niveau.getListeNiveaux()[niveauCourant].getListOfZones();
    for (var i = 0; i < listEndZones.length; i++) {
        if (listEndZones[i].getNature() == "endGameTarget") {
            var listOfPoints = listEndZones[i].getListOfPoints_Cercle();
            var X1 = listOfPoints[0].getX();
            var Y1 = listOfPoints[0].getY();
            var X2 = listOfPoints[1].getX();
            var Y2 = listOfPoints[1].getY();
            // a calculer !
            var dist_a_z = 50;
            if (listEndZones[i].getConcernedPlanes() == avion.getNameOfPlane() && dist_a_z < normLineSeparation){
                avion.setEnd(1);
                Niveau.getListeNiveaux()[niveauCourant].setNbAvionsFinis(Niveau.getListeNiveaux()[niveauCourant].getNbAvionsFinis() + 1);
                score.zoneFinDeJeuAtteinte();
            }
        }
    }
    
}

// Permet de tester si l'avion se trouve dans une zone d'altération
function testAlterationZone(avion, zone){
	
	var distance_avion = Math.sqrt(Math.abs(Math.pow(avion.getX()*scale-zone.getX()*scale,2)+Math.pow(avion.getY()*scale-zone.getY()*scale,2))); 
	var coordinates;
	
	if (distance_avion <= zone.getRadius())
	{
		// On se trouve dans la zone	
		coordinates = calculateXY_deviation(avion, zone.getSpeed(), zone.getHead());
		setCoordinates(avion,coordinates);
	}
	
}
