# Запустіть PowerShell **від імені адміністратора**, потім:
#   cd D:\GitHub\Kamianets_Deer
#   .\scripts\open-firewall-port-5173.ps1

$ruleName = "Kamianets Deer Vite 5173"

$existing = Get-NetFirewallRule -DisplayName $ruleName -ErrorAction SilentlyContinue
if ($existing) {
  Write-Host "Правило вже існує: $ruleName"
} else {
  New-NetFirewallRule -DisplayName $ruleName -Direction Inbound -Action Allow -Protocol TCP -LocalPort 5173 | Out-Null
  Write-Host "Додано правило файрволу для порту 5173."
}

Write-Host ""
Write-Host "На телефоні відкрийте (замініть IP, якщо інший):"
$ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object {
    $_.InterfaceAlias -notmatch "Loopback" -and $_.IPAddress -like "192.168.*"
  } | Select-Object -First 1).IPAddress
if ($ip) {
  Write-Host "  https://${ip}:5173/"
} else {
  Write-Host "  http://<IP-вашого-ПК>:5173/"
  Write-Host "  IP дивіться у виводі npm run dev (рядок Network)."
}
