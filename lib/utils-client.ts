/**
 * Client-side utilities that require window object
 */

/**
 * Get the correct base path for assets based on the current environment
 * @returns The base path for the current environment
 */
export function getBasePath(): string {
  if (typeof window === 'undefined') return '';
  
  // Check if we're on GitHub Pages
  const isGitHubPages = window.location.hostname === 'psyodrz.github.io';
  return isGitHubPages ? '/psyodrz' : '';
}

/**
 * Get the full URL for a public asset
 * @param path - The path to the asset (should start with /)
 * @returns The full URL to the asset
 */
export function getAssetUrl(path: string): string {
  const basePath = getBasePath();
  return `${basePath}${path}`;
}

/**
 * Check if the current device is a mobile device
 * @returns True if the device is mobile
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Download a file with mobile fallback
 * @param url - The URL of the file to download
 * @param filename - The filename for the download
 */
export function downloadFile(url: string, filename: string): void {
  const fullUrl = url.startsWith('http') ? url : getAssetUrl(url);
  
  if (isMobileDevice()) {
    // On mobile, open in new tab (more reliable)
    window.open(fullUrl, '_blank');
  } else {
    // On desktop, trigger download
    const link = document.createElement('a');
    link.href = fullUrl;
    link.download = filename;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
