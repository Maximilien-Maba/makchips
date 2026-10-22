# MAK’CHIPS — site vitrine statique

## Contenu
- `index.html` : page d'accueil complète
- `css/style.css` : identité visuelle responsive
- `js/script.js` : menu mobile, animations légères et formulaire de commande WhatsApp
- `assets/images/` : images optimisées au format WebP

## Tester localement
Ouvrir `index.html` dans un navigateur. Pour un test plus proche de la mise en ligne, lancer un serveur local depuis ce dossier, par exemple :

```bash
python -m http.server 8000
```

Puis ouvrir `http://localhost:8000`.

## Commandes WhatsApp
Le formulaire prépare un message vers le numéro `+243 976 125 282` (repris du visuel fourni). Vérifier ce numéro avec le client avant la mise en ligne. Le message n'est pas envoyé automatiquement : le client doit appuyer sur Envoyer dans WhatsApp.

## Avant publication
- Vérifier le numéro WhatsApp et l'adresse exacte de l'entreprise.
- Vérifier que les photos générées correspondent bien aux produits réels. Les visuels générés sont des illustrations publicitaires, pas des preuves de composition ou de conditionnement.
- Ajouter les prix et formats seulement après validation par le client.
- Tester le site sur téléphone et ordinateur.
- Hébergement statique possible avec GitHub Pages ; aucun backend ni base de données n'est requis pour cette version.
