---
title: "Présentation"
description: "Présentation de Traefik Manager"
sidebar:
  order: 20
---

## Qu'est-ce que Traefik Manager ?

Traefik Manager est une interface web open source permettant de piloter une instance Traefik sans passer uniquement par des fichiers de configuration ou des labels Docker. Elle offre un tableau de bord pour visualiser et modifier la configuration dynamique de Traefik, gérer les certificats et redémarrer le service.

## Rôle dans mon homelab

Traefik Manager me permet de créer et modifier des routes ou des middlewares directement depuis une interface graphique, sans avoir à éditer manuellement les fichiers YAML de configuration dynamique à chaque changement. Il communique avec Docker via un `docker-socket-proxy` dédié, dont les permissions sont réduites au strict minimum, ce qui évite d'exposer le socket Docker directement à cette interface.

## Fonctionnalités clés

- Édition de la configuration dynamique de Traefik depuis une interface web
- Redémarrage de Traefik piloté depuis l'interface, via un socket-proxy à permissions restreintes
- Visualisation de l'état des certificats gérés par Traefik
- Sauvegarde de la configuration (`./backup`)
