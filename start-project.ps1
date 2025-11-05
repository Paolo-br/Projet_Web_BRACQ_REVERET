# Guide de Démarrage Rapide
# Pour votre collègue qui reçoit le projet

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "🚀 DÉMARRAGE RAPIDE - ALLTOGETHER" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Ce script va démarrer l'ensemble du projet (base de données + backend + frontend)" -ForegroundColor Yellow
Write-Host ""
Write-Host "⏱️  Première fois: ~5-10 minutes (téléchargement + compilation)" -ForegroundColor Yellow
Write-Host "⏱️  Fois suivantes: ~2-3 minutes" -ForegroundColor Yellow
Write-Host ""

# Vérifications préalables
Write-Host "🔍 Vérification des prérequis..." -ForegroundColor Yellow

$errors = @()

# Vérifier Docker
try {
    docker --version | Out-Null
    Write-Host "  ✅ Docker OK" -ForegroundColor Green
} catch {
    $errors += "Docker n'est pas installé ou pas démarré"
    Write-Host "  ❌ Docker manquant" -ForegroundColor Red
}

# Vérifier Docker Compose
try {
    docker-compose --version | Out-Null
    Write-Host "  ✅ Docker Compose OK" -ForegroundColor Green
} catch {
    $errors += "Docker Compose n'est pas installé"
    Write-Host "  ❌ Docker Compose manquant" -ForegroundColor Red
}

if ($errors.Count -gt 0) {
    Write-Host ""
    Write-Host "❌ ERREURS DÉTECTÉES:" -ForegroundColor Red
    foreach ($error in $errors) {
        Write-Host "   - $error" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "📖 Consultez INSTALLATION.md pour les instructions d'installation" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "🐳 DÉMARRAGE DES SERVICES" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Demander confirmation
Write-Host "Voulez-vous démarrer le projet ? (O/N)" -ForegroundColor Yellow
$confirmation = Read-Host

if ($confirmation -ne "O" -and $confirmation -ne "o" -and $confirmation -ne "Y" -and $confirmation -ne "y") {
    Write-Host "❌ Annulé par l'utilisateur" -ForegroundColor Red
    exit 0
}

# Nettoyer les anciens conteneurs (optionnel)
Write-Host ""
Write-Host "Voulez-vous nettoyer les anciens conteneurs ? (O/N - recommandé la première fois)" -ForegroundColor Yellow
$clean = Read-Host

if ($clean -eq "O" -or $clean -eq "o" -or $clean -eq "Y" -or $clean -eq "y") {
    Write-Host "🧹 Nettoyage des anciens conteneurs..." -ForegroundColor Yellow
    docker-compose down -v
}

Write-Host ""
Write-Host "🚀 Démarrage du projet complet..." -ForegroundColor Yellow
Write-Host "   (Cela peut prendre plusieurs minutes...)" -ForegroundColor Gray
Write-Host ""

# Démarrer tous les services
docker-compose up --build -d

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "❌ ERREUR lors du démarrage" -ForegroundColor Red
    Write-Host "📋 Consultez les logs avec: docker-compose logs" -ForegroundColor Yellow
    exit 1
}

# Attendre que les services soient prêts
Write-Host ""
Write-Host "⏳ Attente du démarrage complet..." -ForegroundColor Yellow
Write-Host "   (30 secondes max)" -ForegroundColor Gray

Start-Sleep -Seconds 5

$maxWait = 30
$waited = 0
$ready = $false

while ($waited -lt $maxWait -and -not $ready) {
    $health = docker inspect --format='{{.State.Health.Status}}' alltogether-db 2>&1
    if ($health -eq "healthy") {
        $ready = $true
    } else {
        Write-Host "." -NoNewline
        Start-Sleep -Seconds 1
        $waited++
    }
}

Write-Host ""

if (-not $ready) {
    Write-Host "⚠️  PostgreSQL met du temps à démarrer..." -ForegroundColor Yellow
    Write-Host "   Consultez les logs: docker-compose logs db" -ForegroundColor Gray
} else {
    Write-Host "✅ PostgreSQL est prêt" -ForegroundColor Green
}

# Afficher l'état des conteneurs
Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "📊 ÉTAT DES SERVICES" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
docker-compose ps

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "🎉 PROJET DÉMARRÉ!" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "🌐 Frontend (React):      http://localhost:5173" -ForegroundColor Green
Write-Host "🔧 Backend (Spring Boot): http://localhost:8080" -ForegroundColor Green
Write-Host "🗄️  PostgreSQL:            localhost:5432" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Informations de connexion BDD:" -ForegroundColor Yellow
Write-Host "   Database: alltogether" -ForegroundColor White
Write-Host "   Username: postgres" -ForegroundColor White
Write-Host "   Password: BaseD@ta2025" -ForegroundColor White
Write-Host ""
Write-Host "📋 Commandes utiles:" -ForegroundColor Yellow
Write-Host "   Voir les logs:        docker-compose logs -f" -ForegroundColor White
Write-Host "   Arrêter le projet:    docker-compose down" -ForegroundColor White
Write-Host "   Redémarrer:           docker-compose restart" -ForegroundColor White
Write-Host "   Rebuild complet:      docker-compose up --build" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  Si vous ne voyez pas l'application, attendez 1-2 minutes supplémentaires" -ForegroundColor Yellow
Write-Host "   Le backend Spring Boot peut mettre du temps à compiler au premier démarrage" -ForegroundColor Gray
Write-Host ""

# Proposer d'ouvrir le navigateur
Write-Host "Voulez-vous ouvrir le frontend dans votre navigateur ? (O/N)" -ForegroundColor Yellow
$openBrowser = Read-Host

if ($openBrowser -eq "O" -or $openBrowser -eq "o" -or $openBrowser -eq "Y" -or $openBrowser -eq "y") {
    Start-Process "http://localhost:5173"
}

Write-Host ""
Write-Host "✅ Tout est prêt! Bon développement! 🚀" -ForegroundColor Green
Write-Host ""
