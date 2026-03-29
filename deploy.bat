@echo off
setlocal enabledelayedexpansion

:: =============================
:: CONFIG
:: =============================
set REPO_BRANCH=main
set LOG_FILE=deploy_log.txt
set VERSION_FILE=version.txt

echo ----------------------------
echo Bahcelievler Forum Deploy
echo ----------------------------

:: =============================
:: 1. ORTAM TEMİZLİĞİ
:: =============================
git rebase --abort >nul 2>&1

:: Git var mı kontrol
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git bulunamadi
    pause
    exit
)

:: =============================
:: 2. DIRTY STATE KONTROL
:: =============================
git status --porcelain > temp_git_check.txt
set /p changes=<temp_git_check.txt
del temp_git_check.txt

if not "!changes!"=="" (
    echo ⚠️ UYARI: Commitlenmemis degisiklikler var
    echo Devam ediliyor...
)

:: =============================
:: 3. VERSION OKU / ARTIR
:: =============================
if not exist %VERSION_FILE% (
    echo 1.0.0 > %VERSION_FILE%
)

set /p version=<%VERSION_FILE%

for /f "tokens=1-3 delims=." %%a in ("%version%") do (
    set major=%%a
    set minor=%%b
    set patch=%%c
)

:: PATCH ARTIR
set /a patch+=1
set newVersion=%major%.%minor%.%patch%

echo %newVersion% > %VERSION_FILE%

echo Yeni Versiyon: %newVersion%

:: =============================
:: 4. YEDEK (ROLLBACK POINT)
:: =============================
for /f %%i in ('git rev-parse HEAD') do set PREV_COMMIT=%%i

echo Onceki commit: %PREV_COMMIT%

:: =============================
:: 5. GIT ADD + VALIDATION
:: =============================
git add .

git diff --cached --quiet
if %errorlevel%==0 (
    echo ❌ Degisiklik yok. Deploy iptal edildi.
    pause
    exit
)

:: =============================
:: 6. COMMIT
:: =============================
git commit -m "Deploy v%newVersion%"

if %errorlevel% neq 0 (
    echo ❌ Commit basarisiz
    pause
    exit
)

:: =============================
:: 7. PULL + REBASE (SAFE)
:: =============================
echo.
echo Remote ile senkronizasyon yapiliyor...
echo.

git pull origin %REPO_BRANCH% --rebase

if %errorlevel% neq 0 (
    echo.
    echo ❌ HATA: Rebase basarisiz

    echo 🔁 Rollback yapiliyor...
    git reset --hard %PREV_COMMIT%

    echo Manuel duzeltme:
    echo   git status
    echo   git add .
    echo   git rebase --continue

    pause
    exit
)

:: =============================
:: 8. PUSH
:: =============================
echo.
echo Push yapiliyor...
echo.

git push origin %REPO_BRANCH%

if %errorlevel% neq 0 (
    echo.
    echo ❌ HATA: Push basarisiz

    echo 🔁 Rollback yapiliyor...
    git reset --hard %PREV_COMMIT%

    pause
    exit
)

:: =============================
:: 9. LOG KAYDI
:: =============================
for /f %%i in ('powershell -command "Get-Date -Format yyyy-MM-dd HH:mm:ss"') do set DATETIME=%%i

echo [%DATETIME%] SUCCESS v%newVersion% >> %LOG_FILE%

:: =============================
:: 10. TAMAMLANDI
:: =============================
echo ----------------------------
echo ✅ Deploy tamamlandi.
echo Versiyon: v%newVersion%
echo ----------------------------

:: SITEYI AC
start https://bahcelievlerforum.com.tr

pause