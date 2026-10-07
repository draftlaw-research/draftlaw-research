import type { ImageMetadata } from 'astro';

// Images are referenced in article files by path, e.g. /src/assets/covers/x.jpg.
// This keeps article files simple enough to edit from a form.
const covers = import.meta.glob<ImageMetadata>('/src/assets/covers/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
});
const photos = import.meta.glob<ImageMetadata>('/src/assets/authors/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
});

export function getCover(path?: string): ImageMetadata {
  const found = path ? covers[path] : undefined;
  if (path && !found) console.warn(`[images] Cover not found: ${path}. Using the default cover.`);
  return found ?? covers['/src/assets/covers/default.jpg'];
}

export function getPhoto(path?: string): ImageMetadata | undefined {
  return path ? photos[path] : undefined;
}
