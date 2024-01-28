import { Route, Routes, useLocation } from 'react-router-dom';
import ProtectedRoute from './protected.route';
import { ROUTES } from './constants';
import Home from '@/Pages/Home';
import LeftSidebar from '@/Components/UI/left.sidebar';
import RightSidebar from '@/Components/UI/right.sidebar';
import Fab from '@/Components/UI/fab';
import Login from '@/Pages/Login';
import Chore from '@/Pages/Chore';
import Inventory from '@/Pages/Inventory';
import Vendor from '@/Pages/Vendor';
import Purchase from '@/Pages/Purchase';

const RoutesComponent = () => {
  const location = useLocation();
  const currentPathname = location.pathname;
  const isPrivatePage =
    !currentPathname.includes('login') && !currentPathname.includes('signup');
  return (
    <div className='main-layout'>
      {isPrivatePage ? (
        <div className='left-sidebar'>
          <LeftSidebar />
        </div>
      ) : null}
      <div className='main'>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.CHORE} element={<Chore />} />
            <Route path={ROUTES.INVENTORY} element={<Inventory />} />
            <Route path={ROUTES.VENDOR} element={<Vendor />} />
            <Route path={ROUTES.ADJUSTMENT} element={<Purchase />} />
          </Route>
        </Routes>

        {isPrivatePage ? <Fab /> : null}
      </div>
      {isPrivatePage ? (
        <div className='right-sidebar'>
          <RightSidebar />
        </div>
      ) : null}
    </div>
  );
};

export default RoutesComponent;
