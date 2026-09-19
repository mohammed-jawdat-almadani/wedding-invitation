@echo off
title Melisa ve Kerem - Dugun Davetiyesi
echo ========================================================
echo   Melisa ve Kerem - Dugun Davetiyesi (Lacy Deluxe)
echo   Sunucu Baslatiliyor...
echo ========================================================
start "" http://localhost:5173/
npx vite preview --port 5173 --host 127.0.0.1
pause
