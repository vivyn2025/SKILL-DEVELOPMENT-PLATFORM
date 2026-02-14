@echo off
echo ========================================
echo SKILL Platform - MongoDB Quick Setup
echo ========================================
echo.

:: Check if MongoDB is running
echo [1/5] Checking MongoDB connection...
echo.

:: Navigate to backend
cd backend

:: Check if node_modules exists
if not exist "node_modules" (
    echo [2/5] Installing backend dependencies...
    call npm install
    echo.
) else (
    echo [2/5] Backend dependencies already installed
    echo.
)

:: Check if mongoose is installed
echo [3/5] Installing mongoose...
call npm install mongoose
echo.

:: Check if .env exists
if not exist ".env" (
    echo [4/5] Creating .env file...
    (
        echo MONGODB_URI=mongodb://localhost:27017/skill_platform
        echo JWT_SECRET=dev_secret_change_me_in_production
        echo PORT=4000
    ) > .env
    echo .env file created!
    echo.
) else (
    echo [4/5] .env file already exists
    echo.
)

:: Seed database
echo [5/5] Seeding database...
echo This will populate your MongoDB with sample data
echo.
node seed.js

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo To start the backend server, run:
echo   cd backend
echo   node index-mongodb.js
echo.
echo To start the frontend (in a new terminal):
echo   cd frontend
echo   npm install
echo   npm run dev
echo.
echo Test Credentials:
echo   Student: test@example.com / test123
echo   Admin: admin@example.com / admin123
echo.
echo ========================================
pause
