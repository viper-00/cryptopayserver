import { Box, IconButton, Paper, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ContentCopy, QrCode } from '@mui/icons-material';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import { useStorePresistStore, useUserPresistStore, useWalletPresistStore } from 'lib/store';
import { CHAINS } from 'packages/constants/blockchain';

const BitcoinReceive = () => {
  const { getWalletId } = useWalletPresistStore((state) => state);
  const { getNetwork, getUserId } = useUserPresistStore((state) => state);
  const { getStoreId } = useStorePresistStore((state) => state);

  const [lightning, setLightning] = useState<string>('');
  const [bitcoin, setBitcoin] = useState<string>('');
  const [alignment, setAlignment] = useState<'lightning' | 'bitcoin'>('bitcoin');

  const handleChange = (e: any) => {
    setAlignment(e.target.value);
  };

  async function getBitcoin() {
    try {
      const find_payment_resp: any = await axios.get(Http.find_payment_by_chain_id, {
        params: {
          user_id: getUserId(),
          chain_id: CHAINS.BITCOIN,
          store_id: getStoreId(),
        },
      });

      if (find_payment_resp.result && find_payment_resp.data.length === 1) {
        setBitcoin(find_payment_resp.data[0].address);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function init() {
    await getBitcoin();
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mb={10}>
      <Typography variant="h4" mt={4}>
        Receive BTC
      </Typography>
      <Box mt={2}>
        <ToggleButtonGroup color="primary" value={alignment} exclusive onChange={handleChange} aria-label="type">
          <ToggleButton value="lightning">Lightning</ToggleButton>
          <ToggleButton value="bitcoin">Bitcoin</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {alignment === 'lightning' ? (
        <>
          <Box mt={4} display="flex" justifyContent="center" width="100%" maxWidth={350}>
            <Typography>No support right now!</Typography>
          </Box>
        </>
      ) : (
        <>
          <Box mt={4} display="flex" justifyContent="center" width="100%" maxWidth={350}>
            <Paper
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <QRCodeSVG
                value={bitcoin}
                width={250}
                height={350}
                imageSettings={{
                  src: 'http://127.0.0.1:8888/btc.svg',
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

            <Stack mt={5} direction="row" alignItems="center" justifyContent={'space-between'}>
              <Box textAlign={'center'}>
                <IconButton>
                  <QrCode fontSize={'small'} />
                </IconButton>
                <Typography mt={1}>Copy QR Code</Typography>
              </Box>
              <Box textAlign={'center'}>
                <IconButton>
                  <QrCode fontSize={'small'} />
                </IconButton>
                <Typography mt={1}>Copy QR Code</Typography>
              </Box>
              <Box textAlign={'center'}>
                <IconButton>
                  <QrCode fontSize={'small'} />
                </IconButton>
                <Typography mt={1}>Copy QR Code</Typography>
              </Box>
            </Stack>
          </Box>
        </>
      )}
    </Box>
  );
};

export default BitcoinReceive;
