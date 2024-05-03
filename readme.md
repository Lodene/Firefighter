# Projet de Simulation et Réalité pour la Gestion d'Incendies
## Résumé du projet
Ce projet vise à développer un système hybride combinant simulation et opérations réelles pour la gestion des incendies. Le système est divisé en deux grandes parties : le côté "Réel" et le côté "Simulation".

### Côté Réel
Dans la partie réelle, le système attribue des incendies actifs aux véhicules de pompiers pour intervention. Cette section gère également la transmission des coordonnées GPS et des positions des véhicules aux éléments de simulation, afin de reproduire fidèlement les parcours dans l'environnement simulé. Les interactions réelles comprennent la réception de données des capteurs, l'envoi de ces données via une API pour mise à jour dans la base de données, et l'utilisation de ces informations pour diriger les efforts des équipes d'intervention.

### Côté Simulation
Le côté simulation est responsable de la génération des données d'incendie, qui sont ensuite envoyées à l'API. Le flux de données commence par la génération de feux simulés, qui sont récupérés via une requête GET par un script Python. Ces données sont transmises à un faux capteur sur une carte Raspberry, puis à une autre carte Raspberry via RF. Les données sont finalement renvoyées au script Python, qui interagit avec l'API côté réel pour mettre à jour la base de données. L'Emergency Manager récupère ensuite les données des incendies pour assigner les feux aux camions de pompiers disponibles et les plus proches.

## Structure des dossiers
**Simulator**: Contient tout le nécessaire pour la simulation des incendies, la récupération et l'envoi des données de feux.
**Reel**: Gère les interactions réelles, y compris le traitement des données reçues des capteurs et la communication avec l'API pour l'assignation des feux aux équipes de pompiers.

## Technologies utilisées
**Python** : Scripting pour la récupération et l'envoi des données.
**APIs Next.js** : Interfaces pour la communication entre les différents composants du système (Appli web simu & emergency).
**Raspberry Pi** : Utilisé pour simuler des capteurs dans le processus de transmission des données (RF1 & RF2).
**Java** : Utilisé dans l'Emergency Manager & Simulator pour la logique de récupération périodique des données.