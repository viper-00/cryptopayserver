import { Settings } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useSnackPresistStore, useUserPresistStore, useWalletPresistStore } from 'lib/store';
import Link from 'next/link';
import { CHAINS } from 'packages/constants/blockchain';
import { EthereumTransactionDetail } from 'packages/web3/types';
import { useEffect, useState } from 'react';
import { GetBlockchainAddressUrl, GetBlockchainTxUrl } from 'utils/chain/eth';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import { WeiToGwei } from 'utils/number';

type walletType = {
  id: number;
  address: string;
  type: string;
  ethBalance: string;
  usdtBalance: string;
  daiBalance: string;
  usdcBalance: string;
  transactions: EthereumTransactionDetail[];
};

type feeType = {
  high: number;
  average: number;
  low: number;
};

const Ethereum = () => {
  const { getWalletId } = useWalletPresistStore((state) => state);
  const { getNetwork, getUserId } = useUserPresistStore((state) => state);

  const [isSettings, setIsSettings] = useState<boolean>(false);
  const [wallet, setWallet] = useState<walletType[]>([]);
  const [feeObj, setFeeObj] = useState<feeType>();

  const { setSnackMessage, setSnackSeverity, setSnackOpen } = useSnackPresistStore((state) => state);

  const onClickRescanAddress = async () => {
    await getEthereumWalletAddress();

    setSnackSeverity('success');
    setSnackMessage('Successful rescan!');
    setSnackOpen(true);
  };

  const getEthereumWalletAddress = async () => {
    try {
      const find_address_resp: any = await axios.get(Http.find_wallet_address_by_chain_and_network, {
        params: {
          user_id: getUserId(),
          wallet_id: getWalletId(),
          chain_id: CHAINS.ETHEREUM,
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
            ethBalance: item.balance.ETH,
            usdtBalance: item.balance.USDT,
            daiBalance: item.balance.DAI,
            usdcBalance: item.balance.USDC,
            transactions: item.transactions,
          });
        });
        setWallet(ws);
      }
    } catch (e) {
      console.error(e);
    }
  };

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
    await getEthereumWalletAddress();
    // await getEthereumPaymentSetting();
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
            <IconButton
              onClick={() => {
                setIsSettings(!isSettings);
              }}
            >
              <Settings />
            </IconButton>
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

        <Box mt={8}>
          {isSettings ? (
            <Box></Box>
          ) : (
            <Box>
              {wallet &&
                wallet.length > 0 &&
                wallet.map((item, index) => (
                  <Box key={index} mb={10}>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                      <Box>
                        <Typography fontWeight={'bold'} fontSize={18}>
                          {item.type}
                        </Typography>
                        <Typography mt={1}>{item.address}</Typography>
                        <Typography mt={1} fontWeight={'bold'}>
                          {item.ethBalance} ETH
                        </Typography>
                        <Typography mt={1} fontWeight={'bold'}>
                          {item.usdtBalance} USDT
                        </Typography>
                        <Typography mt={1} fontWeight={'bold'}>
                          {item.usdcBalance} USDC
                        </Typography>
                        <Typography mt={1} fontWeight={'bold'}>
                          {item.daiBalance} DAI
                        </Typography>
                      </Box>
                      <Box>
                        <Button
                          href={GetBlockchainAddressUrl(getNetwork() === 'mainnet' ? true : false) + '/' + item.address}
                          target={'_blank'}
                        >
                          Check onChain
                        </Button>
                      </Box>
                    </Stack>
                    <Box mt={5}>
                      {item.transactions && item.transactions.length > 0 ? (
                        <TransactionsTab rows={item.transactions} />
                      ) : (
                        <Typography>There are no transactions yet.</Typography>
                      )}
                    </Box>
                  </Box>
                ))}
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Ethereum;

function TransactionsTab({ rows }: { rows: EthereumTransactionDetail[] }) {
  const { getNetwork } = useUserPresistStore((state) => state);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Hash</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Asset</TableCell>
            <TableCell>Contract Address</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Block Timestamp</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                <Link
                  href={GetBlockchainTxUrl(getNetwork() === 'mainnet' ? true : false) + '/' + row.hash}
                  target={'_blank'}
                >
                  {row.hash}
                </Link>
              </TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{row.asset}</TableCell>
              <TableCell>{row.contractAddress}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{new Date((row.blockTimestamp as number) * 1000).toLocaleString()}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
