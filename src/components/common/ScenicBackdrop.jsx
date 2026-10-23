export default function ScenicBackdrop({ backdrop, loading = 'lazy' }) {
  if (!backdrop?.src) return null;

  return (
    <>
      <img className="scenic-section__image" src={backdrop.src} alt={backdrop.alt || ''} loading={loading} decoding="async" />
      <div className="scenic-section__overlay" aria-hidden="true" />
    </>
  );
}
