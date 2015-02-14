/*********************************************************************************************


Contient les classes d'objets de type :
- Interface
- Control Panel
- Texts


********************************************************************************************/


// Permet de construire un objet de type : Avion
// Les attributs/méthodes privés sont les attributs/méthodes commençant par "var ....", les attributs/méthodes public sont les attributs/méthodes commençant par "this ..."
function Interface(backgroundImage,backgroundX,backgroundY,maxTime,performancesTable,scale,windOption,normVerticalSeparation,normHorizontalSeparation,normDistanceToZone,tolerance,normLineSeparation,tempo,turnDirectionRequired,zoomScale,controlPanel,Texts)
{
	// Attribut statique, sa méthode statique associée est définie à la suite de ce constructeur (à part)

	// Attributs public
	this.type = "Interface";

	// Attributs privés
	var backgroundImage = backgroundImage;
	var backgroundX = backgroundX;
	var backgroundY = backgroundY;
	var maxTime = maxTime;
	var performancesTable = performancesTable;
	var scale = scale;
	var windOption = windOption;
	var normVerticalSeparation = normVerticalSeparation;
	var normHorizontalSeparation = normHorizontalSeparation;
	var normDistanceToZone = normDistanceToZone;
	var tolerance = tolerance;
	var normLineSeparation = normLineSeparation;
	var tempo = tempo;
	var turnDirectionRequired = turnDirectionRequired;
	var zoomScale = zoomScale;

	// Getters d'attributs privés


}