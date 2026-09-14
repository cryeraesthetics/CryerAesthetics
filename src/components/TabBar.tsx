import { useLocation, useNavigate } from 'react-router-dom';
import { HomeIcon, GuideIcon, ShopIcon, MeIcon, MoreIcon } from './icons';

const TABS = [
  { path: '/', label: 'Home', Icon: HomeIcon },
  { path: '/guide', label: 'Guide', Icon: GuideIcon },
  { path: '/faq', label: 'FAQ', Icon: ShopIcon },
  { path: '/me', label: 'Me', Icon: MeIcon },
  { path: '/more', label: 'More', Icon: MoreIcon },
];

export default function TabBar() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="tab-bar">
      {TABS.map((tab) => {
        const active = tab.path === '/' ? location.pathname === '/' : location.pathname.startsWith(tab.path);
        const color = active ? 'var(--color-accent-2-700)' : 'color-mix(in srgb, var(--color-text) 45%, transparent)';
        return (
          <button key={tab.path} className="tab-bar-item" style={{ color }} onClick={() => navigate(tab.path)}>
            <tab.Icon color={color} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
