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
  const { getIsLogin } = useUserPresistStore((state) => state);

  const [isLogin, setLogin] = useState<boolean>(false);

  const unLoginWhiteList: any = {
    '/login': <Login />,
    '/register': <Register />,
  };

  const loginWhiteList: any = {
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

  const allPageWhiteList: any = {
    '/stores/create': true,
  };

  useEffect(() => {
    setLogin(getIsLogin());

    // console.log('sdfsdf', getIsLogin());

    if (getIsLogin()) {
      if (router.pathname === '/') {
        window.location.href = '/dashboard';
        return;
      }

      if (unLoginWhiteList[router.pathname]) {
        window.location.href = '/';
        return;
      }
    } else {
      if (loginWhiteList[router.pathname]) {
        window.location.href = '/login';
        return;
      }
      // if (unLoginWhiteList[router.pathname]) {
      //   console.log('sdfsd1f', isLogin);

      //   return;
      // }

      // console.log('sdfs2df', isLogin);

      // if (router.pathname !== '/login') {
      //   window.location.href = '/login';
      //   return;
      // }
    }
  }, [router.pathname]);

  return (
    <Box height={'100%'}>
      <MetaTags title="Home" />

      {isLogin ? (
        <>
          <Stack direction={'row'} height={'100%'}>
            {allPageWhiteList[router.pathname] ? null : <HomeSidebar />}

            <Box width={'100%'}>
              {loginWhiteList[router.pathname] || null}

              <Box>
                <Footer />
              </Box>
            </Box>
          </Stack>
        </>
      ) : (
        <>
          <Box width={'100%'}>
            {unLoginWhiteList[router.pathname] || null}
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
