import React from 'react';

/**
 * Fallback luxury image if any asset fails to load
 */
export const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';

// Graceful SVG placeholder if external internet fails
export const SVG_PLACEHOLDER =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800"><rect width="600" height="800" fill="%23f7f4ee"/><text x="50%" y="48%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20" fill="%238a7968" font-weight="600" letter-spacing="2">BRITHI BOUTIQUE</text><text x="50%" y="53%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="13" fill="%23a89a8c" letter-spacing="1">Luxury Pakistani Lawn</text></svg>';

/**
 * Resolves any image URL appropriately across:
 * - Local Dev Server (Vite + Express)
 * - Cloud Run container preview
 * - GitHub Pages subpath (e.g., https://username.github.io/repo-name/)
 * - External URLs (Unsplash, Cloudinary, etc.)
 */
export function getImageUrl(path?: string | null): string {
  if (!path || typeof path !== 'string') {
    return FALLBACK_IMAGE;
  }

  const trimmed = path.trim();
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('blob:')
  ) {
    return trimmed;
  }

  // Normalize any references to Morja volume 7 folder or clean folder
  let normalized = trimmed;
  if (normalized.includes('Morja, by gulljee volume 7')) {
    normalized = normalized.replace('Morja, by gulljee volume 7', 'Morja');
  }

  // Strip leading slash so it binds seamlessly with Vite base
  const cleanPath = normalized.replace(/^\/+/, '');

  // Retrieve base URL from Vite (defaults to './' or '/' or '/<repo>/')
  const rawBase = (import.meta as { env?: { BASE_URL?: string } }).env?.BASE_URL || './';
  const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;

  return `${base}${cleanPath}`;
}

/**
 * Error handler to prevent broken image icons in UI
 */
export function handleImageError(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  fallback = FALLBACK_IMAGE
) {
  const target = e.currentTarget;
  if (!target.dataset.hasRetried) {
    target.dataset.hasRetried = 'true';
    target.src = fallback;
  } else if (!target.dataset.hasSvgFallback) {
    target.dataset.hasSvgFallback = 'true';
    target.src = SVG_PLACEHOLDER;
  }
}
