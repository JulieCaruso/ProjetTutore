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
	if( typeof Interface.initialized == "undefined" ) { 

        Interface.prototype.getBackgroundImage = function() { 
            return backgroundImage;
        };

        Interface.prototype.getBackgroundX = function() { 
            return backgroundX;
        };

        Interface.prototype.getBackgroundY = function() { 
            return backgroundY;
        };

        Interface.prototype.getMaxTime = function() { 
            return maxTime;
        };

        Interface.prototype.getPerformancesTable = function() { 
            return performancesTable;
        };

        Interface.prototype.getScale = function() { 
            return scale;
        };

        Interface.prototype.getWindOption = function() { 
            return windOption;
        };

        Interface.prototype.getNormHorizontalSeparation = function() { 
            return normHorizontalSeparation;
        };

        Interface.prototype.getNormVerticalSeparation = function() { 
            return normVerticalSeparation;
        };

        Interface.prototype.getNormDistanceToZone = function() { 
            return normDistanceToZone;
        };

        Interface.prototype.getTolerance = function() { 
            return tolerance;
        };

        Interface.prototype.getNormLineSeparation = function() { 
            return normLineSeparation;
        };

        Interface.prototype.getTempo= function() { 
            return tempo;
        };

        Interface.prototype.getTurnDirectionRequired = function() { 
            return turnDirectionRequired;
        };

        Interface.prototype.getZoomScale = function() { 
            return zoomScale;
        };

        Interface.prototype.getControlPanel = function() { 
            return controlPanel;
        };

        Interface.prototype.getTexts = function() { 
            return texts;
        };

        Interface.initialized = true; 
    }

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
	if( typeof ControlPanel.initialized == "undefined" ) { 

        ControlPanel.prototype.isHControl = function() { 
            return hControl;
        };

        ControlPanel.prototype.isVControl = function() { 
            return vControl;
        };

        ControlPanel.prototype.isRateControl = function() { 
            return rateControl;
        };

        ControlPanel.prototype.isZControl = function() { 
            return zControl;
        };

        ControlPanel.prototype.isDirectPointControl = function() { 
            return directPointControl;
        };

        ControlPanel.prototype.isWaitingControl = function() { 
            return waitingControl;
        };

        ControlPanel.prototype.isTempoControl = function() { 
            return tempoControl;
        };

        ControlPanel.initialized = true; 
    }

}


// Permet de construire un objet du type "Texts"
function Texts(tabTextIntro,tabTextEnd,tabTextHelp){

	// Remarque : ce sont des tableaux vus comme des "map", il suffit d'avoir la clé (code de la langue) pour obtenir le texte (Exemple : tabTextIntro[FR] = ....)
	// Attributs privés
	var tabTextIntro = tabTextIntro;
	var tabTextEnd = tabTextEnd;
	var tabTextHelp = tabTextHelp;

	// Getters d'attributs privés
	if( typeof Texts.initialized == "undefined" ) { 

        Texts.prototype.getTabTextIntro = function() { 
            return tabTextIntro;
        };

        Texts.prototype.getTabTextEnd = function() { 
            return tabTextEnd;
        };

        Texts.prototype.getTabTextHelp = function() { 
            return tabTextHelp;
        };

        Texts.initialized = true; 
    }

}