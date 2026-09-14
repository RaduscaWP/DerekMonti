import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Button({
  children,
  href,
  to,
  type = 'button',
  variant = 'primary',
  size = 'md',
  icon = true,
  className = '',
  ...props
}) {
  const classes = `btn btn--${variant} btn--${size} ${className}`.trim();

  if (to) {
    return (
      <Link className={classes} to={to} {...props}>
        <span>{children}</span>
        {icon && <ArrowRight aria-hidden="true" size={18} strokeWidth={2.1} />}
      </Link>
    );
  }

  if (href) {
    const external = /^https?:\/\//.test(href);
    const linkProps = external && props.target === '_blank' ? { rel: 'noopener noreferrer' } : {};
    return (
      <a className={classes} href={href} {...linkProps} {...props}>
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
