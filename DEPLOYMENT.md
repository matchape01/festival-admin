# 🚀 Guide de Déploiement - Festival Admin

## Déploiement sur GitHub Pages

### Prérequis
- Compte GitHub ([github.com](https://github.com))
- Git installé sur votre ordinateur
- Repository local avec les modifications complétées

---

## Étapes Détaillées

### 1. Créer un Repository GitHub

1. Connectez-vous à [github.com](https://github.com)
2. Cliquez sur **"New repository"** (bouton vert)
3. Remplissez les informations :
   - **Repository name** : `festival-admin`
   - **Description** : "Festival Management Application"
   - **Visibility** : Public (pour GitHub Pages)
   - **Ne pas cocher** "Initialize this repository with a README"

4. Cliquez sur **"Create repository"**

---

### 2. Initialiser Git Localement

Ouvrez un terminal dans le dossier `festival-admin` :

```bash
git init
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/festival-admin.git
```

Remplacez `YOUR_USERNAME` par votre nom d'utilisateur GitHub.

---

### 3. Mettre à Jour `package.json`

Modifiez la clé `homepage` dans `package.json` :

```json
"homepage": "https://YOUR_USERNAME.github.io/festival-admin"
```

Remplacez `YOUR_USERNAME` par votre nom d'utilisateur GitHub.

---

### 4. Ajouter et Pousser le Code

```bash
git add .
git commit -m "Initial commit: Festival Admin application"
git push -u origin main
```

**Note** : GitHub vous demandera vos identifiants ou utilisera votre SSH key si configurée.

---

### 5. Activer GitHub Pages

1. Allez sur votre repository sur GitHub
2. Cliquez sur **Settings** (onglet)
3. Sélectionnez **Pages** (menu gauche)
4. Sous "Source", sélectionnez **"GitHub Actions"**
5. Attendez quelques minutes

---

### 6. Vérifier le Déploiement

Une fois le build terminé (visible dans l'onglet "Actions") :

1. Retournez à **Settings → Pages**
2. Vous verrez un lien du type : **https://YOUR_USERNAME.github.io/festival-admin**
3. Cliquez sur le lien pour accéder à votre application

---

## ✅ Vérification du Déploiement

Une fois en ligne, vérifiez que :

- ✅ L'application charge correctement
- ✅ La connexion fonctionne (mot de passe : `admin123`)
- ✅ Toutes les fonctionnalités marchent (Resources, Workshops, Planning, Volunteers)
- ✅ Les données persisten dans localStorage
- ✅ Les exports (JSON, CSV, iCal) fonctionnent
- ✅ Le design est responsive (test sur mobile/tablet)

---

## 📝 Mises à Jour Futures

Après le déploiement initial, pour mettre à jour l'application :

```bash
git add .
git commit -m "Description des changements"
git push origin main
```

Le CI/CD (GitHub Actions) reconstruira et redéploiera automatiquement en quelques minutes.

---

## 🐛 Dépannage

### L'app n'apparaît pas ?
- Vérifiez que GitHub Pages est activée (Settings → Pages)
- Attendez 2-5 minutes après le push initial
- Vérifiez l'onglet "Actions" pour les erreurs de build

### Erreur 404 ?
- Assurez-vous que `base: '/festival-admin/'` est dans `vite.config.ts`
- Vérifiez que `homepage` dans `package.json` correspond à votre URL

### Besoin de redéployer manuellement ?
```bash
npm run deploy
```

---

**✨ Votre application est maintenant en ligne !**
