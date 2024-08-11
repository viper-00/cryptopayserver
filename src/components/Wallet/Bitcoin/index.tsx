import { ContentCopy, CopyAll, QrCode, Settings } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  TableRow,
  Typography,
} from '@mui/material';
import { useUserPresistStore, useWalletPresistStore } from 'lib/store';
import { CHAINS } from 'packages/constants/blockchain';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import { GetBlockchainAddressUrl } from 'utils/chain/btc';
import { TransactionDetail } from 'packages/web3/types';
import Link from 'next/link';

type walletType = {
  address: string;
  type: string;
  balance: string;
  transactions: TransactionDetail[];
};

const Bitcoin = () => {
  const [isSettings, setIsSettings] = useState<boolean>(false);
  const { getWalletId } = useWalletPresistStore((state) => state);
  const { getNetwork, getUserId } = useUserPresistStore((state) => state);
  const [wallet, setWallet] = useState<walletType[]>([]);

  async function getBitcoinWalletAddress() {
    try {
      const find_address_resp: any = await axios.get(Http.find_wallet_address_by_chain_and_network, {
        params: {
          user_id: getUserId(),
          wallet_id: getWalletId(),
          chain_id: CHAINS.BITCOIN,
          network: getNetwork() === 'mainnet' ? 1 : 2,
        },
      });

      if (find_address_resp.result && find_address_resp.data.length > 0) {
        let ws: walletType[] = [];
        find_address_resp.data.forEach(async (item: any) => {
          ws.push({
            address: item.address,
            type: item.note,
            balance: item.balance.BTC,
            transactions: item.transactions,
          });
        });
        setWallet(ws);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getBitcoinWalletAddress();
  }, []);

  return (
    <Box>
      <Container>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} pt={5}>
          <Box>
            <Typography variant="h6">Bitcoin Wallet</Typography>
          </Box>
          <Stack direction={'row'} alignItems={'center'} gap={2}>
            <Box>
              <Button variant={'contained'}>Send</Button>
            </Box>
            <Box>
              <Button variant={'contained'}>Receive</Button>
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

        <Box mt={5}>
          {isSettings ? (
            <Box>
              <Typography variant="h6">BTC Wallet Settings</Typography>
              <Stack alignItems={'center'} direction={'row'} mt={2}>
                <Typography>Hot wallet</Typography>
                <Box ml={2}>
                  <FormControl sx={{ minWidth: 300 }}>
                    <Select
                      size={'small'}
                      inputProps={{ 'aria-label': 'Without label' }}
                      id="demo-simple-select-helper"
                      defaultValue={0}
                      //   value={age}

                      //   onChange={handleChange}
                    >
                      <MenuItem disabled value={0}>
                        <em>Actions</em>
                      </MenuItem>
                      <MenuItem value={1}>Rescan wallet for missing transactions</MenuItem>
                      <MenuItem value={2}>Prune old transactions from history</MenuItem>
                      <MenuItem value={3}>Register wallet for payment links</MenuItem>
                      <MenuItem value={4}>Replace wallet</MenuItem>
                      <MenuItem value={5}>Remove wallet</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Stack>
              <Stack alignItems={'center'} direction={'row'} mt={2}>
                <Switch />
                <Typography>Enabled</Typography>
              </Stack>

              <Box mt={2}>
                <Typography>Label</Typography>
                <Box mt={1}>
                  <FormControl variant="outlined">
                    <OutlinedInput
                      size={'small'}
                      aria-describedby="outlined-weight-helper-text"
                      inputProps={{
                        'aria-label': 'weight',
                      }}
                    />
                  </FormControl>
                </Box>
              </Box>

              <Box mt={2}>
                <Typography>Derivation scheme</Typography>
                <Box mt={1}>
                  <FormControl sx={{ width: '500px' }} variant="outlined">
                    <OutlinedInput
                      size={'small'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton aria-label="toggle password visibility" onClick={() => {}} edge="end">
                            <ContentCopy />
                          </IconButton>
                        </InputAdornment>
                      }
                      aria-describedby="outlined-weight-helper-text"
                      inputProps={{
                        'aria-label': 'weight',
                      }}
                      value={
                        'xpub6DRunDsNiq7TnoRURSkhQ3C5BL6GFPCCmifHup86urjRjJdvnue6ArArMvkhiAaMMbq3mtCoAGfL8DSLqZwzSHTXt8c7YismkM8oUaaaYiq'
                      }
                      disabled
                    />
                  </FormControl>
                </Box>
              </Box>

              <Box mt={5}>
                <Typography variant="h6">Account Key 0</Typography>

                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={2}>
                  <Typography>Account key</Typography>
                  <Stack direction={'row'} alignItems={'center'}>
                    <QrCode />
                    <Typography pl={1}>Show export QR</Typography>
                  </Stack>
                </Stack>

                <Box mt={1}>
                  <FormControl variant="outlined" fullWidth>
                    <OutlinedInput
                      size={'small'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton aria-label="toggle password visibility" onClick={() => {}} edge="end">
                            <ContentCopy />
                          </IconButton>
                        </InputAdornment>
                      }
                      aria-describedby="outlined-weight-helper-text"
                      inputProps={{
                        'aria-label': 'weight',
                      }}
                      value={
                        'xpub6DRunDsNiq7TnoRURSkhQ3C5BL6GFPCCmifHup86urjRjJdvnue6ArArMvkhiAaMMbq3mtCoAGfL8DSLqZwzSHTXt8c7YismkM8oUaaaYiq'
                      }
                      disabled
                    />
                  </FormControl>
                </Box>

                <Stack direction={'row'} alignItems={'center'} mt={3}>
                  <Box>
                    <Typography>Master fingerprint</Typography>
                    <Box mt={1}>
                      <FormControl variant="outlined">
                        <OutlinedInput
                          size={'small'}
                          aria-describedby="outlined-weight-helper-text"
                          inputProps={{
                            'aria-label': 'weight',
                          }}
                        />
                      </FormControl>
                    </Box>
                  </Box>
                  <Box ml={4}>
                    <Typography>Account key path</Typography>
                    <Box mt={1}>
                      <FormControl variant="outlined">
                        <OutlinedInput
                          size={'small'}
                          aria-describedby="outlined-weight-helper-text"
                          inputProps={{
                            'aria-label': 'weight',
                          }}
                        />
                      </FormControl>
                    </Box>
                  </Box>
                </Stack>

                <Box mt={5}>
                  <Button variant={'contained'}>Save Wallet Settings</Button>
                </Box>
              </Box>

              <Box mt={5}>
                <Typography variant="h6">Payment</Typography>

                <Box mt={2}>
                  <Typography>Payment invalid if transactions fails to confirm … after invoice expiration</Typography>
                  <Box mt={2}>
                    <FormControl variant="outlined">
                      <OutlinedInput
                        size={'small'}
                        type="number"
                        endAdornment={<InputAdornment position="end">minutes</InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                          'aria-label': 'weight',
                        }}
                      />
                    </FormControl>
                  </Box>
                </Box>
                <Box mt={2}>
                  <Typography>Consider the invoice settled when the payment transaction …</Typography>
                  <Box mt={2}>
                    <FormControl sx={{ minWidth: 300 }}>
                      <Select
                        size={'small'}
                        inputProps={{ 'aria-label': 'Without label' }}
                        id="demo-simple-select-helper"
                        defaultValue={2}
                        //   value={age}

                        //   onChange={handleChange}
                      >
                        <MenuItem value={1}>Is unconfirmed</MenuItem>
                        <MenuItem value={2}>Has at least 1 confirmation</MenuItem>
                        <MenuItem value={3}>Has at least 2 confirmation</MenuItem>
                        <MenuItem value={4}>Has at least 6 confirmation</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                <Box mt={2}>
                  <Stack direction={'row'} alignItems={'center'}>
                    <Switch />
                    <Box ml={2}>
                      <Typography>Show recommended fee</Typography>
                      <Typography>Fee will be shown for BTC and LTC onchain payments only.</Typography>
                    </Box>
                  </Stack>
                </Box>

                <Typography mt={2}>Recommended fee confirmation target blocks</Typography>
                <Box mt={2}>
                  <FormControl variant="outlined">
                    <OutlinedInput
                      size={'small'}
                      type="number"
                      aria-describedby="outlined-weight-helper-text"
                      inputProps={{
                        'aria-label': 'weight',
                      }}
                    />
                  </FormControl>
                </Box>

                <Box mt={4}>
                  <Button variant={'contained'}>Save Payment Settings</Button>
                </Box>
              </Box>

              <Box mt={5}>
                <Typography variant="h6">Labels</Typography>
                <Box mt={2}>
                  <Button>Manage labels</Button>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box>
              {wallet &&
                wallet.length > 0 &&
                wallet.map((item, index) => (
                  <Box key={index} mb={10}>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                      <Box>
                        <Typography fontWeight={'bold'} fontSize={14}>
                          {item.type}
                        </Typography>
                        <Typography mt={1}>{item.address}</Typography>
                        <Typography mt={1}>{item.balance} BTC</Typography>
                      </Box>
                      <Box>
                        <Button
                          href={GetBlockchainAddressUrl(getNetwork() === 'mainnet' ? true : false) + '/' + item.address}
                          target={'_blank'}
                        >
                          Check onChain
                        </Button>
                        <Button>Rescan address</Button>
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

export default Bitcoin;

// function createData() {
//   return { date, message };
// }
// const rows = [createData(1, '6/21/24, 11:30 PM', '	A new payout is awaiting for approval')];

function TransactionsTab({ rows }: { rows: TransactionDetail[] }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Hash</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Asset</TableCell>
            <TableCell>Fee</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Block Number</TableCell>
            <TableCell>Block Timestamp</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                <Link href={row.url} target={'_blank'}>
                  {row.hash}
                </Link>
              </TableCell>
              <TableCell>{row.value} sat</TableCell>
              <TableCell>{row.asset}</TableCell>
              <TableCell>{row.fee} sat</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.blockNumber}</TableCell>
              <TableCell>{new Date(row.blockTimestamp as number * 1000).toLocaleString()}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
