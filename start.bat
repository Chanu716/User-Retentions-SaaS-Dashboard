@echo off
echo ====================================
echo  User Retention SaaS Dashboard
echo  Starting Servers...
echo ====================================
echo.

REM Start JSON Server in a new window
echo Starting JSON Server on port 5000...
start "JSON Server" cmd /k "npx json-server db.json --port 5000"

REM Wait 3 seconds for JSON Server to start
timeout /t 3 /nobreak > nul

REM Start React App in a new window
echo Starting React App on port 3000...
start "React App" cmd /k "npm start"

echo.
echo ====================================
echo  Servers Started!
echo  - JSON Server: http://localhost:5000
echo  - React App: http://localhost:3000
echo ====================================
echo.
echo Press any key to exit this window...
pause > nul
