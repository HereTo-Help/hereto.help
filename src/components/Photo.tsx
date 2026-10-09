import { getImage } from '../services/content';

export function Photo({
  image,
  className = '',
  priority = false,
  sizes = '(max-width: 600px) 100vw, 50vw',
}: {
  image: Parameters<typeof getImage>[0];
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const photo = getImage(image);
  const base = `${import.meta.env.BASE_URL}images/${photo.file}`;
  return (
    <img
      className={`editorial-photo ${className}`}
      src={`${base}-1200.webp`}
      srcSet={`${base}-600.webp 600w, ${base}-1200.webp 1200w, ${base}-1536.webp 1536w`}
      sizes={sizes}
      alt={photo.alt}
      width={1536}
      height={1024}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      style={{ objectPosition: photo.position }}
    />
  );
}
