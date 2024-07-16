import { Box, Card, CardContent, Container, Icon, Stack, Typography } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const ImportWallet = () => {
  const onClickConnectHardwareWallet = () => {};

  const onClickImportWalletFile = () => {};

  const onClickEnterExtendedPublicKey = () => {};

  const onClickScanWalletQRCode = () => {};

  const onClickConnectEnterWalletSeed = () => {};

  return (
    <Box>
      <Container>
        <Stack alignItems={'center'} mt={6}>
          <Typography variant="h4">Choose your import method</Typography>
          <Typography variant="h6" mt={2}>
            The following methods assume that you already have an existing wallet created and backed up.
          </Typography>
          <Box mt={8}>
            <div onClick={onClickConnectHardwareWallet}>
              <Card sx={{ width: 750, padding: 2 }}>
                <CardContent>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Stack direction={'row'} alignItems={'center'}>
                      <Icon component={AccountBalanceWalletIcon} fontSize={'large'} />
                      <Box ml={5}>
                        <Typography variant="h5">Connect hardware wallet</Typography>
                        <Typography mt={1}>Import your public keys using our Vault application</Typography>
                      </Box>
                    </Stack>
                    <Icon component={ChevronRightIcon} fontSize={'large'} />
                  </Stack>
                </CardContent>
              </Card>
            </div>
          </Box>
          <Box mt={4}>
            <div onClick={onClickImportWalletFile}>
              <Card sx={{ width: 750, padding: 2 }}>
                <CardContent>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Stack direction={'row'} alignItems={'center'}>
                      <Icon component={AddCircleOutlineIcon} fontSize={'large'} />
                      <Box ml={5}>
                        <Typography variant="h5">Import wallet file</Typography>
                        <Typography mt={1}>Upload a file exported from your wallet</Typography>
                      </Box>
                    </Stack>
                    <Icon component={ChevronRightIcon} fontSize={'large'} />
                  </Stack>
                </CardContent>
              </Card>
            </div>
          </Box>
          <Box mt={4}>
            <div onClick={onClickEnterExtendedPublicKey}>
              <Card sx={{ width: 750, padding: 2 }}>
                <CardContent>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Stack direction={'row'} alignItems={'center'}>
                      <Icon component={AddCircleOutlineIcon} fontSize={'large'} />
                      <Box ml={5}>
                        <Typography variant="h5">Enter extended public key</Typography>
                        <Typography mt={1}>Input the key string manually</Typography>
                      </Box>
                    </Stack>
                    <Icon component={ChevronRightIcon} fontSize={'large'} />
                  </Stack>
                </CardContent>
              </Card>
            </div>
          </Box>
          <Box mt={4}>
            <div onClick={onClickScanWalletQRCode}>
              <Card sx={{ width: 750, padding: 2 }}>
                <CardContent>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Stack direction={'row'} alignItems={'center'}>
                      <Icon component={AddCircleOutlineIcon} fontSize={'large'} />
                      <Box ml={5}>
                        <Typography variant="h5">Scan wallet QR code</Typography>
                        <Typography mt={1}>Supported by BlueWallet, Cobo Vault, Passport and Specter DIY</Typography>
                      </Box>
                    </Stack>
                    <Icon component={ChevronRightIcon} fontSize={'large'} />
                  </Stack>
                </CardContent>
              </Card>
            </div>
          </Box>
          <Box mt={4}>
            <div onClick={onClickConnectEnterWalletSeed}>
              <Card sx={{ width: 750, padding: 2 }}>
                <CardContent>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Stack direction={'row'} alignItems={'center'}>
                      <Icon component={AddCircleOutlineIcon} fontSize={'large'} />
                      <Box ml={5}>
                        <Typography variant="h5">Enter wallet seed</Typography>
                        <Typography mt={1}>Provide the 12 or 24 word recovery seed</Typography>
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

export default ImportWallet;
