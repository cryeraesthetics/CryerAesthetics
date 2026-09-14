// Tab bar icons, ported from the prototype's inline SVG paths.
interface IconProps { color: string; size?: number }

const wrap = (paths: string) => ({ __html: paths });

function Icon({ color, size = 20, paths }: IconProps & { paths: string }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth={2.75} strokeLinecap="round" strokeLinejoin="round"
      dangerouslySetInnerHTML={wrap(paths)}
    />
  );
}

export const HomeIcon = (p: IconProps) => <Icon {...p} paths='<path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9a1 1 0 0 0 1 1h3v-6h4v6h3a1 1 0 0 0 1-1v-9"/>' />;
export const GuideIcon = (p: IconProps) => <Icon {...p} paths='<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>' />;
export const ShopIcon = (p: IconProps) => <Icon {...p} paths='<circle cx="12" cy="12" r="9"/><path d="M9.4 9.2a2.7 2.7 0 0 1 5.2 1c0 1.8-2.6 2-2.6 3.6"/><circle cx="12" cy="17" r=".6"/>' />;
export const MeIcon = (p: IconProps) => <Icon {...p} paths='<circle cx="12" cy="8" r="3.6"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/>' />;
export const MoreIcon = (p: IconProps) => <Icon {...p} paths='<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>' />;
export const LockIcon = ({ color = 'var(--color-accent-2-700)', size = 16 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.75} strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="10" width="14" height="10" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
);
export const CheckIcon = ({ color = 'var(--color-accent-2-700)', size = 18 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.75} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12l5 5 11-11" />
  </svg>
);
