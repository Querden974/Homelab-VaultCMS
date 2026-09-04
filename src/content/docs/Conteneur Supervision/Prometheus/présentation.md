---
title: "Présentation"
description: "Présentation de Prometheus"
---

## Qu'est-ce que Prometheus ?

Prometheus est un système de monitoring et d'alerting open source, devenu la référence pour la collecte de métriques dans le monde du cloud natif. Il fonctionne selon un modèle "pull" : il interroge périodiquement des endpoints exposés par les services (`/metrics`) pour en récupérer les métriques.

## Rôle dans mon homelab

Prometheus est le socle de la collecte de métriques de mon infrastructure. Il scrape régulièrement les endpoints exposés par mes conteneurs et exporters (node-exporter, cAdvisor, etc.), stocke ces métriques dans sa base de données temporelle, puis les met à disposition de Grafana pour la visualisation et de son moteur d'alerting pour la détection d'anomalies.

## Fonctionnalités clés

- Modèle de collecte "pull" via scraping HTTP
- Base de données de séries temporelles optimisée
- Langage de requête PromQL puissant et flexible
- Service discovery automatique (Docker, Kubernetes...)
- Moteur d'alerting intégré (Alertmanager)
