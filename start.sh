#!/bin/bash

clear

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║         🎉 Festival Admin - Démarrage rapide 🎉            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Vérifier si Node.js est installé
echo "Vérification de Node.js..."
if ! command -v node &> /dev/null; then
    echo ""
    echo "❌ ERREUR : Node.js n'est pas installé !"
    echo ""
    echo "📥 Téléchargez Node.js depuis : https://nodejs.org"
    echo ""
    exit 1
fi

# Vérifier si npm est installé
if ! command -v npm &> /dev/null; then
    echo ""
    echo "❌ ERREUR : npm n'est pas installé !"
    echo ""
    exit 1
fi

echo "✅ Node.js trouvé"
echo ""

# Vérifier si node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    echo "(Cette étape peut prendre quelques minutes)"
    echo ""
    npm install
    if [ $? -ne 0 ]; then
        echo ""
        echo "❌ ERREUR : L'installation des dépendances a échoué !"
        echo ""
        exit 1
    fi
    echo ""
    echo "✅ Dépendances installées avec succès"
else
    echo "✅ Dépendances déjà présentes"
fi

echo ""
echo "🚀 Lancement du serveur..."
echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  L'application sera disponible à : http://localhost:5173   ║"
echo "║                                                            ║"
echo "║  📝 Identifiants de connexion :                            ║"
echo "║     Mot de passe : admin123                                ║"
echo "║                                                            ║"
echo "║  Pour arrêter le serveur : Ctrl + C                       ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Ouvrir le navigateur selon le système
if command -v xdg-open &> /dev/null; then
    # Linux
    xdg-open http://localhost:5173 &
elif command -v open &> /dev/null; then
    # macOS
    open http://localhost:5173
fi

# Lancer le serveur de développement
npm run dev
