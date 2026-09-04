---
title: "Présentation"
description: "Présentation de Traefik"
---

## Qu'est-ce que Traefik ?

Traefik est un reverse proxy et load balancer moderne, conçu pour s'intégrer nativement avec des environnements conteneurisés. Il découvre automatiquement les services à exposer grâce aux labels Docker, sans nécessiter de configuration manuelle à chaque nouveau déploiement.

## Rôle dans mon homelab

Traefik est le point d'entrée unique de tout mon trafic HTTP/HTTPS. Il redirige chaque requête entrante vers le bon conteneur en fonction du nom de domaine demandé, et gère automatiquement la génération et le renouvellement des certificats SSL via Let's Encrypt. Cela m'évite de devoir ouvrir et gérer manuellement un port différent pour chaque application.

## Fonctionnalités clés

- Découverte automatique des services via les labels Docker
- Génération et renouvellement automatique des certificats HTTPS (Let's Encrypt)
- Routage basé sur le nom de domaine ou le chemin d'URL
- Tableau de bord de supervision des routes et services actifs
- Intégration avec CrowdSec et Authentik pour la sécurité et l'authentification