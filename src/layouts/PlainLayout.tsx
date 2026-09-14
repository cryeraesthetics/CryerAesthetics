import { Outlet } from 'react-router-dom';
import AppFrame from '../components/AppFrame';

export default function PlainLayout() {
  return (
    <AppFrame>
      <div className="app-scroll">
        <Outlet />
      </div>
    </AppFrame>
  );
}
