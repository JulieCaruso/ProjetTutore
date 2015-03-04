/*********************************************************************************************


Contient les classes d'objets de type :
- Ordre
- Enumération des changements possibles

Lien permettant d'obtenir une idée des vrais dialogues venant d'une tour de contrôle : http://atcwiki.jonckers.org/index.php?n=Basic.AreaControl



********************************************************************************************/

// Permet de construire un objet de type Ordre, changements un objet de type tableau d'objet CHANGEMENT
function Ordre(avion,changements){
	// Attribut statique, sa méthode statique associée est définie à la suite de ce constructeur (à part)
	

	// Attributs public
	this.type = "Ordre";

	// Attributs privés
	var message = "";
	var changements = changements;

	// Getters d'attributs privés

	if( typeof Ordre.initialized == "undefined" ) { 

		Ordre.prototype.getMessage = function() { return message;}

		Ordre.prototype.getTabChangements = function() { return changements;}
        

        Ordre.initialized = true; 
    }

    // Permet de définir quelles modifications ont été faites et seront à afficher dans le message
    Ordre.prototype.processShowChangements = function() {
		message = "<br /><b>"+avion.getNameOfPlane()+"</b>";
		var changement = -1, choice = -1;
		// On observe tous les changements dans le tableau, c'est ici que l'on détaille ici toutes les possiblités
		for(var i = 0; i < changements.length; i++){

			changement = changements[i];

			switch(changement){
				case(Ordre.Changement.INCREASE_SPEED):
					choice = randomChoice(2);
					switch(choice){
						case(1):
							message += ", increase speed to <font color=\"red\">"+avion.getVTarget()+"</font> knots"
						break;
						case(2):
							message += ", raise your speed to <font color=\"red\">"+avion.getVTarget()+"</font> knots"
						break;
					}
					break;
				case(Ordre.Changement.DECREASE_SPEED):
					choice = randomChoice(2);
					switch(choice){
						case(1):
							message += ", reduce speed to <font color=\"red\">"+avion.getVTarget()+"</font> knots"
						break;
						case(2):
							message += ", decrease speed to <font color=\"red\">"+avion.getVTarget()+"</font> knots"
						break;
					}
					break;
				case(Ordre.Changement.INCREASE_ALTITUDE):
					choice = randomChoice(4);
					switch(choice){
						case(1):
							message += ", climb to <font color=\"red\">FL "+avion.getZTarget()+"</font>"
						break;
						case(2):
							message += ", climb immediately to <font color=\"red\">FL "+avion.getZTarget()+"</font>"
						break;
						case(3):
							message += ", ascend to <font color=\"red\">FL "+avion.getZTarget()+"</font>"
						break;
						case(4):
							message += ", go up to <font color=\"red\">FL "+avion.getZTarget()+"</font>"
						break;
					}
					
					break;
				case(Ordre.Changement.DECREASE_ALTITUDE):
					choice = randomChoice(4);
					switch(choice){
						case(1):
							message += ", descend to <font color=\"red\">FL "+avion.getZTarget()+"</font>"
						break;
						case(2):
							message += ", descend immediately to <font color=\"red\">FL "+avion.getZTarget()+"</font>"
						break;
						case(3):
							message += ", go down to <font color=\"red\">FL "+avion.getZTarget()+"</font>"
						break;
						case(4):
							message += ", come down to <font color=\"red\">FL "+avion.getZTarget()+"</font>"
						break;
					}
					break;
				case(Ordre.Changement.CHANGE_HEAD_BETTER_WAY):
					var betterWay = calculateBetterWayToReachTargetHead(avion);
					if (betterWay == 0){
						changement = Ordre.Changement.CHANGE_HEAD_BY_LEFT;
					}
					else if (betterWay == 1 ){
						changement = Ordre.Changement.CHANGE_HEAD_BY_RIGHT;
					}
					else
					{
						console.debug("[Erreur] Impossible de trouver la meilleure direction pour atteindre le cap visé");
					}
				case(Ordre.Changement.CHANGE_HEAD_BY_LEFT):
					if (changement == Ordre.Changement.CHANGE_HEAD_BY_LEFT){
						choice = randomChoice(2);
						switch(choice){
							case(1):
								message += ", <font color=\"red\">turn left</font> heading <font color=\"red\">"+(avion.getHTarget()<100?"0"+avion.getHTarget():avion.getHTarget())+"</font>";
							break;
							case(2):
								message += ", <font color=\"red\">turn left "+(avion.getHTarget()<100?"0"+avion.getHTarget():avion.getHTarget())+"</font> degrees";
							break;
						}
						break;
					}
				case(Ordre.Changement.CHANGE_HEAD_BY_RIGHT):
						choice = randomChoice(2);
						switch(choice){
							case(1):
								message += ", <font color=\"red\">turn right</font> heading <font color=\"red\">"+(avion.getHTarget()<100?"0"+avion.getHTarget():avion.getHTarget())+"</font>";
							break;
							case(2):
								message += ", <font color=\"red\">turn right "+(avion.getHTarget()<100?"0"+avion.getHTarget():avion.getHTarget())+"</font> degrees";
							break;
						}
					break;
				case(Ordre.Changement.STORM_ZONE_ENTRY_WARNING):

					break;
				case(Ordre.Changement.STORM_ZONE_LEAVING):

					break;
				case(Ordre.Changement.LEAVE_CONTROL_ZONE):

					break;
				default:
					console.debug("[Erreur] Un ordre de changement inconnu a été passé : "+changement);
					break;
			}

		}

	}

    // Permet d'ajouter le message à la zone d'ordres envoyés
	var showOrder = (function(ordre){ var messages = document.getElementById('zoneOrdres').textContent; ordre.processShowChangements(); $('#zoneOrdres').html(messages+message);})(this);

	
}

Ordre.Changement = {
    INCREASE_SPEED : 0,
    DECREASE_SPEED : 1,
    INCREASE_ALTITUDE : 2,
    DECREASE_ALTITUDE : 3,
    CHANGE_HEAD_BETTER_WAY : 4,
    CHANGE_HEAD_BY_LEFT : 5,
    CHANGE_HEAD_BY_RIGHT : 6,
    STORM_ZONE_ENTRY_WARNING : 7,
    STORM_ZONE_LEAVING : 8,
    LEAVE_CONTROL_ZONE : 9

}

// Permet d'obtenir un choix aléatoire en passant le nombre de choix en paramètres (utile pour rendre plus vivant les logs des ordres)
function randomChoice(numberOfChoices){
	return parseInt((Math.random()*10000000))%numberOfChoices+1;
}