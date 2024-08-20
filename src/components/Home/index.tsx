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
import { Alert, Box, IconButton, Snackbar, Stack } from '@mui/material';
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
import Ethereum from 'components/Wallet/Ethereum';
import Litecoin from 'components/Wallet/Litecoin';
import Solana from 'components/Wallet/Solana';
import Ton from 'components/Wallet/Ton';
import Tron from 'components/Wallet/Tron';
import Bsc from 'components/Wallet/Bsc';
import BitcoinSend from 'components/Wallet/Bitcoin/Send';
import BitcoinReceive from 'components/Wallet/Bitcoin/Receive';
import ControlCameraIcon from '@mui/icons-material/ControlCamera';

const Home = () => {
  const router = useRouter();

  const { snackOpen, snackMessage, snackSeverity, setSnackOpen } = useSnackPresistStore((state) => state);
  const { getIsLogin, resetUser, getNetwork, setShowSidebar, getShowSidebar } = useUserPresistStore((state) => state);
  const { getIsWallet, resetWallet } = useWalletPresistStore((state) => state);
  const { resetStore, getIsStore } = useStorePresistStore((state) => state);

  const [isLogin, setLogin] = useState<boolean>(false);
  const [isStore, setStore] = useState<boolean>(false);
  const [isWallet, setWallet] = useState<boolean>(false);

  const unLoginWhiteList: any = {
    '/login': <Login />,
    '/register': <Register />,
  };

  const storeCreationWhiteList: any = {
    '/stores/create': <CreateStore />,
  };

  const walletCreationWhiteList: any = {
    '/wallets/create': <CreateWallet />,
    '/wallets/import': <WalletImport />,
    '/wallets/import/mnemonicphrase': <ImportMnemonicPhraseOrPrivateKey />,
    '/wallets/generate': <GenerateWallet />,
    '/wallets/setPassword': <SetPassword />,
    '/wallets/phrase/intro': <PhraseIntro />,
    '/wallets/phrase/backup': <PhraseBackup />,
    '/wallets/phrase/backup/confirm': <PhraseBackupConfirm />,
  };

  const otherWhiteList: any = {
    '/wallet/bitcoin/send': <BitcoinSend />,
    '/wallet/bitcoin/receive': <BitcoinReceive />,
  };

  const dashboardWhiteList: any = {
    '/': <Dashboard />,
    '/dashboard': <Dashboard />,
    '/settings': <Settings />,
    '/wallet/bitcoin': <Bitcoin />,
    '/wallet/bitcoin/send': <BitcoinSend />,
    '/wallet/bitcoin/receive': <BitcoinReceive />,
    '/wallet/bitcoin/lightning': <Lightning />,
    '/wallet/ethereum': <Ethereum />,
    '/wallet/litecoin': <Litecoin />,
    '/wallet/solana': <Solana />,
    '/wallet/ton': <Ton />,
    '/wallet/tron': <Tron />,
    '/wallet/bsc': <Bsc />,
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

  useEffect(() => {
    const checkState = async () => {
      const loginStatus = getIsLogin();
      const storeStatus = getIsStore();
      const walletStatus = getIsWallet();

      setLogin(loginStatus);
      setStore(storeStatus);
      setWallet(walletStatus);

      if (!loginStatus) {
        if (unLoginWhiteList[router.pathname]) {
          return;
        } else {
          window.location.href = '/login';
        }
      } else if (!storeStatus) {
        if (storeCreationWhiteList[router.pathname]) {
          return;
        } else {
          window.location.href = '/stores/create';
        }
      } else if (!walletStatus) {
        if (walletCreationWhiteList[router.pathname]) {
          return;
        } else {
          window.location.href = '/wallets/create';
        }
      } else {
        if (router.pathname === '/') {
          window.location.href = '/dashboard';
        } else if (!dashboardWhiteList[router.pathname]) {
          window.location.href = '/';
        }
      }
    };

    checkState();
  }, [router.pathname, getIsLogin, getIsStore, getIsWallet]);

  return (
    <Box height={'100%'}>
      <MetaTags title="Home" />

      {isLogin && (
        <Stack direction={'row'} height={'100%'}>
          {storeCreationWhiteList[router.pathname] ||
          walletCreationWhiteList[router.pathname] ||
          otherWhiteList[router.pathname] ? null : getShowSidebar() ? (
            <HomeSidebar />
          ) : null}

          <Box width={'100%'}>
            {dashboardWhiteList[router.pathname] ? (
              <Box m={2}>
                <IconButton
                  onClick={() => {
                    setShowSidebar(!getShowSidebar());
                  }}
                >
                  <ControlCameraIcon />
                </IconButton>
              </Box>
            ) : null}

            <Box>
              {getNetwork() === 'testnet' && (
                <Box p={2}>
                  <Alert severity="warning">This is a test network. The currency has no value.</Alert>
                </Box>
              )}

              {dashboardWhiteList[router.pathname] || null}
              <Box>
                <Footer />
              </Box>
            </Box>
          </Box>
        </Stack>
      )}

      {!isLogin && (
        <Box width={'100%'}>
          {unLoginWhiteList[router.pathname] || null}
          <Box>
            <Footer />
          </Box>
        </Box>
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
