/*


Ensemble des méthodes permettant de calculer la variation de cap à effectuer pour atteindre un cap cible à partir d'un cap actuel



"Current head = 310, Type = B763, speed = 451, Sens du virage = 0" headCalculation.js:15:1
"X0 = -8391.87895645981" headCalculation.js:16:0
"Y0 = 10001.051894976727" headCalculation.js:17:1


*/

// Permet de calculer un modulo car celui de javascript ne marche pas
function mod(m,n) {
        return ((m % n) + n) % n;
}

function updateHeadToTargetPoint(avion){
	var t = avion.getIndexCurrentTarget();
	var xA = avion.getX()*scale;
	var yA = avion.getY()*scale;
	var pA = new Point(xA, yA);
	var xT = avion.getListOfTargetPoints()[t].getX()*scale;
	var yT = avion.getListOfTargetPoints()[t].getY()*scale;
	var pT = new Point(xT, yT);
	avion.setHTarget(calculateOrientation(pA, pT));
}

// Méthode d'entrée pour le calcul d'un nouveau cap, on y fournit l'objet de type "Avion" ainsi que le sens de virage (0 si par la gauche, 1 si par la droite)
function calculateHead(avion,sensVirage){
	// speed est en noeuds = 1 MN / h avec 1 MN = 1852 m
	var type = avion.getTypeOfPlane(), currentHead = parseFloat(avion.getH()), targetHead = avion.getHTarget(), speed = parseInt(avion.getV()*60/1852), xA = avion.getX(), yA = avion.getY(), inclinaison = Avion.getPerformancesPerType()[type]["inclinaisonMax"], R = 0;

	var point = null, distanceAB = 0, delta = 0, xB = 0, yB = 0;

	// speed en mètres/seconde, R en mètres 
	R = (speed*speed)/(Math.tan(inclinaison*Math.PI/180)*9.81);

	// On multiplie la distance en m/s par deltaT = 1 seconde
	distanceAB = speed*1;

	// On en déduit delta
	delta = (Math.acos(distanceAB/(2*R)))*180/Math.PI;
	
	// Et donc deltaH
	deltaH = parseFloat(mod((90-delta),360)+1);
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
		// On va par la droite en augmentant (ex : on va de 90° à 180°)
		if (currentHead < targetHead){

			if(currentHead+deltaH > targetHead)
			{
                
				avion.setH(targetHead);
			}
			else
			{	avion.setH(mod((parseInt(currentHead)+parseInt(deltaH)),360)+1);
			}
		}
		else
		{
			// On va par la droite mais avec un cap visé plus petit que le cap actuel (ex : on va de 310° à 90°)
			var new_cap = mod((parseFloat(currentHead)+parseFloat(deltaH)),360)+1; 
            console.debug("TOTOTOTOTOTOTOTOTOTOTTO"+" "+new_cap);
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


	console.debug("Ancien cap : "+currentHead+", Cap + 1 seconde : "+parseInt(avion.getH())+", Cap visé : "+targetHead);


}

function calculateXY(avion){
	var speed = parseInt(avion.getV()*60/1852);
	avion.setX(avion.getX()+speed*Math.sin(avion.getH()*Math.PI/180));
	avion.setY(avion.getY()-speed*Math.cos(avion.getH()*Math.PI/180));
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
    
	return parseInt(mod(angle*180/Math.PI+cadran,360) + 1);
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

// Permet de calculer la vitesse d'un avion progressivement
function calculateSpeed(avion){
	var vCurrent = avion.getV(), vTarget = avion.getVTarget(), vCalculate = -1;

	if (vCurrent < vTarget){
		vCalculate = vCurrent * 1.02;
		if (vCalculate > vTarget)
		{
			vCalculate = vTarget;
		}
	}
	else
	{
		vCalculate = vCurrent * 0.98;
		if (vCalculate < vTarget)
		{
			vCalculate = vTarget;
		}
	}
	console.debug(vCalculate);
	avion.setV(parseInt(vCalculate));

}

// Permet de calculer l'altitude d'un avion progressivement
function calculateAltitude(avion){
	var zCurrent = avion.getZ(), zTarget = avion.getZTarget(), zCalculate = -1;

	if (zCurrent < zTarget){
		zCalculate = zCurrent * 1.02;
		if (zCalculate > zTarget)
		{
			zCalculate = zTarget;
		}
	}
	else
	{
		zCalculate = zCurrent * 0.98;
		if (zCalculate < zTarget)
		{
			zCalculate = zTarget;
		}
	}

	avion.setZ(parseInt(zCalculate));

}