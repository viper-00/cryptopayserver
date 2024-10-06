import { Box, Button, Container, IconButton, Stack, Typography } from '@mui/material';
import { useUserPresistStore, useWalletPresistStore } from 'lib/store';
import { CHAINS } from 'packages/constants/blockchain';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import { WeiToGwei } from 'utils/number';
type feeType = {
  high: number;
  average: number;
  low: number;
};

const Ethereum = () => {
  const { getWalletId } = useWalletPresistStore((state) => state);
  const { getNetwork, getUserId } = useUserPresistStore((state) => state);
  const [feeObj, setFeeObj] = useState<feeType>();

  const onClickRescanAddress = async () => {};

  const getEthereumFeeRate = async () => {
    try {
      const find_fee_resp: any = await axios.get(Http.find_fee_rate, {
        params: {
          chain_id: CHAINS.ETHEREUM,
          network: getNetwork() === 'mainnet' ? 1 : 2,
        },
      });
      if (find_fee_resp.result) {
        setFeeObj({
          high: find_fee_resp.data.fast,
          average: find_fee_resp.data.normal,
          low: find_fee_resp.data.slow,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const init = async () => {
    await getEthereumFeeRate();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Box>
      <Container>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} pt={5}>
          <Box>
            <Typography variant="h6">Ethereum Wallet</Typography>
          </Box>
          <Stack direction={'row'} alignItems={'center'} gap={2}>
            <Box>
              <Button
                variant={'contained'}
                onClick={() => {
                  window.location.href = '/wallets/ethereum/send';
                }}
              >
                Send
              </Button>
            </Box>
            <Box>
              <Button
                variant={'contained'}
                onClick={() => {
                  window.location.href = '/wallets/ethereum/receive';
                }}
              >
                Receive
              </Button>
            </Box>
            <Box>
              <Button variant={'contained'} onClick={onClickRescanAddress}>
                Rescan address
              </Button>
            </Box>
            {/* <IconButton
              onClick={() => {
                setIsSettings(!isSettings);
              }}
            >
              <Settings />
            </IconButton> */}
          </Stack>
        </Stack>

        <Box mt={8}>
          <Typography variant="h6">Ethereum Gas Tracker</Typography>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-around'} mt={2}>
            <Box>
              <Typography>Low</Typography>
              <Typography mt={2} fontWeight={'bold'}>
                {WeiToGwei(feeObj?.low as number)} gwei
              </Typography>
            </Box>
            <Box>
              <Typography>Average</Typography>
              <Typography mt={2} fontWeight={'bold'}>
                {WeiToGwei(feeObj?.average as number)}gwei
              </Typography>
            </Box>
            <Box>
              <Typography>High</Typography>
              <Typography mt={2} fontWeight={'bold'}>
                {WeiToGwei(feeObj?.high as number)}gwei
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Ethereum;
