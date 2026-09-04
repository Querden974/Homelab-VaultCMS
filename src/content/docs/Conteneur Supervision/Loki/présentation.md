---
title: "Présentation"
description: "Présentation de Loki"
---

## Qu'est-ce que Loki ?

Loki est un système d'agrégation de logs développé par Grafana Labs. Contrairement aux solutions classiques comme Elasticsearch, il n'indexe pas le contenu complet des logs mais uniquement leurs métadonnées (labels), ce qui le rend beaucoup plus léger à faire tourner et à stocker.

## Rôle dans mon homelab

Loki centralise les logs de l'ensemble de mes conteneurs et services. Il reçoit les flux collectés par Alloy et les rend consultables et corrélables directement dans Grafana, aux côtés des métriques Prometheus. Cela me permet de retrouver rapidement les logs pertinents lors du diagnostic d'un problème, sans avoir à me connecter à chaque conteneur individuellement.

## Fonctionnalités clés

- Indexation par labels uniquement, faible coût en ressources et stockage
- Langage de requête LogQL, proche de PromQL
- Intégration native avec Grafana pour la visualisation
- Compatible avec les agents de collecte OpenTelemetry (Alloy, Promtail)
- Corrélation facile entre logs et métriques
