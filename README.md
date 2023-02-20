## Installation de toutes les dépandances du projet (Back et Front)

### `npm install`

### `npm run setup`

## Configuration de l'environnent du back

- Allez dans **/backend**
- Modifiez dans **.env** l'URI de votre serveur de base données suivant votre environnement

## Migration

- Ouvrez votre terminal vers le projet
- Tapez les commandes suivantes:

### `cd backend`

### `php bin/console doctrine:migrations:migrate`

### `cd ../`

## Démarrage du projet

Tapez la commande suivant à la racine du projet

## `npm run dev`

- l'API graphql tourne sur http://localhost:8080
- Le front tourne sur http://localhost:3000
- le server mercure tourne sur http://localhost:4000
