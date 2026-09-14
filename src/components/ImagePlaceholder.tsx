interface Props {
  label: string;
  radius?: number;
  shape?: 'rounded' | 'circle';
  style?: React.CSSProperties;
  src?: string;
  fit?: 'cover' | 'contain';
}

// A decorative content placeholder for imagery the client hasn't supplied
// yet (skin-type photos, book covers). Renders the real image when `src`
// is given; otherwise a soft labeled box so the layout reads intentionally
// rather than as a broken image.
export default function ImagePlaceholder({ label, radius = 12, shape = 'rounded', style, src, fit = 'cover' }: Props) {
  const borderRadius = shape === 'circle' ? '50%' : radius;
  if (src) {
    return (
      <div className="image-slot" style={{ borderRadius, ...style }}>
        <img src={src} alt={label} style={{ objectFit: fit }} />
      </div>
    );
  }
  return (
    <div className="image-slot" style={{ borderRadius, cursor: 'default', ...style }}>
      {label}
    </div>
  );
}
