$p = (Get-NetTCPConnection -LocalPort 3120 -State Listen -ErrorAction SilentlyContinue).OwningProcess | Select-Object -Unique
if ($p) { Stop-Process -Id $p -Force }
Start-Process -FilePath "cmd.exe" -ArgumentList "/c","npx next start -p 3120 > scripts\_tmp_orphan\srv.log 2>&1" -WorkingDirectory "C:\Projects\Toyo-app" -WindowStyle Hidden
