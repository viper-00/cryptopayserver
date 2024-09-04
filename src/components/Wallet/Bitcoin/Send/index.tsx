import { Add } from '@mui/icons-material';
import {
  Box,
  Icon,
  Stack,
  Typography,
  Container,
  FormControl,
  OutlinedInput,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  Button,
} from '@mui/material';
import { useEffect, useState } from 'react';
import BitcoinSVG from 'assets/chain/bitcoin.svg';
import Image from 'next/image';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import { useStorePresistStore, useUserPresistStore } from 'lib/store';
import { CHAINS } from 'packages/constants/blockchain';

const BitcoinSend = () => {
  const [alignment, setAlignment] = useState<'fastest' | 'halfHour' | 'hour' | 'economy' | 'minimum'>('fastest');
  const [addressAlert, setAddressAlert] = useState<boolean>(false);
  const [amountAlert, setAmountAlert] = useState<boolean>(false);
  const [amountRed, setAmountRed] = useState<boolean>(false);

  const [page, setPage] = useState<number>(1);
  const [fromAddress, setFromAddress] = useState<string>('');
  const [balance, setBalance] = useState<string>('');
  const [destinationAddress, setDestinationAddress] = useState<string>('');
  const [amount, setAmount] = useState<number>();
  const [feeRate, setFeeRate] = useState<number>();

  const { getNetwork, getUserId } = useUserPresistStore((state) => state);
  const { getStoreId } = useStorePresistStore((state) => state);

  const handleChangeFees = (e: any) => {
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
      if (find_payment_resp.result) {
        setFromAddress(find_payment_resp.data.address);
        setBalance(find_payment_resp.data.balance.BTC);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function getBitcoinFeeRate() {
    
  }

  useEffect(() => {
    getBitcoin();
    getBitcoinFeeRate()
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mb={10}>
      <Typography variant="h4" mt={4}>
        Send BTC
      </Typography>
      <Container>
        {page === 1 && (
          <>
            <Box mt={4}>
              <Stack mt={2} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Typography>From Address</Typography>
              </Stack>
              <Box mt={1}>
                <FormControl fullWidth variant="outlined">
                  <OutlinedInput
                    size={'small'}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      'aria-label': 'weight',
                    }}
                    value={fromAddress}
                    disabled
                  />
                </FormControl>
              </Box>
              <Typography color={'red'} mt={1} display={addressAlert ? 'block' : 'none'}>
                The Destination Address field is required.
              </Typography>
            </Box>

            <Box mt={4}>
              <Stack mt={2} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Typography>Destination Address</Typography>
                {/* <Stack direction={'row'} alignItems={'center'}>
                  <Icon component={Add} fontSize={'small'} />
                  <Typography pl={1}>Add another destination</Typography>
                </Stack> */}
              </Stack>
              <Box mt={1}>
                <FormControl fullWidth variant="outlined">
                  <OutlinedInput
                    size={'small'}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      'aria-label': 'weight',
                    }}
                    value={destinationAddress}
                    onChange={(e: any) => {
                      setDestinationAddress(e.target.value);
                    }}
                  />
                </FormControl>
              </Box>
              <Typography color={'red'} mt={1} display={addressAlert ? 'block' : 'none'}>
                The Destination Address field is required.
              </Typography>
            </Box>

            <Box mt={4}>
              <Typography>Amount</Typography>
              <Box mt={1}>
                <FormControl fullWidth variant="outlined">
                  <OutlinedInput
                    size={'small'}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      'aria-label': 'weight',
                    }}
                    type="number"
                    value={amount}
                    onChange={(e: any) => {
                      setAmount(e.target.value);
                      if (parseFloat(e.target.value) > parseFloat(balance)) {
                        setAmountRed(true);
                      } else {
                        setAmountRed(false);
                      }
                    }}
                  />
                </FormControl>
              </Box>
              <Typography color={'red'} mt={1} display={amountAlert ? 'block' : 'none'}>
                The field Amount must be between 1E-08 and 21000000.
              </Typography>
              <Typography mt={1} color={amountRed ? 'red' : 'none'} fontWeight={'bold'}>
                Your available balance is {balance} BTC.
              </Typography>
            </Box>

            <Box mt={4}>
              <Typography>Fee rate (satoshi per byte)</Typography>
              <Box mt={1}>
                <FormControl sx={{ width: '25ch' }} variant="outlined">
                  <OutlinedInput
                    size={'small'}
                    type="number"
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      'aria-label': 'weight',
                    }}
                    value={feeRate}
                    onChange={(e: any) => {
                      setFeeRate(e.target.value);
                    }}
                  />
                </FormControl>
              </Box>
            </Box>

            <Stack mt={4} direction={'row'} alignItems={'center'}>
              <Typography>Confirm in the next</Typography>
              <Box ml={2}>
                <ToggleButtonGroup
                  color="primary"
                  value={alignment}
                  exclusive
                  onChange={handleChangeFees}
                  aria-label="type"
                >
                  <ToggleButton value="fastest">fastest</ToggleButton>
                  <ToggleButton value="halfHour">halfHour</ToggleButton>
                  <ToggleButton value="hour">hour</ToggleButton>
                  <ToggleButton value="economy">economy</ToggleButton>
                  <ToggleButton value="minimum">minimum</ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Stack>

            <Box mt={8}>
              <Button
                variant={'contained'}
                onClick={() => {
                  setPage(2);
                }}
              >
                Sign transaction
              </Button>
            </Box>
          </>
        )}

        {page === 2 && (
          <>
            <Box textAlign={'center'}>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} mt={4}>
                <Image src={BitcoinSVG} alt="" width={25} height={25} />
                <Typography ml={1}>Bitcoin Testnet</Typography>
              </Stack>

              <Box mt={4}>
                <Typography>Send to</Typography>
                <Typography mt={1}>tbsfsd...12312</Typography>
              </Box>

              <Box mt={4}>
                <Typography>Spend Amount</Typography>
                <Stack direction={'row'} alignItems={'baseline'} justifyContent={'center'}>
                  <Typography mt={1} variant={'h4'}>
                    0.00000123
                  </Typography>
                  <Typography ml={1}>tBTC</Typography>
                </Stack>
                <Stack direction={'row'} alignItems={'baseline'} justifyContent={'center'}>
                  <Typography mt={1}>0.0000000111</Typography>
                  <Typography ml={1}>tBTC</Typography>
                  <Typography ml={1}>(network fee)</Typography>
                </Stack>
              </Box>

              <Box mt={4}>
                <Typography>Network Fee:</Typography>
                <Box mt={1}>
                  <FormControl variant="outlined">
                    <OutlinedInput
                      size={'small'}
                      endAdornment={<InputAdornment position="end">tBTC</InputAdornment>}
                      aria-describedby="outlined-weight-helper-text"
                      inputProps={{
                        'aria-label': 'weight',
                      }}
                      value={'0.000123123'}
                      disabled
                    />
                  </FormControl>
                </Box>
              </Box>

              <Box mt={4}>
                <Typography>Network Fee Rate:</Typography>
                <Box mt={1}>
                  <FormControl variant="outlined">
                    <OutlinedInput
                      size={'small'}
                      endAdornment={<InputAdornment position="end">sat/vB</InputAdornment>}
                      aria-describedby="outlined-weight-helper-text"
                      inputProps={{
                        'aria-label': 'weight',
                      }}
                      value={'29.0'}
                      disabled
                    />
                  </FormControl>
                </Box>
              </Box>

              <Box mt={4}>
                <Typography>Input:(2)</Typography>
                <Stack mt={1} direction={'row'} alignItems={'center'} justifyContent={'center'}>
                  <Typography>tbsdfsdf...sdfsd</Typography>
                  <Typography ml={10}>0.000012312</Typography>
                  <Typography ml={1}>tBTC</Typography>
                </Stack>
                <Stack mt={1} direction={'row'} alignItems={'center'} justifyContent={'center'}>
                  <Typography>tbsdfsdf...sdfsd</Typography>
                  <Typography ml={10}>0.000012312</Typography>
                  <Typography ml={1}>tBTC</Typography>
                </Stack>
              </Box>

              <Box mt={4}>
                <Typography>Output:(2)</Typography>
                <Stack mt={1} direction={'row'} alignItems={'center'} justifyContent={'center'}>
                  <Typography>tbsdfsdf...sdfsd</Typography>
                  <Typography ml={10}>0.000012312</Typography>
                  <Typography ml={1}>tBTC</Typography>
                </Stack>
                <Stack mt={1} direction={'row'} alignItems={'center'} justifyContent={'center'}>
                  <Typography>tbsdfsdf...sdfsd</Typography>
                  <Typography ml={10}>0.000012312</Typography>
                  <Typography ml={1}>tBTC</Typography>
                </Stack>
              </Box>

              <Stack mt={8} direction={'row'} alignItems={'center'} justifyContent={'center'}>
                <Button
                  variant={'contained'}
                  onClick={() => {
                    setPage(1);
                  }}
                >
                  Reject
                </Button>
                <Box ml={2}>
                  <Button variant={'contained'} onClick={() => {}}>
                    Sign & Pay
                  </Button>
                </Box>
              </Stack>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default BitcoinSend;
