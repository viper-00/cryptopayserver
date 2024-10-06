import { Box, Container, IconButton, Paper, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ContentCopy, QrCode } from '@mui/icons-material';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import { useStorePresistStore, useUserPresistStore, useWalletPresistStore } from 'lib/store';
import { CHAINS } from 'packages/constants/blockchain';
import { GetImgSrcByCrypto } from 'utils/qrcode';

const BitcoinReceive = () => {
  const { getUserId } = useUserPresistStore((state) => state);
  const { getStoreId } = useStorePresistStore((state) => state);

  const [lightning, setLightning] = useState<string>('');
  const [bitcoin, setBitcoin] = useState<string>('');
  const [alignment, setAlignment] = useState<'lightning' | 'bitcoin'>('bitcoin');

  const handleChange = (e: any) => {
    setAlignment(e.target.value);
  };

  const getBitcoin = async () => {
    try {
      const find_payment_resp: any = await axios.get(Http.find_payment_by_chain_id, {
        params: {
          user_id: getUserId(),
          chain_id: CHAINS.BITCOIN,
          store_id: getStoreId(),
        },
      });

      if (find_payment_resp.result) {
        setBitcoin(find_payment_resp.data.address);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const init = async () => {
    await getBitcoin();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Box mt={4}>
      <Container maxWidth="sm">
        <Typography variant="h4" mt={4} textAlign={'center'}>
          Receive BTC
        </Typography>
        <Box mt={2} textAlign={'center'}>
          <ToggleButtonGroup color="primary" value={alignment} exclusive onChange={handleChange} aria-label="type">
            <ToggleButton value="lightning">Lightning</ToggleButton>
            <ToggleButton value="bitcoin">Bitcoin</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {alignment === 'lightning' ? (
          <>
            <Box mt={4} textAlign={'center'}>
              <Typography>No support right now!</Typography>
            </Box>
          </>
        ) : (
          <>
            <Box mt={4} textAlign={'center'}>
              <Paper style={{ padding: 20 }}>
                <QRCodeSVG
                  value={bitcoin}
                  width={250}
                  height={250}
                  imageSettings={{
                    src: GetImgSrcByCrypto('BTC'),
                    width: 35,
                    height: 35,
                    excavate: false,
                  }}
                />
              </Paper>
            </Box>

            <Box mt={2}>
              <Stack direction="row" alignItems="center" justifyContent="center">
                <Typography mr={1}>{bitcoin}</Typography>
                <IconButton>
                  <ContentCopy fontSize={'small'} />
                </IconButton>
              </Stack>

              <Stack mt={5} direction="row" alignItems="center" justifyContent={'center'} gap={6}>
                <Box textAlign={'center'}>
                  <IconButton>
                    <QrCode fontSize={'small'} />
                  </IconButton>
                  <Typography mt={1} fontSize={'small'}>
                    Copy QR Code
                  </Typography>
                </Box>
                <Box textAlign={'center'}>
                  <IconButton>
                    <QrCode fontSize={'small'} />
                  </IconButton>
                  <Typography mt={1} fontSize={'small'}>
                    Copy Address
                  </Typography>
                </Box>
                <Box textAlign={'center'}>
                  <IconButton>
                    <QrCode fontSize={'small'} />
                  </IconButton>
                  <Typography mt={1} fontSize={'small'}>
                    Download QR
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default BitcoinReceive;
