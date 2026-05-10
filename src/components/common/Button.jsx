import { ArrowRight } from 'lucide-react';

export default function Button({
  children,
  href,
  type = 'button',
  variant = 'primary',
  size = 'md',
  icon = true,
  className = '',
  ...props
}) {
  const classes = `btn btn--${variant} btn--${size} ${className}`.trim();

  if (href) {
    return (
      <a className={classes} href={href} {...props}>
        <span>{children}</span>
        {icon && <ArrowRight aria-hidden="true" size={18} strokeWidth={2.1} />}
      </a>
    );
  }

  return (
    <button className={classes} type={type} {...props}>
      <span>{children}</span>
      {icon && <ArrowRight aria-hidden="true" size={18} strokeWidth={2.1} />}
    </button>
  );
}
