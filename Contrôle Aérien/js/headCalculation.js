/*


Ensemble des méthodes permettant de calculer la variation de cap à effectuer pour atteindre un cap cible à partir d'un cap actuel



"Current head = 310, Type = B763, speed = 451, Sens du virage = 0" headCalculation.js:15:1
"X0 = -8391.87895645981" headCalculation.js:16:0
"Y0 = 10001.051894976727" headCalculation.js:17:1


*/

function updateHeadToTargetPoint(avion){
	var xA = avion.getX();
	var yA = avion.getY();
	var pA = new Point(xA, yA);
	var xT = avion.getListOfTargetPoints()[0].getX();
	var yT = avion.getListOfTargetPoints()[0].getY();
	var pT = new Point(xT, yT);
	avion.setHTarget(calculateOrientation(pA, pT));
}

// Méthode d'entrée pour le calcul d'un nouveau cap, on y fournit l'objet de type "Avion" ainsi que le sens de virage (0 si par la gauche, 1 si par la droite)
function calculateHead(avion,sensVirage){
	// speed est en noeuds = 1 MN / h avec 1 MN = 1852 m
	var type = avion.getTypeOfPlane(), currentHead = avion.getH(), targetHead = avion.getHTarget(), speed = parseInt(avion.getV()*60/1852), xA = avion.getX(), yA = avion.getY(), inclinaison = Avion.getPerformancesPerType()[type]["inclinaisonMax"], R = 0;

	var point = null, distanceAB = 0, delta = 0, xB = 0, yB = 0;

	// speed en mètres/seconde, R en mètres 
	R = parseInt((speed*speed)/(Math.tan(inclinaison*Math.PI/180)*9.81));

	//console.debug("R = "+R);

	//var point = calculateOrigin(R,xA,yA,currentHead,type,speed,sensVirage);

	//console.debug("Current head = "+currentHead+", Type = "+type+", speed = "+speed+", Sens du virage = "+(sensVirage==0?"Gauche":"Droite"));

	// On multiplie la distance en m/s par deltaT = 1 seconde
	distanceAB = parseInt(speed*1);


	//console.debug("DistanceAB/2R (doit être entre -1 et 1): "+distanceAB/(2*R));
	//console.debug("ArcCos (renvoie un angle entre 0 et Pi/2): "+Math.acos(distanceAB/(2*R)));
	// On en déduit delta
	delta = (Math.acos(distanceAB/(2*R)))*180/Math.PI;
	
	//console.debug("Delta (convertie en degrès) = "+delta);
	// Et donc deltaH
	deltaH = mod((90-delta),360)+1;
	//console.debug("DeltaH = "+deltaH);

	if(sensVirage == 0)
	{
		//console.debug("Cap + 1 = "+(currentHead-deltaH));
		// On va par la gauche en diminuant (ex : on va de 180° à 9O°)
		if (currentHead > targetHead){

			if(currentHead-deltaH < targetHead)
			{
				avion.setH(targetHead);
			}
			else
			{
				avion.setH(mod((currentHead-deltaH),360)+1);
			}

		}
		else
		{
			// On va par la gauche mais avec un cap visé plus grand que le cap actuel (ex : on va de 90° à 310°)
			// On diminue donc forcément
			var new_cap = mod((currentHead-deltaH),360)+1; 
			if (new_cap > 270 && currentHead < 90){
				if(targetHead > new_cap){
					avion.setH(targetHead);
				}
				else
				{
					avion.setH(new_cap);
				}
			}
			else
			{
				avion.setH(new_cap);
			}
		}
	}
	else 
	{
		//console.debug("Cap +1 = "+(currentHead+deltaH));
		// On va par la droite en augmentant (ex : on va de 90° à 180°)
		if (currentHead < targetHead){

			if(currentHead+deltaH > targetHead)
			{
				avion.setH(targetHead);
			}
			else
			{
				avion.setH(mod((currentHead+deltaH),360)+1);
			}
		}
		else
		{
			// On va par la droite mais avec un cap visé plus petit que le cap actuel (ex : on va de 310° à 90°)
			var new_cap = mod((currentHead+deltaH),360)+1; 
			if (currentHead > 270 && new_cap < 90){
				if(targetHead < new_cap){
					avion.setH(targetHead);
				}
				else
				{
					avion.setH(new_cap);
				}
			}
			else
			{
				avion.setH(new_cap);
			}
		}
		
	}

	// Enfin, on calcule les nouvelles coordonnées
	avion.setX(avion.getX()+speed*Math.sin(avion.getH()*Math.PI/180));
	avion.setY(avion.getY()-speed*Math.cos(avion.getH()*Math.PI/180));

	xB = avion.getX();
	yB = avion.getY();

	//console.debug("Ancien cap : "+currentHead+", Cap + 1 seconde : "+avion.getH()+", Cap visé : "+targetHead+", Position initiale (A) : X = "+xA+", Y = "+yA+", Position + 1 seconde (B) : X = "+xB+", Y = "+yB);
	// On vérifie le décalage


}

function calculateOrigin(R,xA,yA,currentHead,type,speed,sensVirage){

	var headOrthogonal = null, alpha = null, x0 = null, y0 = null; 
	
	
	if(sensVirage == 0){
		// On va à gauche
		headOrthogonal = mod((currentHead-90),360)+1;
		alpha = mod((90-headOrthogonal),360)+1;
		x0 = R*Math.cos(alpha*Math.PI/180);
		y0 = -R*Math.sin(alpha*Math.PI/180);
	}
	else
	{
		// On va à droite
		headOrthogonal = mod((currentHead+90),360)+1;
		alpha = mod((90+headOrthogonal),360)+1;
		x0 = R*Math.cos(alpha*Math.PI/180);
		y0 = R*Math.sin(alpha*Math.PI/180);
	}

	return new Point(parseInt(xA+x0),parseInt(yA+y0));

}

// Permet de calculer le cap suivant deux points, A et B sont deux objets de type "Point"
function calculateOrientation(A,B){
	var xA = A.getX(), xB = B.getX(), yA = A.getY(), yB = B.getY(), cadran = -1, rayon = -1, angle = -1;
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

// Permet de déterminer la meilleure manière d'atteindre le cap visé. Renvoie 0 si gauche, 1 si droite et -1 en cas d'erreur
function calculateBetterWayToReachTargetHead(avion){
	var betterWay = -1, currentHead = avion.getH(), targetHead = avion.getHTarget();
	if (currentHead != targetHead){

		if (currentHead <= 180 && targetHead <= 180){
			if (targetHead>currentHead){
				betterWay = 1;
			}
			else
			{
				betterWay = 0;
			}
		}
		else if (currentHead > 180 && targetHead > 180){
			if (targetHead>currentHead){
				betterWay = 1;
			}
			else
			{
				betterWay = 0;
			}
		}
		else if (currentHead >= 180 && targetHead < 180){
			if (Math.abs(targetHead-currentHead) < 180){
				betterWay = 0;
			}
			else
			{
				betterWay = 1;
			}
		}
		else if (currentHead < 180 && targetHead >= 180){
			if (Math.abs(targetHead-currentHead) <= 180){
				betterWay = 1;
			}
			else
			{
				betterWay = 0;
			}
		}

	}

	return betterWay;
}


function mod(m,n) {
        return ((m % n) + n) % n;
}