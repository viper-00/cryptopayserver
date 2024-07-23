import { Box, Card, CardContent, Container, Icon, Stack, Typography } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useEffect } from 'react';
import { useSnackPresistStore } from 'lib/store/snack';

const GenerateWallet = () => {
  const { setSnackOpen, setSnackMessage, setSnackSeverity } = useSnackPresistStore((state) => state);

  const onClickMnemonicPhrase = () => {
    window.location.href = '/wallets/setPassword';
  };

  const onClickHardwareWallet = () => {
    setSnackMessage('Not supported.');
    setSnackSeverity('warning');
    setSnackOpen(true);
  };

  useEffect(() => {}, []);

  return (
    <Box>
      <Container>
        <Stack alignItems={'center'} mt={20}>
          <Typography variant="h4">Create wallet</Typography>
          <Box mt={8}>
            <div onClick={onClickMnemonicPhrase}>
              <Card sx={{ width: 700, padding: 2 }}>
                <CardContent>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Stack direction={'row'} alignItems={'center'}>
                      <Icon component={AccountBalanceWalletIcon} fontSize={'large'} />
                      <Box ml={5}>
                        <Typography variant="h5">Mnemonic phrase</Typography>
                      </Box>
                    </Stack>
                    <Icon component={ChevronRightIcon} fontSize={'large'} />
                  </Stack>
                </CardContent>
              </Card>
            </div>
          </Box>
          <Box mt={8}>
            <div onClick={onClickHardwareWallet}>
              <Card sx={{ width: 700, padding: 2 }}>
                <CardContent>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Stack direction={'row'} alignItems={'center'}>
                      <Icon component={AccountBalanceWalletIcon} fontSize={'large'} />
                      <Box ml={5}>
                        <Typography variant="h5">Hardware wallet</Typography>
                      </Box>
                    </Stack>
                    <Icon component={ChevronRightIcon} fontSize={'large'} />
                  </Stack>
                </CardContent>
              </Card>
            </div>
          </Box>

          <Typography mt={10}>Continuing implies agreeing to CryptoPayServer user agreement.</Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default GenerateWallet;
