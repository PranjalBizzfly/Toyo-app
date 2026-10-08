$svgs = Get-ChildItem -Path "public/images" -Filter "*.svg" -Recurse
$invalidCount = 0
$validCount = 0

foreach ($file in $svgs) {
    $content = Get-Content -Path $file.FullName -Raw
    # replace bare ampersands
    $contentFixed = [regex]::Replace($content, '&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)', '&amp;')
    $xmlDoc = New-Object System.Xml.XmlDocument
    try {
        $xmlDoc.LoadXml($contentFixed)
        $validCount++
    }
    catch {
        $invalidCount++
        Write-Host "STILL INVALID: $($file.FullName)"
        Write-Host "   $($_.Exception.Message)"
    }
}

Write-Host "Summary with fixed ampersands: $validCount valid, $invalidCount invalid"
