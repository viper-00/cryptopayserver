import MetaTags from 'components/Common/MetaTags';
import HomeSidebar from 'components/Sidebar';
import { useRouter } from 'next/router';
import Dashboard from 'components/Dashboard';
import Settings from 'components/Settings';
import Bitcoin from 'components/Wallet/Bitcoin';
import Lightning from 'components/Wallet/Bitcoin/Lightning';
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
import CreateStore from 'components/Stores/Create';
import CreateWallet from 'components/Wallets/Create';
import WalletImport from 'components/Wallets/Import';
import GenerateWallet from 'components/Wallets/Generate';
import SetPassword from 'components/Wallets/SetPassword';
import PhraseIntro from 'components/Wallets/Phrase/Intro';
import PhraseBackup from 'components/Wallets/Phrase/Backup';
import PhraseBackupConfirm from 'components/Wallets/Phrase/Backup/Confirm';
import { useWalletPresistStore, useSnackPresistStore, useUserPresistStore, useStorePresistStore } from 'lib/store';
import ImportMnemonicPhraseOrPrivateKey from 'components/Wallets/Import/MnemonicPhraseOrPrivateKey';

const Home = () => {
  const router = useRouter();

  const { snackOpen, snackMessage, snackSeverity, setSnackOpen } = useSnackPresistStore((state) => state);
  const { getIsLogin, resetUser } = useUserPresistStore((state) => state);
  const { getIsWallet, resetWallet } = useWalletPresistStore((state) => state);
  const { resetStore } = useStorePresistStore((state) => state);

  const [isLogin, setLogin] = useState<boolean>(false);
  // const [isWallet, setWallet] = useState<boolean>(false);

  const unLoginWhiteList: any = {
    '/login': <Login />,
    '/register': <Register />,
  };

  const loginWhiteList: any = {
    '/': <Dashboard />,
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

    '/stores/create': <CreateStore />,
    '/wallets/create': <CreateWallet />,
    '/wallets/import': <WalletImport />,
    '/wallets/import/mnemonicphrase': <ImportMnemonicPhraseOrPrivateKey />,
    '/wallets/generate': <GenerateWallet />,
    '/wallets/setPassword': <SetPassword />,
    '/wallets/phrase/intro': <PhraseIntro />,
    '/wallets/phrase/backup': <PhraseBackup />,
    '/wallets/phrase/backup/confirm': <PhraseBackupConfirm />,
  };

  const createWalletWhiteList: any = {
    '/wallets/create': <CreateWallet />,
    '/wallets/import': <WalletImport />,
    '/wallets/import/mnemonicphrase': <ImportMnemonicPhraseOrPrivateKey />,
    '/wallets/generate': <GenerateWallet />,
    '/wallets/setPassword': <SetPassword />,
    '/wallets/phrase/intro': <PhraseIntro />,
    '/wallets/phrase/backup': <PhraseBackup />,
    '/wallets/phrase/backup/confirm': <PhraseBackupConfirm />,
  };

  const allPageWhiteList: any = {
    '/stores/create': true,
    '/wallets/create': true,
    '/wallets/import': true,
    '/wallets/import/mnemonicphrase': true,
    '/wallets/generate': true,
    '/wallets/setPassword': true,
    '/wallets/phrase/intro': true,
    '/wallets/phrase/backup': true,
    '/wallets/phrase/backup/confirm': true,
  };

  useEffect(() => {
    setLogin(getIsLogin());
    // setWallet(getIsWallet());

    if (getIsLogin()) {
      // Is has wallet
      if (!getIsWallet()) {
        if (router.pathname !== '/wallets/create' && !createWalletWhiteList[router.pathname]) {
          window.location.href = '/wallets/create';
          return;
        }
      }

      if (router.pathname === '/') {
        window.location.href = '/dashboard';
        return;
      }

      if (unLoginWhiteList[router.pathname]) {
        window.location.href = '/';
        return;
      }
    } else {
      resetStore();
      resetUser();
      resetWallet();

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
