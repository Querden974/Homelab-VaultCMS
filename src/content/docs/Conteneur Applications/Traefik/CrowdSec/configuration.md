---
title: Configuration
description: Configuration de Crowdsec
history:
  - configuration 1
sidebar:
  order: 11
---

## Docker Compose

```yaml
services:
  crowdsec:
    image: crowdsecurity/crowdsec:latest
    container_name: crowdsec
    restart: unless-stopped
    ports:
      - 127.0.0.1:8181:8080
      - 6060:6060

    expose:
      - 8080 # HTTP API pour bouncers
      - 7422
      - 6060
    volumes:
      # CrowdSec - Data et config
      - .crowdsec/data:/var/lib/crowdsec/data
      - .crowdsec/etc:/etc/crowdsec
      # Journaux à analyser
      - /var/log/auth.log:/var/log/auth.log:ro
      - /var/log/syslog:/var/log/syslog:ro
      - /home/<user>/traefik/logs:/var/log/traefik:ro
    environment:
      - GID=1000
      - COLLECTIONS=crowdsecurity/traefik crowdsecurity/http-cve crowdsecurity/base-http-scenarios crowdsecurity/sshd crowdsecurity/linux crowdsecurity/appsec-generic-rules crowdsecurity/appsec-virtual-patching crowdsecurity/appsec-crs
      - CUSTOM_HOSTNAME=Srv-Docker-Demo
    networks:
      - frontend

networks:
  frontend:
    external: true
```

## Ports exposés

| Port | Protocole | Rôle |
| ---- | --------- | ---- |
| `8181` (lié à `127.0.0.1`) | TCP | LAPI (Local API) CrowdSec — accessible uniquement depuis l'hôte, pour l'administration via `cscli` |
| `6060` | TCP | Métriques Prometheus |

En plus des ports publiés, trois ports sont exposés uniquement aux autres conteneurs du réseau `frontend` (`expose`, pas de publication vers l'hôte ni Internet) :

| Port interne | Rôle |
| ------------- | ---- |
| `8080` | API HTTP consultée par les bouncers (ex. le plugin CrowdSec chargé dans Traefik) |
| `7422` | Port du moteur AppSec (analyse applicative des requêtes HTTP) |
| `6060` | Métriques, également accessibles en interne |

## Variables d'environnement

| Variable | Rôle |
| -------- | ---- |
| `GID` | Identifiant de groupe utilisé pour accéder aux fichiers de logs montés depuis l'hôte (`auth.log`, `syslog`), doit correspondre aux permissions réelles de ces fichiers |
| `COLLECTIONS` | Liste des collections de scénarios de détection installées automatiquement au démarrage (voir détail ci-dessous) |
| `CUSTOM_HOSTNAME` | Nom affiché pour cette instance dans les logs et la console CrowdSec |

## Détail des sections clés

- **Collections installées** :
  - `crowdsecurity/traefik` et `crowdsecurity/http-cve` / `crowdsecurity/base-http-scenarios` : détection d'attaques web génériques et de tentatives d'exploitation de CVE, à partir des logs Traefik.
  - `crowdsecurity/sshd` et `crowdsecurity/linux` : détection de brute force SSH et de comportements suspects au niveau du système hôte, à partir de `auth.log` et `syslog`.
  - `crowdsecurity/appsec-generic-rules`, `crowdsecurity/appsec-virtual-patching`, `crowdsecurity/appsec-crs` : moteur AppSec, une couche de type WAF qui analyse le contenu des requêtes HTTP (au-delà du simple comptage d'échecs), avec des règles de virtual patching contre des vulnérabilités connues.
- **Journaux montés** :
  - `/var/log/auth.log` et `/var/log/syslog` (lecture seule) : logs système de l'hôte Proxmox/LXC, pour protéger la machine elle-même et pas seulement les services exposés.
  - `/home/<user>/traefik/logs` monté en lecture seule dans `/var/log/traefik` : accès direct aux logs d'accès générés par le conteneur Traefik, sans passer par un volume partagé dédié.
- **Isolation** : le LAPI (port 8080) n'est jamais publié directement sur Internet ; seul le port `8181` lié à `127.0.0.1` permet une administration locale, et les bouncers y accèdent via le réseau Docker interne `frontend`.

## Intégration avec le reste du homelab

- **Traefik** : le plugin `crowdsec-bouncer-traefik-plugin` chargé dans Traefik interroge l'API CrowdSec (`crowdsec:8080`) sur le réseau `frontend` avant de laisser passer une requête, et bloque les IP identifiées comme malveillantes.
- **Hôte Proxmox** : au-delà des applications web, CrowdSec surveille aussi les logs système de l'hôte (SSH, syslog), ce qui étend la protection à l'infrastructure elle-même et pas uniquement aux services conteneurisés.
- **Communauté CrowdSec** : les collections installées s'appuient sur la base de réputation d'IP partagée par l'ensemble des utilisateurs CrowdSec, en plus des scénarios de détection locaux.
- **Volumes / persistance** : les décisions (IP bannies) et la configuration (`.crowdsec/data`, `.crowdsec/etc`) sont montées depuis l'hôte pour survivre aux recréations du conteneur.
