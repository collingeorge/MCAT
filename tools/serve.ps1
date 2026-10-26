# Minimal static file server for local testing: pwsh -File tools/serve.ps1 [-Port 8080]
param([int]$Port = 8080, [string]$Root = (Split-Path $PSScriptRoot))
$types = @{ '.html'='text/html; charset=utf-8'; '.js'='text/javascript; charset=utf-8'; '.css'='text/css; charset=utf-8'; '.json'='application/json'; '.svg'='image/svg+xml'; '.png'='image/png'; '.webmanifest'='application/manifest+json'; '.md'='text/plain; charset=utf-8' }
$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "Serving $Root at http://localhost:$Port/"
while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $rel = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath.TrimStart('/'))
  if ($rel -eq '' -or $rel.EndsWith('/')) { $rel += 'index.html' }
  $path = [IO.Path]::GetFullPath((Join-Path $Root $rel))
  if ($path.StartsWith($Root) -and (Test-Path $path -PathType Leaf)) {
    $bytes = [IO.File]::ReadAllBytes($path)
    $ext = [IO.Path]::GetExtension($path).ToLower()
    $ctx.Response.ContentType = $types[$ext] ?? 'application/octet-stream'
    $ctx.Response.Headers.Add('Cache-Control', 'no-store')
    $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  } else { $ctx.Response.StatusCode = 404 }
  $ctx.Response.Close()
  Write-Host "$($ctx.Response.StatusCode) /$rel"
}
