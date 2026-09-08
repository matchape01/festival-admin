@echo off
cls
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║         🎉 Festival Admin - Démarrage rapide 🎉            ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Vérifier si Node.js est installé
echo Vérification de Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo ❌ ERREUR : Node.js n'est pas installé !
    echo.
    echo 📥 Téléchargez Node.js depuis : https://nodejs.org
    echo.
    pause
    exit /b 1
)

REM Vérifier si npm est installé
npm --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo ❌ ERREUR : npm n'est pas installé !
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js trouvé
echo.

REM Vérifier si node_modules existe
if not exist "node_modules" (
    echo 📦 Installation des dépendances...
    echo (Cette étape peut prendre quelques minutes)
    echo.
    call npm install
    if errorlevel 1 (
        echo.
        echo ❌ ERREUR : L'installation des dépendances a échoué !
        echo.
        pause
        exit /b 1
    )
    echo.
    echo ✅ Dépendances installées avec succès
) else (
    echo ✅ Dépendances déjà présentes
)

echo.
echo 🚀 Lancement du serveur...
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║  L'application sera disponible à : http://localhost:5173   ║
echo ║                                                            ║
echo ║  📝 Identifiants de connexion :                            ║
echo ║     Mot de passe : admin123                                ║
echo ║                                                            ║
echo ║  Pour arrêter le serveur : Ctrl + C                       ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Ouvrir le navigateur
start http://localhost:5173

REM Lancer le serveur de développement
call npm run dev

pause
