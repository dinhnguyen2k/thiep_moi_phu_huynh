$ErrorActionPreference = 'Stop'

Set-Location "$PSScriptRoot\.."
Add-Type -AssemblyName System.Drawing

$collagePath = 'ChatGPT Image May 15, 2026, 01_11_05 AM.png'
$scenePath = 'ChatGPT Image May 15, 2026, 01_31_17 AM.png'

$stickerDir = 'public/assets/stickers'
if (-not (Test-Path $stickerDir)) {
  New-Item -ItemType Directory -Path $stickerDir -Force | Out-Null
}

$collage = [System.Drawing.Bitmap]::new($collagePath)

function Save-Sticker {
  param(
    [string]$Name,
    [int]$X,
    [int]$Y,
    [int]$W,
    [int]$H
  )

  $rect = [System.Drawing.Rectangle]::new($X, $Y, $W, $H)
  $target = [System.Drawing.Bitmap]::new($W, $H, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($target)
  $g.Clear([System.Drawing.Color]::Transparent)
  $g.DrawImage($collage, [System.Drawing.Rectangle]::new(0, 0, $W, $H), $rect, [System.Drawing.GraphicsUnit]::Pixel)
  $g.Dispose()

  $bg = $collage.GetPixel(0, 0)
  $visited = New-Object 'bool[,]' $W, $H
  $q = New-Object 'System.Collections.Generic.Queue[System.Drawing.Point]'

  function Try-ClearBg([int]$Px, [int]$Py) {
    if ($Px -lt 0 -or $Py -lt 0 -or $Px -ge $W -or $Py -ge $H) { return }
    if ($visited[$Px, $Py]) { return }

    $visited[$Px, $Py] = $true
    $c = $target.GetPixel($Px, $Py)

    $isBg = (
      [Math]::Abs($c.R - $bg.R) -le 30 -and
      [Math]::Abs($c.G - $bg.G) -le 30 -and
      [Math]::Abs($c.B - $bg.B) -le 30
    )

    if ($isBg) {
      $target.SetPixel($Px, $Py, [System.Drawing.Color]::FromArgb(0, $c.R, $c.G, $c.B))
      $q.Enqueue([System.Drawing.Point]::new($Px, $Py))
    }
  }

  for ($i = 0; $i -lt $W; $i++) {
    Try-ClearBg $i 0
    Try-ClearBg $i ($H - 1)
  }

  for ($j = 0; $j -lt $H; $j++) {
    Try-ClearBg 0 $j
    Try-ClearBg ($W - 1) $j
  }

  while ($q.Count -gt 0) {
    $p = $q.Dequeue()
    Try-ClearBg ($p.X + 1) $p.Y
    Try-ClearBg ($p.X - 1) $p.Y
    Try-ClearBg $p.X ($p.Y + 1)
    Try-ClearBg $p.X ($p.Y - 1)
  }

  $outPath = Join-Path $stickerDir $Name
  $tmpPath = "$outPath.tmp.png"
  $target.Save($tmpPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $target.Dispose()
  Move-Item -Path $tmpPath -Destination $outPath -Force
}

# Existing stickers (recreated for consistency)
Save-Sticker -Name 'snoopy-skate.png' -X 48 -Y 40 -W 390 -H 330
Save-Sticker -Name 'snoopy-sleep.png' -X 736 -Y 40 -W 430 -H 300
Save-Sticker -Name 'woodstock.png' -X 45 -Y 340 -W 360 -H 320

# New stickers
Save-Sticker -Name 'snoopy-hug-woodstock.png' -X 370 -Y 30 -W 390 -H 320
Save-Sticker -Name 'snoopy-pilot.png' -X 1110 -Y 20 -W 360 -H 320
Save-Sticker -Name 'snoopy-blue-bear.png' -X 1110 -Y 330 -W 380 -H 330
Save-Sticker -Name 'snoopy-hoodie.png' -X 1110 -Y 650 -W 380 -H 330
Save-Sticker -Name 'snoopy-lie.png' -X 40 -Y 650 -W 430 -H 330

$collage.Dispose()

# Replace moon asset with a fresh circular cutout from the new source image
$scene = [System.Drawing.Bitmap]::new($scenePath)
$moonRect = [System.Drawing.Rectangle]::new(428, 342, 680, 680)
$moon = [System.Drawing.Bitmap]::new(680, 680, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gm = [System.Drawing.Graphics]::FromImage($moon)
$gm.Clear([System.Drawing.Color]::Transparent)
$gm.DrawImage($scene, [System.Drawing.Rectangle]::new(0, 0, 680, 680), $moonRect, [System.Drawing.GraphicsUnit]::Pixel)
$gm.Dispose()

$cx = 339.5
$cy = 339.5
$r = 334.0

for ($y = 0; $y -lt 680; $y++) {
  for ($x = 0; $x -lt 680; $x++) {
    $dx = $x - $cx
    $dy = $y - $cy
    $distance = [Math]::Sqrt($dx * $dx + $dy * $dy)
    if ($distance -gt $r) {
      $p = $moon.GetPixel($x, $y)
      $moon.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, $p.R, $p.G, $p.B))
    }
  }
}

$moonTmp = 'public/assets/moon.tmp.png'
$moon.Save($moonTmp, [System.Drawing.Imaging.ImageFormat]::Png)
$moon.Dispose()
$scene.Dispose()
Move-Item -Path $moonTmp -Destination 'public/assets/moon.png' -Force

Write-Output 'Asset cut completed.'
