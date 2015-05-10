//canvasWidth = "579";
//canvasHeight = "436";
dist_limite = 40;

//quand 2 avions se rapprochent
function testAirProX(avion1, avion2) {
	aX1 = avion1.getX() * scale;
	aY1 = avion1.getY() * scale;
	aZ1 = avion1.getZ() * scale;
	aX2 = avion2.getX() * scale;
	aY2 = avion2.getY() * scale;
	aZ2 = avion2.getZ() * scale;
	dist_a1_a2 = Math.sqrt(Math.pow(aX1 - aX2, 2)+Math.pow(aY1 - aY2, 2)+Math.pow(aZ1 - aZ2, 2));
	
	if (dist_a1_a2 <= dist_limite)
	{
		avion1.setColor("red");
		avion2.setColor("red");
	}
	else if (avion1.getColor()=="red") 
	{
		var a_selected = listeNiveaux[niveauCourant].getListOfAvions()[selectedPlane];
		if (selectedPlane !== -1 && avion1.getNameOfPlane() === a_selected.getNameOfPlane())
		{
			avion1.setColor("orange");
			avion2.setColor("blue");
		}
		else if (selectedPlane !== -1 && avion2.getNameOfPlane() === a_selected.getNameOfPlane())
		{
			avion1.setColor("blue");
			avion2.setColor("orange");
		}
		else
		{
			avion1.setColor("blue");
			avion2.setColor("blue");
		}
	}
	
}

//quand l'avion s'approche la limite de la carte
function testAirProXLim(avion){
	aX1 = avion.getX() * scale;
	aY1 = avion.getY() * scale;

	if (Math.abs(aX1 - parseInt(canvasWidth)) <= dist_limite || Math.abs(aY1-parseInt(canvasHeight)) <= dist_limite || Math.abs(aX1) <= dist_limite || Math.abs(aY1) <= dist_limite){
		avion.setColor("purple");
	} else if (avion.getColor() == "purple") {avion.setColor("blue");}
}

function testTargetP(avion, targetPoint){
	dist_avion_targetP = Math.sqrt(Math.abs(Math.pow(avion.getX()*scale-targetPoint.getX()*scale,2)+Math.pow(avion.getY()*scale-targetPoint.getY()*scale,2))); 
	if (dist_avion_targetP <= dist_limite*scale){
        avion.setIndexCurrentTarget(avion.getIndexCurrentTarget()+1);
		if (avion.getIndexCurrentTarget() < avion.getListOfTargetPoints().length){
			updateHeadToTargetPoint(avion);
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
		coordinates = calculateXY_deviation(avion, 280, 240);
		setCoordinates(avion,coordinates);
	}
	
}
