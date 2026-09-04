---
title: "Configuration"
description: "Configuration de [Nom du service]"
draft: true
---

## Docker Compose

Extrait annoté du service tel que déployé dans le homelab.

```yaml
services:
  nom-du-service:
    image: image:tag
    container_name: nom-du-service
    restart: unless-stopped
    environment:
      - VARIABLE=valeur
    volumes:
      - ./data:/data
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.nom-du-service.rule=Host(`sous-domaine.mondomaine.tld`)"
```

## Variables d'environnement

| Variable | Rôle | Exemple |
|----------|------|---------|
| `VARIABLE` | À décrire | `valeur` |

> Ne jamais faire figurer de secrets réels (mots de passe, tokens, clés API) dans cette page — utiliser des placeholders.

## Intégration avec le reste du homelab

- **Traefik** : routage / TLS via labels
- **Authentik** : SSO activé ou non, middleware utilisé
- **Volumes / persistance** : où sont stockées les données, stratégie de sauvegarde associée
