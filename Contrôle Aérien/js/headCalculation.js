/*


Ensemble des méthodes permettant de calculer la variation de cap à effectuer pour atteindre un cap cible à partir d'un cap actuel



"Current head = 310, Type = B763, Spead = 451, Sens du virage = 0" headCalculation.js:15:1
"X0 = -8391.87895645981" headCalculation.js:16:0
"Y0 = 10001.051894976727" headCalculation.js:17:1


*/

// Méthode d'entrée pour le calcul d'un nouveau cap, on y fournit l'objet de type "Avion" ainsi que le sens de virage (0 si par la gauche, 1 si par la droite)
function calculateHead(avion,sensVirage){
	// spead est en noeuds = 1 MN / h avec 1 MN = 1822 m
	var type = avion.getTypeOfPlane(), currentHead = avion.getH(), targetHead = avion.getHTarget(), spead = parseInt(avion.getV()*60/1822), xA = avion.getX(), yA = avion.getY(), inclinaison = Avion.getPerformancesPerType()[type]["inclinaisonMax"], R = 0;

	var point = null, distanceAB = 0, delta = 0, xB = 0, yB = 0;

	// spead en mètres/seconde, R en mètres 
	R = parseInt((spead*spead)/(Math.tan(inclinaison*Math.PI/180)*9.81));

	console.debug("R = "+R);

	var point = calculateOrigin(R,xA,yA,currentHead,type,spead,sensVirage);

	console.debug("Current head = "+currentHead+", Type = "+type+", Spead = "+spead+", Sens du virage = "+sensVirage);
	console.debug("X0 = "+point.getX());
	console.debug("Y0 = "+point.getY());

	// On multiplie la distance en m/s par deltaT = 1 seconde
	distanceAB = parseInt(spead*1);


	console.debug("DistanceAB/2R (doit être entre -1 et 1): "+distanceAB/(2*R));
	console.debug("ArcCos (renvoie un angle entre 0 et Pi/2): "+Math.acos(distanceAB/(2*R)));
	// On en déduit delta
	delta = (Math.acos(distanceAB/(2*R)))*180/Math.PI;
	
	console.debug("Delta (convertie en degrès) = "+delta);
	// Et donc deltaH
	deltaH = (90 - delta)%360;
	console.debug("DeltaH = "+deltaH);

	if(sensVirage == 0)
	{
		console.debug("Cap + 1 = "+(currentHead-deltaH));
		if(currentHead-deltaH < targetHead)
		{
			avion.setH(targetHead);
		}
		else
		{
			avion.setH((currentHead-deltaH)%360);
		}
	}
	else 
	{
		console.debug("Cap +1 = "+(currentHead+deltaH));
		if(currentHead+deltaH > targetHead)
		{
			avion.setH(targetHead);
		}
		else
		{
			avion.setH((currentHead+deltaH)%360);
		}
	}

	// Enfin, on calcule les nouvelles coordonnées
	avion.setX(avion.getX()+spead*Math.sin(avion.getH()*Math.PI/180));
	avion.setY(avion.getY()-spead*Math.cos(avion.getH()*Math.PI/180));

	xB = avion.getX();
	yB = avion.getY();

	console.debug("Ancien cap : "+currentHead+", Cap + 1 seconde : "+avion.getH()+", Cap visé : "+targetHead+", Position initiale (A) : X = "+xA+", Y = "+yA+", Position + 1 seconde (B) : X = "+xB+", Y = "+yB);
	// On vérifie le décalage


}

function calculateOrigin(R,xA,yA,currentHead,type,spead,sensVirage){

	var headOrthogonal = null, alpha = null, x0 = null, y0 = null; 
	
	
	if(sensVirage == 0){
		// On va à gauche
		headOrthogonal = (currentHead-90)%360;
		alpha = (90 - headOrthogonal)%360;
		x0 = R*Math.cos(alpha*Math.PI/180);
		y0 = -R*Math.sin(alpha*Math.PI/180);
	}
	else
	{
		// On va à droite
		headOrthogonal = (currentHead+90)%360;
		alpha = (90 + headOrthogonal)%360;
		x0 = R*Math.cos(alpha*Math.PI/180);
		y0 = R*Math.sin(alpha*Math.PI/180);
	}

	return new Point(parseInt(xA+x0),parseInt(yA+y0));

}

// Permet de calculer le cap suivant deux points, A et B sont deux objets de type "Point"
function calculateOrientation(A,B){
	var xA = A.getX(), xB = B.getX(), yA = A.getY(), yB = B.getY(), cadran = -1, rayon = -1, angle = -1, sensAngle = -1;
	if (xA < xB){
		if (yA < yB){
			cadran = 0;
		}
		else
		{
			cadran = 90;
		}
	}
	else
	{
		if (yA < yB){
			cadran = 270;
		}
		else
		{
			cadran = 180;
		}
	}

	// On ramène donc le calcul à un angle entre 0 et Pi/2

	rayon = Math.sqrt((xB-xA)*(xB-xA)+(yB-yA)*(yB-yA));

	angle = Math.acos((xB-xA)/rayon);

	return parseInt(angle*180/Math.PI+cadran);
}