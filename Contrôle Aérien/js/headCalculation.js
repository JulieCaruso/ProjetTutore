/*


Ensemble des méthodes permettant de calculer la variation de cap à effectuer pour atteindre un cap cible à partir d'un cap actuel



"Current head = 310, Type = B763, Spead = 451, Sens du virage = 0" headCalculation.js:15:1
"X0 = -8391.87895645981" headCalculation.js:16:0
"Y0 = 10001.051894976727" headCalculation.js:17:1


*/

// Méthode d'entrée pour le calcul d'un nouveau cap, on y fournit l'objet de type "Avion" ainsi que le sens de virage (0 si par la gauche, 1 si par la droite)
function calculateHead(avion,sensVirage){
	var type = avion.getTypeOfPlane(), currentHead = avion.getH(), targetHead = avion.getHTarget(), spead = parseInt(avion.getV()), xA = avion.getX(), yA = avion.getY(), inclinaison = Avion.getPerformancesPerType()[type]["inclinaisonMax"], R = 0;

	// spead en mètres/seconde, R en mètres 
	R = parseInt((spead*spead)/(Math.tan(inclinaison)*9.81));

	var point = calculateOrigin(R,xA,yA,currentHead,type,spead,sensVirage);

	console.debug("Current head = "+currentHead+", Type = "+type+", Spead = "+spead+", Sens du virage = "+sensVirage);
	console.debug("X0 = "+point.getX());
	console.debug("Y0 = "+point.getY());

	// On multiplie la distance en m/s par deltaT = 1 seconde
	var distanceAB = parseInt(spead*1);

	// On en déduit delta
	var delta = Math.acos(distanceAB/(2*R));
	
	console.debug("Delta = "+delta);
	// Et donc deltaH
	var deltaH = Math.PI/2 - delta*Math.PI/180;
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

	console.debug("Ancien cap : "+currentHead+", Cap + 1 seconde : "+avion.getH()+", Cap visé : "+targetHead);
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