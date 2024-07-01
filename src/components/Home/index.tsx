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
import { Box, Stack } from '@mui/material';
import Footer from './Footer';
import Account from 'components/Account';
import Notifications from 'components/Notifications';

const Home = () => {
  const router = useRouter();

  const routerComponents: any = {
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

      <Stack direction={'row'} height={'100%'}>
        <HomeSidebar />

        <Box width={'100%'}>
          {routerComponents[router.pathname] || null}

          <Box>
            <Footer />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default Home;
