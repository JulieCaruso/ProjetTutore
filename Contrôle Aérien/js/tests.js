//canvasWidth = "579";
//canvasHeight = "436";
dist_limite = 20;

//quand 2 avions se rapprochent
function testAirProX(avion1, avion2){
	aX1 = avion1.getX();
	aY1 = avion1.getY();
	aZ1 = avion1.getZ();
	aX2 = avion2.getX();
	aY2 = avion2.getY();
	aZ2 = avion2.getZ();

	dist_a1_a2 = Math.sqrt(((aX1-aX2)^2)+((aY1-aY2)^2)+((aZ1-aZ2)^2))
	if (dist_a1_a2 <= dist_limite){
		avion1.setColor("red");
	} else if (avion1.getColor()=="red") {avion2.setColor("blue");}
}

//quand l'avion s'approche la limite de la carte
function testAirProXLim(avion){
	aX1 = avion.getX();
	aY1 = avion.getY();

	if (Math.abs(aX1-parseInt(canvasWidth))<=dist_limite|Math.abs(aY1-parseInt(canvasHeight))<=dist_limite||Math.abs(aX1)<=dist_limite||Math.abs(aY1)<=dist_limite){
		avion.setColor("red");
	} else if (avion.getColor()=="red") {avion.setColor("blue");}
}

function testTargetP(avion, targetPoint){
	dist_avion_targetP = Math.sqrt(Math.abs((avion.getX()-targetPoint.getX())^2+(avion.getY()-targetPoint.getY())^2));
	if (dist_avion_targetP <= 5/5){
		console.debug("hola : "+dist_avion_targetP);
		if (avion.getIndexCurrentTarget() < avion.getListOfTargetPoints().length-1){
			avion.setIndexCurrentTarget(avion.getIndexCurrentTarget()+1);
			updateHeadToTargetPoint(avion);
		}
	}
}
