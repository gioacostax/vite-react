import { NavLink, Outlet, useNavigation } from 'react-router';

import LoaderComponent from '@/shared/components/loader/loader';

const RootLayout = () => {
  const navigation = useNavigation();

  const isLoading = navigation.state === 'loading';

  return (
    <>
      <header>
        <NavLink to="/lazy">Lazy</NavLink>
      </header>

      <main>{isLoading ? <LoaderComponent /> : <Outlet />}</main>
    </>
  );
};

export default RootLayout;
