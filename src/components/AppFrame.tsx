import type { ReactNode } from 'react';

export default function AppFrame({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <div className="app-frame">{children}</div>
    </div>
  );
}
