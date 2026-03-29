@echo off
setlocal enabledelayedexpansion

echo ----------------------------
echo Bahcelievler Forum Deploy
echo ----------------------------

:: 🔥 REBASE KALINTI TEMİZLE
git rebase --abort >nul 2>&1

:: VERSION OKU
if not exist version.txt (
    echo 1.0.0 > version.txt
)

set /p version=<version.txt

for /f "tokens=1-3 delims=." %%a in ("%version%") do (
    set major=%%a
    set minor=%%b
    set patch=%%c
)

:: PATCH ARTIR
set /a patch+=1
set newVersion=%major%.%minor%.%patch%

echo %newVersion% > version.txt

echo Yeni Versiyon: %newVersion%

:: GIT ADD
git add .

:: BOS DEGİSİKLİK KONTROL
git diff --cached --quiet
if %errorlevel%==0 (
    echo Degisiklik yok. Deploy iptal edildi.
    pause
    exit
)

:: COMMIT
git commit -m "Deploy v%newVersion%"

echo.
echo Remote ile senkronizasyon yapiliyor...
echo.

:: 🔥 PULL + REBASE (KRİTİK)
git pull origin main --rebase

if %errorlevel% neq 0 (
    echo.
    echo ❌ HATA: Rebase basarisiz (conflict olabilir)
    echo Manuel olarak duzelt:
    echo   git status
    echo   git add .
    echo   git rebase --continue
    pause
    exit
)

echo.
echo Push yapiliyor...
echo.

git push origin main

if %errorlevel% neq 0 (
    echo.
    echo ❌ HATA: Push basarisiz
    pause
    exit
)

echo ----------------------------
echo Deploy tamamlandi.
echo Versiyon: v%newVersion%
echo ----------------------------

:: SITEYI AC
start https://bahcelievlerforum.com.tr

pause