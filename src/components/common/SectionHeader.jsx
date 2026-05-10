export default function SectionHeader({ eyebrow, title, text, align = 'center', light = false }) {
  return (
    <div className={`section-header section-header--${align} ${light ? 'section-header--light' : ''}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}
