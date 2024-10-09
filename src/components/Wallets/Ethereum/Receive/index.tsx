import { Box, Container, IconButton, Paper, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ContentCopy, QrCode } from '@mui/icons-material';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import { useStorePresistStore, useUserPresistStore, useWalletPresistStore } from 'lib/store';
import { CHAINS } from 'packages/constants/blockchain';
import { GetImgSrcByCrypto } from 'utils/qrcode';

const EthereumReceive = () => {
  const { getUserId, getNetwork } = useUserPresistStore((state) => state);
  const { getStoreId } = useStorePresistStore((state) => state);

  const [ethereum, setEthereum] = useState<string>('');

  const getEthereum = async () => {
    try {
      const find_payment_resp: any = await axios.get(Http.find_payment_by_chain_id, {
        params: {
          user_id: getUserId(),
          chain_id: CHAINS.ETHEREUM,
          store_id: getStoreId(),
          network: getNetwork(),
        },
      });

      if (find_payment_resp.result) {
        setEthereum(find_payment_resp.data.address);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const init = async () => {
    await getEthereum();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Box mt={4}>
      <Container maxWidth="sm">
        <Typography variant="h4" mt={4} textAlign={'center'}>
          Receive ETH
        </Typography>

        <Box mt={4} textAlign={'center'}>
          <Paper style={{ padding: 20 }}>
            <QRCodeSVG
              value={ethereum}
              width={250}
              height={250}
              imageSettings={{
                src: GetImgSrcByCrypto('ETH'),
                width: 35,
                height: 50,
                excavate: false,
              }}
            />
          </Paper>
        </Box>

        <Box mt={2}>
          <Stack direction="row" alignItems="center" justifyContent="center">
            <Typography mr={1}>{ethereum}</Typography>
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
      </Container>
    </Box>
  );
};

export default EthereumReceive;
