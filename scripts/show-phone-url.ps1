# Показати URL для телефону (без прав адміна)
$ips = Get-NetIPAddress -AddressFamily IPv4 | Where-Object {
  $_.IPAddress -notlike "127.*" -and $_.PrefixOrigin -ne "WellKnown"
} | Select-Object -ExpandProperty IPAddress -Unique

Write-Host "npm run dev має бути запущений."
Write-Host ""
if ($ips) {
  foreach ($ip in $ips) {
    Write-Host "  https://${ip}:5173/"
  }
} else {
  Write-Host "  Дивіться рядок Network у терміналі після npm run dev"
}
