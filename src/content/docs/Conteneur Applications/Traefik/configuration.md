---
title: Configuration
description: Configuration de Traefik
history:
  - configuration 1
sidebar:
  order: 1
---

## Docker Compose
```yaml
services:
  traefik:
    container_name: traefik
    image: traefik:v3.6
    restart: unless-stopped
    environment:
      - OVH_ENDPOINT=${OVH_ENDPOINT}
      - OVH_APPLICATION_KEY=${OVH_APPLICATION_KEY}
      - OVH_APPLICATION_SECRET=${OVH_APPLICATION_SECRET}
      - OVH_CONSUMER_KEY=${OVH_CONSUMER_KEY}
      - TZ=Europe/Paris
    ports:
      - "80:80"
      - "443:443"
      - "8080:8080"
      - "8082:8082"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./traefik.yml:/etc/traefik/traefik.yml:ro
      - ./certs:/var/traefik/certs:rw
      - ./conf:/etc/traefik/conf
      - ./conf/config.yml:/etc/traefik/config.yml
      - ./shared/:/shared
      - ./logs:/logs:rw
      - ./conf/dynamic:/etc/traefik/dynamic
      - ./traefik-manager-data/dynamic.yml:/etc/traefik/conf/dynamic.yml
    networks:
      - frontend
networks:
    frontend:
      external: true
```
## Ports exposés

| Port | Protocole | Rôle |
| ---- | --------- | ---- |
| `80` | TCP | EntryPoint `web` — HTTP, redirigé automatiquement vers `websecure` (443) |
| `443` | TCP | EntryPoint `websecure` — HTTPS, point d'entrée principal de tout le trafic web |
| `8080` | TCP | Dashboard Traefik (API interne) |
| `8082` | TCP | EntryPoint `metrics` — exposition des métriques Prometheus |
| `25565` | TCP | Passthrough vers un service tiers (à préciser) |
| `8211` | UDP | Passthrough vers un service tiers (à préciser) |

## Variables d'environnement

Ces variables servent à authentifier Traefik auprès de l'API OVH pour la résolution DNS-01 (`certificatesResolvers.ovhcloud`), nécessaire à la génération de certificats Let's Encrypt en wildcard.

| Variable                 | Rôle      |
| ------------------------ | --------- |
| `OVH_ENDPOINT`           | Zone d'API OVH à utiliser (ex. `ovh-eu`) |
| `OVH_APPLICATION_KEY`    | Clé d'application générée depuis l'espace API OVH |
| `OVH_APPLICATION_SECRET` | Secret associé à l'application OVH |
| `OVH_CONSUMER_KEY`       | Clé consommateur autorisant l'application à agir sur la zone DNS |

## Traefik.conf
```yaml
# Configuration statique de Traefik 
global:
  checkNewVersion: false
  sendAnonymousUsage: false

# Section api omis volontairement
  
metrics:
  prometheus:
    entryPoint: metrics

entryPoints:
  web:
    address: ":80" # EntryPoint pour HTTP 
    http:
      redirections:
        entryPoint:
          to: websecure
          scheme: https
          permanent: true   
  websecure:
    address: ":443" # EntryPoint pour HTTPS 
  metrics:
    address: ":8082"

certificatesResolvers:
  ovhcloud:
    acme:
      email: "PLACEHOLDER"
      storage: "/var/traefik/certs/ovh-acme.json"
      caServer: "https://acme-v02.api.letsencrypt.org/directory" # Production
      keyType: EC256
      dnsChallenge:
        provider: ovh
        delayBeforeCheck: "10"
      httpChallenge:
        entryPoint: web
      tlsChallenge: {}

accessLog:
  filePath: "/logs/traefik.log"
  format: json
  filters:
    statusCodes:
      - "200-299" # succès
      - "400-599" # échecs - erreurs
  fields:
    headers:
      defaultMode: drop # supprimer tous les headers pour en conserver uniquement 4
      names:
        User-Agent: keep
        X-Real-Ip: keep
        X-Forwarded-For: keep
        X-Forwarded-Proto: keep

providers:
  docker:
    endpoint: "unix:///var/run/docker.sock"
    exposedByDefault: false
  file:
    directory: /etc/traefik/conf/
    watch: true

experimental:
  plugins:
    bouncer:
      moduleName: github.com/maxlerebourg/crowdsec-bouncer-traefik-plugin
      version: v1.4.6
```

### Détail des sections clés

- **`entryPoints`** : 
	- `web` (80) redirige systématiquement vers `websecure` (443) en HTTPS permanent. 
	- `metrics` (8082) est dédié à l'exposition Prometheus, séparé du trafic applicatif.
- **`certificatesResolvers.ovhcloud`** : résolution des certificats Let's Encrypt via challenge DNS chez OVH, ce qui permet de générer des certificats wildcard sans avoir à ouvrir de port spécifique par sous-domaine.
- **`accessLog`** : les logs d'accès sont écrits en JSON dans `/logs/traefik.log`, avec un filtrage volontaire des en-têtes conservés (`User-Agent`, `X-Real-Ip`, `X-Forwarded-For`, `X-Forwarded-Proto`) pour limiter le volume tout en gardant l'essentiel pour l'analyse (et l'ingestion par CrowdSec).
- **`providers`** : double source de configuration 
	- `docker` pour la découverte automatique des conteneurs via labels.
	- `file` pour les routes statiques définies manuellement dans `./conf/dynamic`.
- **`experimental.plugins.bouncer`** : charge le plugin CrowdSec directement dans Traefik, qui interroge l'agent CrowdSec avant de laisser passer une requête et bloque les IP jugées malveillantes.

## Intégration avec le reste du homelab

- **CrowdSec** : le plugin `crowdsec-bouncer-traefik-plugin` est chargé nativement dans Traefik et agit comme middleware de blocage en amont des applications, à partir des décisions prises par l'agent CrowdSec sur les logs d'accès.
- **Traefik Manager** : interface d'administration séparée (voir [sa page de configuration](/conteneur-applications/traefik/traefik-manager/configuration/)) qui pilote la configuration dynamique (`dynamic.yml`) et peut redémarrer Traefik, sans jamais exposer directement le socket Docker — elle passe par un `docker-socket-proxy` en lecture très restreinte.
- **Authentik** : middleware de forward-auth appliqué sur les routes qui nécessitent une authentification SSO, déclaré via les labels des conteneurs applicatifs plutôt que dans la configuration statique de Traefik.
- **Volumes / persistance** : les certificats (`./certs`), la configuration dynamique (`./conf`) et les logs (`./logs`) sont montés depuis l'hôte pour survivre aux recréations du conteneur.
