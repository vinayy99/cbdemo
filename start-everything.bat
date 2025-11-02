@echo off
echo ========================================
echo Starting CollabMate - Full Stack App
echo ========================================
echo.

REM Get the current directory
cd /d "%~dp0"

echo Current directory: %CD%
echo.

echo Starting MySQL...
net start MySQL80 2>nul
if errorlevel 1 (
    echo MySQL is already running or cannot be started
)
echo.

echo [1/3] Starting Backend Server...
cd backend
start "CollabMate Backend" cmd /k "cd /d %~dp0backend & npm run dev"
cd ..

timeout /t 5 >nul

echo.
echo [2/3] Starting Frontend Server...
start "CollabMate Frontend" cmd /k "cd /d %~dp0 & npm run dev"

echo.
echo [3/3] Opening browser...
timeout /t 8 >nul
start http://localhost:5173

echo.
echo ========================================
echo CollabMate is starting!
echo ========================================
echo.
echo Backend: http://localhost:3001
echo Frontend: http://localhost:5173
echo.
echo Two windows have opened - one for backend, one for frontend
echo Keep both windows open!
echo.
echo Press any key to close this setup window...
pause >nul

