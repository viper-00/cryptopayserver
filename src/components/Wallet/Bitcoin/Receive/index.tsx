import {
  Box,
  IconButton,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ContentCopy } from '@mui/icons-material';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import { useStorePresistStore, useUserPresistStore, useWalletPresistStore } from 'lib/store';
import { CHAINS } from 'packages/constants/blockchain';

const BitcoinReceive = () => {
  const { getWalletId } = useWalletPresistStore((state) => state);
  const { getNetwork, getUserId } = useUserPresistStore((state) => state);
  const { getStoreId } = useStorePresistStore((state) => state);

  const [address, setAddress] = useState<string>('');
  const [link, setLink] = useState<string>("")
  const [alignment, setAlignment] = useState<'address' | 'link'>('address');

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
        setAddress("bitcoin:"+find_payment_resp.data[0].address);
        setLink("bitcoin:"+find_payment_resp.data[0].address+"?pj="+location.href)
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
          <ToggleButton value="address">Address</ToggleButton>
          <ToggleButton value="link">Link</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {alignment === 'address' ? (
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
                value={address}
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
            <Typography mt={1} fontWeight={'bold'}>
              {'Address'.toUpperCase()}
            </Typography>
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Typography mr={1}>{address}</Typography>
              <IconButton>
                <ContentCopy />
              </IconButton>
            </Stack>

            {/* <Box mt={2} display="flex" flexDirection="column">
              <Button fullWidth variant="contained">
                A
              </Button>
              <Box mt={1}>
                <Button fullWidth variant="contained">
                  B
                </Button>
              </Box>
            </Box> */}
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
                value={link}
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
            <Typography mt={1} fontWeight={'bold'}>
              {'payment link'.toUpperCase()}
            </Typography>
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Typography mr={1}>{link}</Typography>
              <IconButton>
                <ContentCopy />
              </IconButton>
            </Stack>

            {/* <Box mt={2} display="flex" flexDirection="column">
              <Button fullWidth variant="contained">
                A
              </Button>
              <Box mt={1}>
                <Button fullWidth variant="contained">
                  B
                </Button>
              </Box>
            </Box> */}
          </Box>
        </>
      )}
    </Box>
  );
};

export default BitcoinReceive;
