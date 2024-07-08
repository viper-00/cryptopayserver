import MetaTags from 'components/Common/MetaTags';
import HomeSidebar from 'components/Sidebar';
import { useRouter } from 'next/router';
import Dashboard from 'components/Dashboard';
import Settings from 'components/Settings';
import Bitcoin from 'components/Wallet/Bitcoin';
import Lightning from 'components/Wallet/Bitcoin/lightning';
import Invoices from 'components/Payments/Invoices';
import Reporting from 'components/Payments/Reporting';
import Requests from 'components/Payments/Requests';
import Pullpayments from 'components/Payments/Pullpayments';
import Payouts from 'components/Payments/Payouts';
import Shopify from 'components/Plugins/Shopify';
import Pointofsale from 'components/Plugins/Pointofsale';
import Paybutton from 'components/Plugins/Paybutton';
import Crowdfund from 'components/Plugins/Crowdfund';
import { Alert, Box, Snackbar, Stack } from '@mui/material';
import Footer from './Footer';
import Account from 'components/Account';
import Notifications from 'components/Notifications';
import { useEffect, useState } from 'react';
import Login from 'components/Login';
import Register from 'components/Register';
import CreateStore from 'components/Stores/create';
import { useSnackPresistStore } from 'lib/store/snack';
import { useUserPresistStore } from 'lib/store/user';

const Home = () => {
  const router = useRouter();

  const { snackOpen, snackMessage, snackSeverity, setSnackOpen } = useSnackPresistStore((state) => state);
  const { userEmail } = useUserPresistStore((state) => state);

  const [login, setLogin] = useState<boolean>(false);

  const unLoginWhiteList: any = {
    '/login': true,
    '/register': true,
    '/stores/create': true,
  };

  useEffect(() => {
    const isLogin = userEmail !== '';
    setLogin(isLogin);

    if (isLogin && router.pathname === '/') {
      window.location.href = '/dashboard';
      return;
    }

    if (!isLogin) {
      if (unLoginWhiteList[router.pathname]) {
        return;
      }

      if (router.pathname !== '/login') {
        window.location.href = '/login';
        return;
      }
    }
  }, [router.pathname]);

  const routerComponents: any = {
    '/login': <Login />,
    '/register': <Register />,
    '/stores/create': <CreateStore />,

    '/dashboard': <Dashboard />,
    '/settings': <Settings />,
    '/wallet/bitcoin': <Bitcoin />,
    '/wallet/bitcoin/lightning': <Lightning />,
    '/payments/invoices': <Invoices />,
    '/payments/reporting': <Reporting />,
    '/payments/requests': <Requests />,
    '/payments/pullpayments': <Pullpayments />,
    '/payments/payouts': <Payouts />,
    '/plugins/shopify': <Shopify />,
    '/plugins/pointofsale': <Pointofsale />,
    '/plugins/paybutton': <Paybutton />,
    '/plugins/crowdfund': <Crowdfund />,
    '/account': <Account />,
    '/notifications': <Notifications />,
  };

  return (
    <Box height={'100%'}>
      <MetaTags title="Home" />

      {login ? (
        <>
          <Stack direction={'row'} height={'100%'}>
            <HomeSidebar />

            <Box width={'100%'}>
              {routerComponents[router.pathname] || null}

              <Box>
                <Footer />
              </Box>
            </Box>
          </Stack>
        </>
      ) : (
        <>
          <Box width={'100%'}>
            {routerComponents[router.pathname] || null}

            <Box>
              <Footer />
            </Box>
          </Box>
        </>
      )}

      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={snackOpen}>
        <Alert
          onClose={() => {
            setSnackOpen(false);
          }}
          severity={snackSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Home;
