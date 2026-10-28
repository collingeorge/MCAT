# Minimal static file server for local testing: pwsh -File tools/serve.ps1 [-Port 8080]
param([int]$Port = 8080, [string]$Root = (Split-Path $PSScriptRoot))
$types = @{ '.html'='text/html; charset=utf-8'; '.js'='text/javascript; charset=utf-8'; '.css'='text/css; charset=utf-8'; '.json'='application/json'; '.svg'='image/svg+xml'; '.png'='image/png'; '.webmanifest'='application/manifest+json'; '.md'='text/plain; charset=utf-8' }
$rootFull = [IO.Path]::GetFullPath($Root)
$rootPrefix = $rootFull.TrimEnd([char[]]@('\', '/')) + [IO.Path]::DirectorySeparatorChar
$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "Serving $Root at http://localhost:$Port/"
while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  try {
    if ($ctx.Request.HttpMethod -notin @('GET', 'HEAD')) {
      $ctx.Response.StatusCode = 405
      $ctx.Response.Headers.Add('Allow', 'GET, HEAD')
    } else {
      $rel = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath.TrimStart('/'))
      if ($rel -eq '' -or $rel.EndsWith('/')) { $rel += 'index.html' }
      $path = [IO.Path]::GetFullPath((Join-Path $rootFull $rel))
      $inside = $path.StartsWith($rootPrefix, [StringComparison]::OrdinalIgnoreCase)
      $private = $rel -match '(^|[\\/])\.'
      if ($inside -and -not $private -and (Test-Path -LiteralPath $path -PathType Leaf)) {
        $bytes = [IO.File]::ReadAllBytes($path)
        $ext = [IO.Path]::GetExtension($path).ToLowerInvariant()
        $ctx.Response.ContentType = $types[$ext] ?? 'application/octet-stream'
        $ctx.Response.Headers.Add('Cache-Control', 'no-store')
        $ctx.Response.Headers.Add('X-Content-Type-Options', 'nosniff')
        $ctx.Response.ContentLength64 = $bytes.Length
        if ($ctx.Request.HttpMethod -ne 'HEAD') { $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length) }
      } else { $ctx.Response.StatusCode = 404 }
    }
  } catch { $ctx.Response.StatusCode = 400 }
  finally { $ctx.Response.Close() }
}
