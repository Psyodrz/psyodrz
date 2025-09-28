@echo off
echo =======================================
echo MongoDB Installation Helper
echo =======================================
echo.
echo This script will help you install MongoDB Community Edition on Windows.
echo.
echo Options:
echo 1. Download MongoDB Installer (opens browser)
echo 2. Create MongoDB data directory
echo 3. Install MongoDB as a Windows service
echo 4. Start MongoDB service
echo 5. Back to server menu
echo.
set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" (
  echo Opening MongoDB download page in your browser...
  start https://www.mongodb.com/try/download/community
  echo.
  echo After downloading, run the installer and follow the instructions.
  echo Choose the "Complete" installation type and select "Install MongoDB as a Service".
  pause
  call :show_menu
) else if "%choice%"=="2" (
  echo Creating MongoDB data directory...
  mkdir %USERPROFILE%\data\db 2>nul
  echo.
  echo Data directory created at: %USERPROFILE%\data\db
  echo.
  echo If you installed MongoDB to a custom location, you may need
  echo to create the data directory in a different location.
  pause
  call :show_menu
) else if "%choice%"=="3" (
  echo.
  echo To install MongoDB as a service, you need to run a command like:
  echo "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe" --install --serviceName MongoDB --dbpath="%USERPROFILE%\data\db"
  echo.
  echo Do you want to try to install the service now?
  set /p install="Enter Y to continue, N to cancel: "
  if /i "%install%"=="Y" (
    if exist "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe" (
      "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe" --install --serviceName MongoDB --dbpath="%USERPROFILE%\data\db"
      echo Service installation attempted.
    ) else if exist "C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" (
      "C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" --install --serviceName MongoDB --dbpath="%USERPROFILE%\data\db"
      echo Service installation attempted.
    ) else (
      echo MongoDB executable not found in common locations.
      echo Please install MongoDB first or specify the correct path.
    )
  )
  pause
  call :show_menu
) else if "%choice%"=="4" (
  echo Starting MongoDB service...
  net start MongoDB
  pause
  call :show_menu
) else if "%choice%"=="5" (
  echo Returning to server menu...
  start-server.bat
  exit
) else (
  echo Invalid choice.
  pause
  call :show_menu
)

exit /b

:show_menu
cls
echo =======================================
echo MongoDB Installation Helper
echo =======================================
echo.
echo This script will help you install MongoDB Community Edition on Windows.
echo.
echo Options:
echo 1. Download MongoDB Installer (opens browser)
echo 2. Create MongoDB data directory
echo 3. Install MongoDB as a Windows service
echo 4. Start MongoDB service
echo 5. Back to server menu
echo.
set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" (
  echo Opening MongoDB download page in your browser...
  start https://www.mongodb.com/try/download/community
  echo.
  echo After downloading, run the installer and follow the instructions.
  echo Choose the "Complete" installation type and select "Install MongoDB as a Service".
  pause
  call :show_menu
) else if "%choice%"=="2" (
  echo Creating MongoDB data directory...
  mkdir %USERPROFILE%\data\db 2>nul
  echo.
  echo Data directory created at: %USERPROFILE%\data\db
  echo.
  echo If you installed MongoDB to a custom location, you may need
  echo to create the data directory in a different location.
  pause
  call :show_menu
) else if "%choice%"=="3" (
  echo.
  echo To install MongoDB as a service, you need to run a command like:
  echo "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe" --install --serviceName MongoDB --dbpath="%USERPROFILE%\data\db"
  echo.
  echo Do you want to try to install the service now?
  set /p install="Enter Y to continue, N to cancel: "
  if /i "%install%"=="Y" (
    if exist "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe" (
      "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe" --install --serviceName MongoDB --dbpath="%USERPROFILE%\data\db"
      echo Service installation attempted.
    ) else if exist "C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" (
      "C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" --install --serviceName MongoDB --dbpath="%USERPROFILE%\data\db"
      echo Service installation attempted.
    ) else (
      echo MongoDB executable not found in common locations.
      echo Please install MongoDB first or specify the correct path.
    )
  )
  pause
  call :show_menu
) else if "%choice%"=="4" (
  echo Starting MongoDB service...
  net start MongoDB
  pause
  call :show_menu
) else if "%choice%"=="5" (
  echo Returning to server menu...
  start-server.bat
  exit
) else (
  echo Invalid choice.
  pause
  call :show_menu
) 