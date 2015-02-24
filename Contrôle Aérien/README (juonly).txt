Modèle de données -> Créer les classes en .js


Prochain créneau projet tutoré = RDV 


Prochaine fois : Conception du jeu :
 
-> Règles (setInterval)
 
-> Fonctionnalités (gérer par des listeners)
  
-> Mouvements/Evènements par défaut

  

(ju)
dans la f init : 
setinterval pour verifier que le nb de chargements (fonction testchargement) 
(nous: fichiers xml) en cours: si nulle: on peut tout lancer -> init2 // var 
statique ou globale: nbchargements à incrementer et decrementer
  rappel: window.onload 
(ju)


  

Il faut avoir une définition d'objet comportant :
  
- Attributs privés (exemple : xInit etc....)
  
- Getters/Setters
  
- Attributs statiques (exemple : nombreAvion, listeAvions...)
  
  -> Du coup méthodes statiques !
  
- Méthodes


Classes javascript:
http://t-templier.developpez.com/tutoriel/javascript/javascript-poo1/


Conception:

Chargement, lancement : OK
Etat initial (regles = quand le joueur ne fait rien):
	Table des performances: en fonction d'un avion donné: ce qu'il est capable de faire (autre fichier : fichier des perfos à loader aussi .txt)
	Donner un délai à un avion (partir après 10s par ex)
	5 positions passées
	Etiquette radar: 2 lignes : nom, vitesse courante, altitude courante et cible. A Afficher sur le canvas. 
	A chq instant : fonctions de test : entre avion et zone obstacle // entre avion et zone de fin de jeu // pour vérifier les distances 
		horizontales entre avions, puis si oui test de vérification verticale ==> modification de la couleur des 2 avions
	Temps de jeu enregistré
	Nombre d'évènements de type AirProc : Lorsque 2 avions se rapprochent, changent de couleur, s'éloignent, rechangent de couleur
	Test temps limite

=> Attribut couleur, X3, X4, H = Head = Cap
	
Fonctionnalités
	Bouton pause : arret du jeu, play: reprise, stop: fin de jeu
	Clic avion: affichage infos de l'avion : panneau propriétés: (JYP: objet controlInterface), rafraichissement dès mises à jour
		+ on affiche sa route en couleur (ce qui lui reste a faire: en lineaire entre les target points)
		+ indiquer le focus sur l'avion (focus qui disparait sur les autres) : couleur, taille ==> a voir
	(avion supposé toujours controllable)
	Propriétés: modification cap: XBox now : a faire : cercle à cliquer + case a cocher : virage a droite ou a gauche (ou par défaut ) : 
		precision du joueur. Il existe aussi un réglage qui calcule le virage le plus court : peut etre un reglage a cocher
	Lors de modification de la part du joueur : vérification ordre transmis: popup ou petite ligne en bas ==> a voir
	Changement du facteur d'accélération (du jeu)

Déplacement avion : en fonction de sa table de performance : description précise dans le document

Rafraichissement : toutes les 10s

Vent : on ne fait pas

Virage de l'avion : rayon de virage

déplacement à h constant : sur le document

Zone : alteration à definir?
EndGameTarget (= zone) : ligne (voir xml)
fond du jeu : possible d'importer une image dans le canvas : puis dessiner dessus

Si collision?
Définir le nombre d'AirProc autorisé
Lors d'un airproc : popup

Target point : mettre le nom de l'étiquette

Calcul rayon de virage ds le doc

En fonction de l'échelle de la carte, les x et y...

Dossier : a la place du dossier xml: dossier import ou ..

Fichier performances:
type : avion
inclinaison, inclinaison max et cassure : on n'en fait rien

Attribut: cap courant et cap voulu


17/03 à 15h30 : point



fonctions tests : PHU THANH
(décrites un peu au dessus et dans le document)

Déplacement de l'avion JULIEC
déplacement usuel

Changements avions ALEX
+ récupère fichier perfo
calcul nouvelles positions

Barre latérale : click avion maj donnees etc  JULIER
barre
deslectionner avion click ou bouton
vitesse jeu blabla
img fond canvas



