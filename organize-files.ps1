# File Organization Script for Next.js Animation Project

Write-Host "Starting file organization..." -ForegroundColor Green

# Create proper folder structure
$folders = @(
    "client\animations\background",
    "client\animations\counters", 
    "client\animations\sliders",
    "client\components\ui\breadcrumbs",
    "client\components\ui\buttons", 
    "client\components\ui\cards",
    "client\components\ui\loading",
    "client\components\ui\scroll",
    "client\components\sections\hero",
    "client\components\sections\gallery", 
    "client\components\sections\stats",
    "client\components\sections\showcase"
)

foreach ($folder in $folders) {
    if (!(Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder -Force | Out-Null
        Write-Host "Created folder: $folder" -ForegroundColor Yellow
    }
}

# Move animation-related files
$animationMoves = @{
    "client\components\HeroBackground.tsx" = "client\animations\background\"
    "client\components\AnimatedCounter.tsx" = "client\animations\counters\"
    "client\components\EnhancedImageSlider.tsx" = "client\animations\sliders\"
    "client\components\EnhancedPerformanceOptimizer.tsx" = "client\animations\utils\"
    "client\components\FinalOptimizations.tsx" = "client\animations\utils\"
}

foreach ($move in $animationMoves.GetEnumerator()) {
    if (Test-Path $move.Key) {
        Move-Item $move.Key $move.Value -Force
        Write-Host "Moved: $($move.Key) -> $($move.Value)" -ForegroundColor Cyan
    }
}

# Move UI components
$uiMoves = @{
    "client\components\AnimatedBreadcrumb.tsx" = "client\components\ui\breadcrumbs\"
    "client\components\ConditionalBreadcrumb.tsx" = "client\components\ui\breadcrumbs\"
    "client\components\SimpleBreadcrumb.tsx" = "client\components\ui\breadcrumbs\"
    "client\components\Loading.tsx" = "client\components\ui\loading\"
    "client\components\ScrollToTop.tsx" = "client\components\ui\scroll\"
    "client\components\ScrollManager.tsx" = "client\components\ui\scroll\"
    "client\components\TeacherCard.tsx" = "client\components\ui\cards\"
}

foreach ($move in $uiMoves.GetEnumerator()) {
    if (Test-Path $move.Key) {
        Move-Item $move.Key $move.Value -Force
        Write-Host "Moved: $($move.Key) -> $($move.Value)" -ForegroundColor Cyan
    }
}

# Move section components
$sectionMoves = @{
    "client\components\EnhancedHeroSection.tsx" = "client\components\sections\hero\"
    "client\components\ModernHeroSection.tsx" = "client\components\sections\hero\"
    "client\components\HeroSlider.tsx" = "client\components\sections\hero\"
    "client\components\PhotoGallery.tsx" = "client\components\sections\gallery\"
    "client\components\ImageShowcase.tsx" = "client\components\sections\showcase\"
    "client\components\StatsSection.tsx" = "client\components\sections\stats\"
}

foreach ($move in $sectionMoves.GetEnumerator()) {
    if (Test-Path $move.Key) {
        Move-Item $move.Key $move.Value -Force
        Write-Host "Moved: $($move.Key) -> $($move.Value)" -ForegroundColor Cyan
    }
}

# Move layout components (if not already moved)
$layoutMoves = @{
    "client\components\Footer.tsx" = "client\components\layout\"
    "client\components\Navigation.tsx" = "client\components\layout\"
    "client\components\Layout.tsx" = "client\components\layout\"
    "client\components\ThemeProvider.tsx" = "client\components\layout\"
}

foreach ($move in $layoutMoves.GetEnumerator()) {
    if (Test-Path $move.Key) {
        Move-Item $move.Key $move.Value -Force
        Write-Host "Moved: $($move.Key) -> $($move.Value)" -ForegroundColor Cyan
    }
}

Write-Host "File organization completed!" -ForegroundColor Green
Write-Host "Please review the new structure and update any import paths as needed." -ForegroundColor Yellow
