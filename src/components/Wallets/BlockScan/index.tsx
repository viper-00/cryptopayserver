import { Box, Button, Card, CardContent, Container, Stack, Typography } from '@mui/material';
import { useSnackPresistStore, useUserPresistStore, useWalletPresistStore } from 'lib/store';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';

import Image from 'next/image';
import BitcoinSVG from 'assets/chain/bitcoin.svg';
import EthereumSVG from 'assets/chain/ethereum.svg';

type walletType = {
  id: number;
  address: string;
  type: string;
  network: number;
  chainId: number;
};

const BlockScan = () => {
  const { getUserId, getNetwork } = useUserPresistStore((state) => state);
  const { getWalletId } = useWalletPresistStore((state) => state);
  const { setSnackOpen, setSnackMessage, setSnackSeverity } = useSnackPresistStore((state) => state);

  const [wallet, setWallet] = useState<walletType[]>([]);

  const checkScanStatus = async () => {
    if (!wallet || wallet.length <= 0) {
      return;
    }

    try {
      const save_wallet_resp: any = await axios.post(Http.save_wallet_to_block_scan, {
        user_id: getUserId(),
        wallet_id: getWalletId(),
        network: getNetwork() === 'mainnet' ? 1 : 2,
      });

      if (save_wallet_resp.result) {
        setSnackSeverity('success');
        setSnackMessage('Verification success, all addresses have been added to the queue');
        setSnackOpen(true);
      } else {
        setSnackSeverity('error');
        setSnackMessage('Verification failed, please try again');
        setSnackOpen(true);
      }
    } catch (e) {
      console.error(e);

      setSnackSeverity('error');
      setSnackMessage('Verification failed, please try again');
      setSnackOpen(true);
    }
  };

  const getWalletAddress = async () => {
    try {
      const find_address_resp: any = await axios.get(Http.find_wallet_address_by_network, {
        params: {
          user_id: getUserId(),
          wallet_id: getWalletId(),
          network: getNetwork() === 'mainnet' ? 1 : 2,
        },
      });

      if (find_address_resp.result && find_address_resp.data.length > 0) {
        let ws: walletType[] = [];
        find_address_resp.data.forEach(async (item: any) => {
          ws.push({
            id: item.id,
            address: item.address,
            type: item.note,
            network: item.network,
            chainId: item.chain_id,
          });
        });
        setWallet(ws);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getNetworkInfo = async () => {};

  const init = async () => {
    await getWalletAddress();
    await getNetworkInfo();
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <Box>
      <Container>
        <Typography variant="h6">Blockchain Scan</Typography>

        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={4}>
          <Typography variant="h6">Wallet Address</Typography>
          <Stack direction={'row'} alignItems={'center'}>
            <Button variant={'contained'} onClick={checkScanStatus}>
              Check Scan Status
            </Button>
          </Stack>
        </Stack>

        <Box mt={4}>
          {wallet &&
            wallet.length > 0 &&
            wallet.map((item, index) => (
              <Box key={index} mb={4}>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                  <Box>
                    <Typography fontWeight={'bold'} fontSize={14}>
                      {item.type}
                    </Typography>
                    <Typography mt={1}>{item.address}</Typography>
                  </Box>
                </Stack>
              </Box>
            ))}
        </Box>

        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={4}>
          <Typography variant="h6">Network</Typography>
          <Stack direction={'row'} alignItems={'center'}>
            <Button variant={'contained'}>Check network Status</Button>
          </Stack>
        </Stack>

        <Box mt={4}>
          <Typography fontSize={14} fontWeight={'bold'}>
            BITCOIN
          </Typography>

          <Box mt={2}>
            <Card>
              <CardContent>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                  <Stack direction={'row'} alignItems={'center'}>
                    <Image src={BitcoinSVG} alt="" width={50} height={50} />
                    <Box ml={2}>
                      <Typography fontSize={16} fontWeight={'bold'}>
                        Bitcoin
                      </Typography>
                      <Typography mt={1}>https://btc-mainnet.bitcoin.com</Typography>
                    </Box>
                  </Stack>

                  <Typography color={'green'}>202ms</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Box>
          <Box mt={2}>
            <Card>
              <CardContent>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                  <Stack direction={'row'} alignItems={'center'}>
                    <Image src={BitcoinSVG} alt="" width={50} height={50} />
                    <Box ml={2}>
                      <Typography fontSize={16} fontWeight={'bold'}>
                        Bitcoin Testnet
                      </Typography>
                      <Typography mt={1}>https://btc-testnet.bitcoin.com</Typography>
                    </Box>
                  </Stack>

                  <Typography color={'green'}>207ms</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Box>

        <Box mt={4}>
          <Typography fontSize={14} fontWeight={'bold'}>
            ETHEREUM
          </Typography>

          <Box mt={2}>
            <Card>
              <CardContent>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                  <Stack direction={'row'} alignItems={'center'}>
                    <Image src={EthereumSVG} alt="" width={50} height={50} />
                    <Box ml={2}>
                      <Typography fontSize={16} fontWeight={'bold'}>
                        Ethereum
                      </Typography>
                      <Typography mt={1}>https://eth-mainnet.ethereum.com</Typography>
                    </Box>
                  </Stack>

                  <Typography color={'green'}>263ms</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Box>
          <Box mt={2}>
            <Card>
              <CardContent>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                  <Stack direction={'row'} alignItems={'center'}>
                    <Image src={EthereumSVG} alt="" width={50} height={50} />
                    <Box ml={2}>
                      <Typography fontSize={16} fontWeight={'bold'}>
                        Ethereum Sepolia Testnet
                      </Typography>
                      <Typography mt={1}>https://eth-testnet.ethereum.com</Typography>
                    </Box>
                  </Stack>

                  <Typography color={'green'}>207ms</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default BlockScan;
