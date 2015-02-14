/*********************************************************************************************


Contient les classes d'objets de type :
- Interface
- Control Panel
- Texts


********************************************************************************************/


// Permet de construire un objet de type : Avion
// Les attributs/méthodes privés sont les attributs/méthodes commençant par "var ....", les attributs/méthodes public sont les attributs/méthodes commençant par "this ..."
function Interface(backgroundImage,backgroundX,backgroundY,maxTime,performancesTable,scale,windOption,normVerticalSeparation,normHorizontalSeparation,normDistanceToZone,tolerance,normLineSeparation,tempo,turnDirectionRequired,zoomScale,controlPanel,texts)
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
	var controlPanel = controlPanel;
	var texts = texts;

	// Getters d'attributs privés

	this.getBackgroundImage = function(){ return backgroundImage;}
	this.getBackgroundX = function(){ return backgroundX;}
	this.getBackgroundY = function(){ return backgroundY;}
	this.getMaxTime = function(){ return maxTime;}
	this.getPerformancesTable = function(){ return performancesTable;}
	this.getScale = function(){ return scale;}
	this.getWindOption = function(){ return windOption;}
	this.getNormVerticalSeparation = function(){ return normVerticalSeparation;}
	this.getNormHorizontalSeparation = function(){ return normHorizontalSeparation;}
	this.getNormDistanceToZone = function(){ return normDistanceToZone;}
	this.getTolerance = function(){ return tolerance;}
	this.getNormLineSeparation = function(){ return normLineSeparation;}
	this.getTemp = function(){ return tempo;}
	this.getTurnDirectionRequired = function(){ return turnDirectionRequired;}
	this.getZoomScale = function(){ return zoomScale;}
	this.getControlPanel = function(){ return controlPanel;}
	this.getTexts = function(){ return texts;}


}

// Permet de construire un objet du type "ControlPanel"
function ControlPanel(hControl,vControl,rateControl,zControl,directPointControl,waitingControl,tempoControl){

	// Attributs public
	this.type = "ControlPanel";

	// Attributs privés
	var hControl = hControl;
	var vControl = vControl;
	var rateControl = rateControl;
	var zControl = zControl;
	var directPointControl = directPointControl;
	var waitingControl = waitingControl;
	var tempoControl = tempoControl;

	// Getters d'attributs privés
	this.isHControl = function(){ return hControl;}
	this.isVControl = function(){ return vControl;}
	this.isRateControl = function(){ return rateControl;}
	this.isZControl = function(){ return zControl;}
	this.isDirectPointControl = function(){ return directPointControl;}
	this.isWaitingControl = function(){ return waitingControl;}
	this.isTempoControl = function(){ return tempoControl;}

}


// Permet de construire un objet du type "Texts"
function Texts(tabTextIntro,tabTextEnd,tabTextHelp){

	// Remarque : ce sont des tableaux vus comme des "map", il suffit d'avoir la clé (code de la langue) pour obtenir le texte (Exemple : tabTextIntro[FR] = ....)
	// Attributs privés
	var tabTextIntro = tabTextIntro;
	var tabTextEnd = tabTextEnd;
	var tabTextHelp = tabTextHelp;

	// Getters d'attributs privés
	this.getTabTextIntro = function(){ return tabTextIntro;}
	this.getTabTextEnd = function(){ return tabTextEnd;}
	this.getTabTextHelp = function(){ return tabTextHelp;}

}