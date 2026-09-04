---
title: "Présentation"
description: "Présentation de Grafana Alloy"
---

## Qu'est-ce qu'Alloy ?

Alloy est un collecteur de télémétrie développé par Grafana Labs, basé sur le standard OpenTelemetry. Il centralise la collecte de métriques, de logs, de traces et de profils applicatifs, puis les redirige vers les bons outils de stockage et de visualisation (Prometheus/Mimir, Loki, Tempo, Grafana...).

## Rôle dans mon homelab

Alloy me sert de point d'entrée unique pour toute l'observabilité de mon infrastructure. Plutôt que de déployer un agent différent pour chaque type de donnée (métriques, logs, traces), un seul pipeline Alloy collecte l'ensemble et l'achemine vers ma stack de supervision. Cela simplifie grandement la configuration et la maintenance de la collecte de données.

## Fonctionnalités clés

- Collecte unifiée des métriques, logs et traces
- Compatible avec le standard OpenTelemetry
- Configuration déclarative via un langage dédié (Alloy config)
- Intégration native avec l'écosystème Grafana (Loki, Mimir, Tempo)
- Faible empreinte en ressources, adapté à un usage homelab