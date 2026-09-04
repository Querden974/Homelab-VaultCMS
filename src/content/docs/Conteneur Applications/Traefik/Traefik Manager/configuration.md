---
title: Configuration
description: Configuration de Traefik-Manager
history:
  - configuration 1
sidebar:
  order: 21
---

## Docker Compose

Extrait annoté du service tel que déployé dans le homelab. Le service `traefik` lui-même est déjà détaillé sur [sa propre page de configuration](/conteneur-applications/traefik/configuration/) — seuls les services propres à Traefik Manager sont montrés ici.

```yaml
services:
  traefik-manager-socket-proxy:
    image: ghcr.io/tecnativa/docker-socket-proxy:latest
    container_name: traefik-manager-socket-proxy
    restart: unless-stopped
    environment:
      - CONTAINERS=1
      - EVENTS=1
      - PING=1
      - POST=1
      - VERSION=1
      - ALLOW_RESTARTS=0
      - ALLOW_START=0
      - ALLOW_STOP=0
      - AUTH=0
      - BUILD=0
      - COMMIT=0
      - CONFIGS=0
      - DISABLE_IPV6=0
      - DISTRIBUTION=0
      - EXEC=0
      - GRPC=0
      - IMAGES=0
      - INFO=0
      - LOG_LEVEL=info
      - NETWORKS=0
      - NODES=0
      - PLUGINS=0
      - SECRETS=0
      - SERVICES=0
      - SESSION=0
      - SWARM=0
      - SYSTEM=0
      - TASKS=0
      - VOLUMES=0
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
    networks:
      - tm-socketproxy

  traefik-manager:
    image: ghcr.io/chr0nzz/traefik-manager:latest
    container_name: traefik-manager
    restart: unless-stopped
    environment:
      - STATIC_CONFIG_PATH=/app/traefik.yml
      - RESTART_METHOD=proxy
      - DOCKER_HOST=tcp://traefik-manager-socket-proxy:2375
      - TRAEFIK_CONTAINER=traefik
      - COOKIE_SECURE=false
      - CERT_RESOLVER=ovhcloud
      - DOMAINS=${DOMAIN_NAME}
      - TRAEFIK_API_URL=http://traefik:8080
    ports:
      - "5000:5000"
    volumes:
      - ./traefik-manager-data:/app/config
      - ./conf:/app/dynamic
      - ./backup:/app/backups
      - ./traefik.yml:/app/traefik.yml:ro
      - ./certs/ovh-acme.json:/app/acme.json:ro
      - ./logs/traefik.log:/app/logs/access.log:ro
    networks:
      - frontend
      - tm-socketproxy
    depends_on:
      - traefik
      - traefik-manager-socket-proxy

networks:
  frontend:
    external: true
  tm-socketproxy:
    internal: true
```

## Ports exposés

| Port | Protocole | Rôle |
| ---- | --------- | ---- |
| `5000` | TCP | Interface web de Traefik Manager |

## Variables d'environnement

| Variable | Rôle |
| -------- | ---- |
| `DOMAIN_NAME` | Domaine(s) autorisé(s) pour la génération de routes/certificats via l'interface Traefik Manager |

Les variables `OVH_*` utilisées par `certicatesResolvers` sont propres au service `traefik` et sont documentées sur [sa page de configuration](/conteneur-applications/traefik/configuration/).

## Détail des sections clés

- **`traefik-manager-socket-proxy`** : proxy vers le socket Docker en lecture quasi-nulle (seuls `CONTAINERS`, `EVENTS`, `PING`, `POST`, `VERSION` sont autorisés, tout le reste — exec, volumes, secrets, réseaux, swarm... — est explicitement désactivé). Traefik Manager ne touche donc jamais directement `/var/run/docker.sock`.
- **`traefik-manager`** : lit la configuration statique de Traefik (`traefik.yml`), écrit dans la configuration dynamique (`./conf`), peut déclencher un redémarrage de Traefik via le socket-proxy (`RESTART_METHOD=proxy`), et lit les logs d'accès (`access.log`) ainsi que le fichier ACME pour l'état des certificats.
- **Réseaux** : `frontend` (partagé avec Traefik, externe) pour l'exposition de l'UI, et `tm-socketproxy` (interne, non routable vers l'extérieur) pour isoler la communication avec le socket-proxy.

## Intégration avec le reste du homelab

- **Traefik** : Traefik Manager pilote la configuration dynamique de Traefik (`dynamic.yml`) et peut le redémarrer, sans jamais avoir un accès direct au socket Docker grâce au `docker-socket-proxy` intercalé.
- **Sécurité** : la séparation en trois conteneurs (Traefik, socket-proxy, Traefik Manager) limite la surface d'attaque — même si l'interface web de Traefik Manager était compromise, les actions possibles sur Docker restent strictement bornées par les permissions du socket-proxy.
- **Volumes / persistance** : la configuration dynamique (`./conf`), les données de l'application (`./traefik-manager-data`) et les sauvegardes (`./backup`) sont montées depuis l'hôte.
