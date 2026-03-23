@echo off
setlocal enabledelayedexpansion

echo ----------------------------
echo Bahcelievler Forum Deploy
echo ----------------------------

:: Version oku
set /p version=<version.txt

for /f "tokens=1-3 delims=." %%a in ("%version%") do (
    set major=%%a
    set minor=%%b
    set patch=%%c
)

:: Patch arttır
set /a patch+=1
set newVersion=%major%.%minor%.%patch%

echo %newVersion% > version.txt

echo Yeni Versiyon: %newVersion%

:: Git işlemleri
git add .

git diff --cached --quiet
if %errorlevel%==0 (
    echo Degisiklik yok. Deploy iptal edildi.
    pause
    exit
)

git commit -m "Deploy v%newVersion%"
git push

echo ----------------------------
echo Deploy tamamlandi.
echo Versiyon: v%newVersion%
echo ----------------------------

start https://bahcelievlerforum.com.tr

pause