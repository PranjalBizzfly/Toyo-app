$svgs = Get-ChildItem -Path "public/images" -Filter "*.svg" -Recurse
$invalidCount = 0
$validCount = 0

foreach ($file in $svgs) {
    $content = Get-Content -Path $file.FullName -Raw
    $xmlDoc = New-Object System.Xml.XmlDocument
    try {
        $xmlDoc.LoadXml($content)
        $validCount++
    }
    catch {
        $invalidCount++
        Write-Host "INVALID: $($file.FullName)"
        Write-Host "   $($_.Exception.Message)"
    }
}

Write-Host "Summary: $validCount valid, $invalidCount invalid"
