# 🎉 Festival Admin - Application de Gestion

Application web de gestion complète pour festivals : ressources, ateliers, planning interactif et affectations bénévoles.

## 🚀 Démarrage Rapide

### **Windows**
Double-cliquez sur le fichier **`START.bat`** dans le dossier du projet.

### **macOS / Linux**
Ouvrez un terminal, naviguez dans le dossier du projet et tapez :
```bash
chmod +x start.sh
./start.sh
```

---

## 📝 Connexion

- **Mot de passe** : `admin123`

L'application sera lancée automatiquement à : **http://localhost:5173**

---

## 📋 Fonctionnalités Principales

✅ **Gestion Ressources** - Ajouter/modifier personnes et rôles + Export CSV
✅ **Gestion Ateliers** - Créer ateliers avec logistique + Export CSV
✅ **Planning Interactif** - Drag & drop, détection conflits, Export iCal
✅ **Affectations Bénévoles** - Assigner bénévoles aux ateliers + Export CSV
✅ **Export/Import** - JSON, CSV, iCal, Réinitialiser
✅ **Dashboard** - Vue d'ensemble avec stats et gestion centralisée
✅ **Persistance** - Sauvegarde automatique en localStorage

---

## 📁 Structure du Projet

```
festival-admin/
├── START.bat                # Lanceur Windows (double-cliquer)
├── start.sh                 # Lanceur Mac/Linux (./start.sh)
├── README.md               # Ce fichier
├── src/
│   ├── pages/              # Dashboard, Resources, Workshops, Planning, Volunteers
│   ├── components/         # Auth, Layout, Forms, Planning, Export
│   ├── hooks/              # useAuth, useData (avec localStorage)
│   ├── utils/              # export, csv, ical, conflicts, planning
│   ├── data/               # resources, workshops, schedule, volunteers (JSON)
│   └── types/              # TypeScript definitions
└── dist/                   # Build production
```

---

## 🛠️ Stack Technique

React 19 + TypeScript + Tailwind CSS + Vite + React Router

---

## 💾 Sauvegarde des Données

- **localStorage** : Automatique après chaque changement
- **Export JSON** : Sauvegarde complète des données
- **Export CSV** : Ressources, Ateliers, Planning, Affectations
- **Export iCal** : Planning importable dans calendriers

---

## 📊 Données de Test Incluses

- 4 personnes avec rôles variés
- 4 ateliers avec descriptions et logistique
- 10 créneaux sur 3 jours
- 4 affectations bénévoles

Tous les éléments peuvent être modifiés ou réinitialisés.

---

## 🐛 Dépannage

**L'app ne démarre pas ?**
1. Vérifiez : `node --version`
2. Relancez START.bat ou start.sh

**npm install échoue ?**
```bash
npm clean-install
```

**Port 5173 utilisé ?**
```bash
npm run dev -- --port 5174
```

---

---

## 🌐 Déploiement sur GitHub Pages

Pour déployer l'application en ligne et la rendre accessible publiquement :

### **Étape 1 : Créer un repository GitHub**
1. Allez sur [github.com](https://github.com) et créez un nouveau repository nommé `festival-admin`
2. Ne sélectionnez **pas** "Initialize this repository with a README" (vous pousserez le code local)

### **Étape 2 : Configurer le repository local**
```bash
cd festival-admin
git init
git remote add origin https://github.com/YOUR_USERNAME/festival-admin.git
git branch -M main
git add .
git commit -m "Initial commit: Festival Admin application"
git push -u origin main
```

### **Étape 3 : Activer GitHub Pages**
1. Allez dans Settings → Pages
2. Sélectionnez "GitHub Actions" comme source
3. Attendez quelques minutes le build automatique

### **Étape 4 : Accéder à l'application**
L'app sera disponible à : **https://YOUR_USERNAME.github.io/festival-admin**

### **Mise à jour personnalisée du homepage**
Avant de déployer, mettez à jour la clé `homepage` dans `package.json` :
```json
"homepage": "https://YOUR_USERNAME.github.io/festival-admin"
```

---

**Version** : 1.0.0  
**Made with** ❤️ for Festival Planning
