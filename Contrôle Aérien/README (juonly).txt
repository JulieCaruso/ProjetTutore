Mod�le de donn�es -> Cr�er les classes en .js


Prochain cr�neau projet tutor� = RDV 


Prochaine fois : Conception du jeu :
 
-> R�gles (setInterval)
 
-> Fonctionnalit�s (g�rer par des listeners)
  
-> Mouvements/Ev�nements par d�faut

  

(ju)
dans la f init : 
setinterval pour verifier que le nb de chargements (fonction testchargement) 
(nous: fichiers xml) en cours: si nulle: on peut tout lancer -> init2 // var 
statique ou globale: nbchargements � incrementer et decrementer
  rappel: window.onload 
(ju)


  

Il faut avoir une d�finition d'objet comportant :
  
- Attributs priv�s (exemple : xInit etc....)
  
- Getters/Setters
  
- Attributs statiques (exemple : nombreAvion, listeAvions...)
  
  -> Du coup m�thodes statiques !
  
- M�thodes


Classes javascript:
http://t-templier.developpez.com/tutoriel/javascript/javascript-poo1/


Conception:

Chargement, lancement : OK
Etat initial (regles = quand le joueur ne fait rien):
	Table des performances: en fonction d'un avion donn�: ce qu'il est capable de faire (autre fichier : fichier des perfos � loader aussi .txt)
	Donner un d�lai � un avion (partir apr�s 10s par ex)
	5 positions pass�es
	Etiquette radar: 2 lignes : nom, vitesse courante, altitude courante et cible. A Afficher sur le canvas. 
	A chq instant : fonctions de test : entre avion et zone obstacle // entre avion et zone de fin de jeu // pour v�rifier les distances 
		horizontales entre avions, puis si oui test de v�rification verticale ==> modification de la couleur des 2 avions
	Temps de jeu enregistr�
	Nombre d'�v�nements de type AirProc : Lorsque 2 avions se rapprochent, changent de couleur, s'�loignent, rechangent de couleur
	Test temps limite

=> Attribut couleur, X3, X4, H = Head = Cap
	
Fonctionnalit�s
	Bouton pause : arret du jeu, play: reprise, stop: fin de jeu
	Clic avion: affichage infos de l'avion : panneau propri�t�s: (JYP: objet controlInterface), rafraichissement d�s mises � jour
		+ on affiche sa route en couleur (ce qui lui reste a faire: en lineaire entre les target points)
		+ indiquer le focus sur l'avion (focus qui disparait sur les autres) : couleur, taille ==> a voir
	(avion suppos� toujours controllable)
	Propri�t�s: modification cap: XBox now : a faire : cercle � cliquer + case a cocher : virage a droite ou a gauche (ou par d�faut ) : 
		precision du joueur. Il existe aussi un r�glage qui calcule le virage le plus court : peut etre un reglage a cocher
	Lors de modification de la part du joueur : v�rification ordre transmis: popup ou petite ligne en bas ==> a voir
	Changement du facteur d'acc�l�ration (du jeu)

D�placement avion : en fonction de sa table de performance : description pr�cise dans le document

Rafraichissement : toutes les 10s

Vent : on ne fait pas

Virage de l'avion : rayon de virage

d�placement � h constant : sur le document

Zone : alteration � definir?
EndGameTarget (= zone) : ligne (voir xml)
fond du jeu : possible d'importer une image dans le canvas : puis dessiner dessus

Si collision?
D�finir le nombre d'AirProc autoris�
Lors d'un airproc : popup

Target point : mettre le nom de l'�tiquette

Calcul rayon de virage ds le doc

En fonction de l'�chelle de la carte, les x et y...

Dossier : a la place du dossier xml: dossier import ou ..

Fichier performances:
type : avion
inclinaison, inclinaison max et cassure : on n'en fait rien

Attribut: cap courant et cap voulu


17/03 � 15h30 : point



fonctions tests : PHU THANH
(d�crites un peu au dessus et dans le document)

D�placement de l'avion JULIEC
d�placement usuel

Changements avions ALEX
+ r�cup�re fichier perfo
calcul nouvelles positions

Barre lat�rale : click avion maj donnees etc  JULIER
barre
deslectionner avion click ou bouton
vitesse jeu blabla
img fond canvas



