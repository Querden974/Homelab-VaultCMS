---
title: "Présentation"
description: "Présentation de CrowdSec"
sidebar:
  order: 10
---

## Qu'est-ce que CrowdSec ?

CrowdSec est un moteur de sécurité open source et collaboratif. Il analyse les journaux (logs) des services exposés pour détecter des comportements malveillants (tentatives de brute force, scans, exploitation de failles...), puis bloque les adresses IP identifiées comme menaces via des « bouncers ». CrowdSec s'appuie également sur une base de réputation d'IP alimentée par l'ensemble de sa communauté d'utilisateurs.

## Rôle dans mon homelab

CrowdSec protège les services que j'expose sur Internet en détectant et en bloquant automatiquement les comportements suspects, sans que j'aie à surveiller les logs manuellement. En bénéficiant de la base de menaces partagée par la communauté, mon infrastructure profite aussi de la détection d'IP malveillantes signalées par d'autres utilisateurs à travers le monde.

## Fonctionnalités clés

- Analyse comportementale des logs pour détecter les attaques
- Blocage automatique des IP malveillantes via des bouncers (pare-feu, Traefik, Nginx...)
- Base de réputation d'IP partagée par la communauté CrowdSec
- Scénarios de détection préconfigurés et personnalisables
- Tableau de bord de suivi des alertes et des IP bloquées