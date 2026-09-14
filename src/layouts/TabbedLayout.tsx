import { Outlet } from 'react-router-dom';
import AppFrame from '../components/AppFrame';
import TabBar from '../components/TabBar';

export default function TabbedLayout() {
  return (
    <AppFrame>
      <div className="app-scroll">
        <Outlet />
      </div>
      <TabBar />
    </AppFrame>
  );
}
