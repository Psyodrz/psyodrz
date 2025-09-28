@echo off
echo Starting Portfolio Server...
echo.
echo Options:
echo 1. Start Server (shows all local and network links)
echo 2. Start Server with Global Access (requires port forwarding)
echo 3. Start Server with Sample Projects (loads project data)
echo 4. Start Server with Sample Messages (loads message data)
echo 5. Start Server with All Sample Data (projects and messages)
echo 6. Check MongoDB Status
echo 7. Start MongoDB (if installed)
echo 8. Reset (clean cache and fix port issues)
echo.
set /p choice="Enter your choice (1-8): "

if "%choice%"=="1" (
  echo Starting server with all links...
  node server.js
) else if "%choice%"=="2" (
  echo Starting server with global access...
  node server.js --global
) else if "%choice%"=="3" (
  echo Starting server and loading sample projects...
  node server.js --load-projects
) else if "%choice%"=="4" (
  echo Starting server and loading sample messages...
  node server.js --load-messages
) else if "%choice%"=="5" (
  echo Starting server and loading all sample data...
  node server.js --load-all
) else if "%choice%"=="6" (
  echo Checking MongoDB status...
  call :check_mongodb
  pause
  exit
) else if "%choice%"=="7" (
  echo Attempting to start MongoDB...
  call :start_mongodb
  pause
  exit
) else if "%choice%"=="8" (
  echo Resetting Next.js project...
  node reset-next.js
  echo Done! Now you can restart the server.
  pause
  exit
) else (
  echo Invalid choice. Starting standard server...
  node server.js
)

pause
exit /b

:check_mongodb
echo.
echo Checking if MongoDB is running...
echo.

sc query MongoDB > nul 2>&1
if %ERRORLEVEL% EQU 0 (
  echo MongoDB service is installed and status is:
  sc query MongoDB | findstr STATE
) else (
  echo MongoDB service is not installed as a Windows service.
  echo Checking for MongoDB process...
  tasklist /FI "IMAGENAME eq mongod.exe" 2>nul | find /i "mongod.exe" >nul
  if %ERRORLEVEL% EQU 0 (
    echo MongoDB is running as a process.
  ) else (
    echo MongoDB is NOT running.
    echo You need to start MongoDB before your portfolio database will work.
    echo Use option 7 to attempt to start MongoDB.
  )
)
exit /b

:start_mongodb
echo.
echo Attempting to start MongoDB...
echo.

rem Try to start as a service first
sc query MongoDB > nul 2>&1
if %ERRORLEVEL% EQU 0 (
  echo MongoDB service is installed. Attempting to start it...
  net start MongoDB
  if %ERRORLEVEL% EQU 0 (
    echo MongoDB service started successfully!
  ) else (
    echo Failed to start MongoDB service.
  )
) else (
  echo MongoDB service is not installed. Trying to start executable...
  
  rem Try common installation paths
  set MONGO_PATHS=^
  "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe" ^
  "C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" ^
  "C:\Program Files\MongoDB\Server\4.4\bin\mongod.exe" ^
  "C:\Program Files\MongoDB\Server\4.2\bin\mongod.exe"
  
  for %%p in (%MONGO_PATHS%) do (
    if exist %%p (
      echo Found MongoDB at: %%p
      echo Starting MongoDB...
      start "" %%p --dbpath="%USERPROFILE%\data\db"
      echo If this fails, you might need to create the data directory:
      echo mkdir %USERPROFILE%\data\db
      exit /b
    )
  )
  
  echo Could not find MongoDB executable in common locations.
  echo Please install MongoDB or start it manually.
)
exit /b 