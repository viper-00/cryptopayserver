import { Box, Card, CardContent, Container, Icon, Stack, Typography } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useEffect } from 'react';
// import bip39 from 'bip39';

const GenerateWallet = () => {
  const onClickWatchOnlyWallet = () => {
    window.location.href = '/wallets/import';
  };

  useEffect(() => {
    // const mem = bip39.generateMnemonic();
    // console.log('meme', mem);
  }, []);

  return (
    <Box>
      <Container>
        <Stack alignItems={'center'} mt={20}>
          <Typography variant="h4">Choose your wallet option</Typography>
          <Box mt={8}>
            <Card sx={{ width: 700, padding: 2 }}>
              <CardContent>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                  <Stack direction={'row'} alignItems={'center'}>
                    <Icon component={AccountBalanceWalletIcon} fontSize={'large'} />
                    <Box ml={5}>
                      <Typography variant="h5">Hot wallet</Typography>
                      <Typography mt={1}>
                        Please note that creating a hot wallet is not supported by this instance for non administrators.
                      </Typography>
                    </Box>
                  </Stack>
                  <Icon component={ChevronRightIcon} fontSize={'large'} />
                </Stack>
              </CardContent>
            </Card>
          </Box>
          <Box mt={8}>
            <div onClick={onClickWatchOnlyWallet}>
              <Card sx={{ width: 700, padding: 2 }}>
                <CardContent>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Stack direction={'row'} alignItems={'center'}>
                      <Icon component={AccountBalanceWalletIcon} fontSize={'large'} />
                      <Box ml={5}>
                        <Typography variant="h5">Watch-only wallet</Typography>
                        <Typography mt={1}>
                          Wallet's private key is erased from the server. Higher security. To spend, you have to
                          manually input the private key or import it into an external wallet.
                        </Typography>
                      </Box>
                    </Stack>
                    <Icon component={ChevronRightIcon} fontSize={'large'} />
                  </Stack>
                </CardContent>
              </Card>
            </div>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default GenerateWallet;
