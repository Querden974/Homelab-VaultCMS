---
title: Présentation
description: Présentation de Grafana
sidebar:
  order: 0
draft: true
---

## Qu'est-ce que Grafana ?

Grafana est une plateforme open source de visualisation et d'analyse de données. Elle permet de créer des tableaux de bord interactifs en interrogeant de multiples sources de données (Prometheus, Loki, InfluxDB, bases SQL...) et d'en afficher les résultats sous forme de graphiques, jauges, tables ou alertes.

## Rôle dans mon homelab

Grafana est la porte d'entrée visuelle de toute ma stack de supervision. Il centralise l'affichage des métriques collectées par Prometheus et des logs agrégés par Loki, le tout dans des dashboards unifiés. C'est l'outil que je consulte au quotidien pour avoir une vue d'ensemble de l'état de santé de mon infrastructure et diagnostiquer rapidement un incident.

## Fonctionnalités clés

- Dashboards personnalisables et interactifs
- Prise en charge native de multiples sources de données (Prometheus, Loki, etc.)
- Système d'alerting configurable
- Gestion des utilisateurs et des permissions
- Large bibliothèque de dashboards communautaires prêts à l'emploi
