import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useSnackPresistStore, useStorePresistStore, useUserPresistStore, useWalletPresistStore } from 'lib/store';
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

type maxPriortyFeeType = {
  fast: number;
  normal: number;
  slow: number;
};

type Coin = {
  [currency: string]: string;
};

const EthereumSend = () => {
  const [alignment, setAlignment] = useState<'high' | 'average' | 'low'>('average');
  const [maxPriortyFeeAlignment, setMaxPriortyFeeAlignment] = useState<'fast' | 'normal' | 'slow'>('normal');
  const [feeObj, setFeeObj] = useState<feeType>();
  const [maxPriortyFeeObj, setMaxPriortyFeeObj] = useState<maxPriortyFeeType>();

  const [page, setPage] = useState<number>(1);
  const [fromAddress, setFromAddress] = useState<string>('');
  const [balance, setBalance] = useState<Coin>();
  const [destinationAddress, setDestinationAddress] = useState<string>('');
  const [amount, setAmount] = useState<string>();
  const [maxFee, setMaxFee] = useState<number>();
  const [maxPriortyFee, setMaxPriortyFee] = useState<number>();
  const [gasLimit, setGasLimit] = useState<number>();

  const [networkFee, setNetworkFee] = useState<number>();
  const [blockExplorerLink, setBlockExplorerLink] = useState<string>('');
  const [nonce, setNonce] = useState<number>(0);
  const [coin, setCoin] = useState<string>('ETH');

  const { getNetwork, getUserId } = useUserPresistStore((state) => state);
  const { getWalletId } = useWalletPresistStore((state) => state);
  const { getStoreId } = useStorePresistStore((state) => state);
  const { setSnackOpen, setSnackMessage, setSnackSeverity } = useSnackPresistStore((state) => state);

  const handleChangeFees = (e: any) => {
    switch (e.target.value) {
      case 'high':
        setMaxFee(WeiToGwei(feeObj?.high as number));
        break;
      case 'average':
        setMaxFee(WeiToGwei(feeObj?.average as number));
        break;
      case 'low':
        setMaxFee(WeiToGwei(feeObj?.low as number));
        break;
    }
    setAlignment(e.target.value);
  };

  const handleChangeMaxPriortyFee = (e: any) => {
    switch (e.target.value) {
      case 'fast':
        setMaxPriortyFee(WeiToGwei(maxPriortyFeeObj?.fast as number));
        break;
      case 'normal':
        setMaxPriortyFee(WeiToGwei(maxPriortyFeeObj?.normal as number));
        break;
      case 'slow':
        setMaxPriortyFee(WeiToGwei(maxPriortyFeeObj?.slow as number));
        break;
    }
    setMaxPriortyFeeAlignment(e.target.value);
  };

  const getEthereum = async () => {
    try {
      const find_payment_resp: any = await axios.get(Http.find_payment_by_chain_id, {
        params: {
          user_id: getUserId(),
          chain_id: CHAINS.ETHEREUM,
          store_id: getStoreId(),
          network: getNetwork() === 'mainnet' ? 1 : 2,
        },
      });
      if (find_payment_resp.result) {
        setFromAddress(find_payment_resp.data.address);
        setBalance(find_payment_resp.data.balance);

        await getEthereumNonce(find_payment_resp.data.address);
        await getEthereumGasLimit(find_payment_resp.data.address);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getEthereumGasLimit = async (from: string) => {
    try {
      const find_gas_limit_resp: any = await axios.get(Http.find_gas_limit, {
        params: {
          chain_id: CHAINS.ETHEREUM,
          network: getNetwork() === 'mainnet' ? 1 : 2,
          contract_address: '',
          from: from,
          to: destinationAddress,
          value: amount,
        },
      });
      if (find_gas_limit_resp.result) {
        setGasLimit(find_gas_limit_resp.data);
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
        setMaxFee(WeiToGwei(find_fee_resp.data.normal));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getEthereumMaxPriortyFee = async () => {
    try {
      const find_max_priorty_fee_resp: any = await axios.get(Http.find_max_priorty_fee, {
        params: {
          chain_id: CHAINS.ETHEREUM,
          network: getNetwork() === 'mainnet' ? 1 : 2,
        },
      });
      if (find_max_priorty_fee_resp.result) {
        setMaxPriortyFeeObj({
          fast: find_max_priorty_fee_resp.data.fast,
          normal: find_max_priorty_fee_resp.data.normal,
          slow: find_max_priorty_fee_resp.data.slow,
        });
        setMaxPriortyFee(WeiToGwei(find_max_priorty_fee_resp.data.normal));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getEthereumNonce = async (address: string) => {
    if (address && address != '') {
      try {
        const find_nonce_resp: any = await axios.get(Http.find_nonce, {
          params: {
            chain_id: CHAINS.ETHEREUM,
            network: getNetwork() === 'mainnet' ? 1 : 2,
            address: address,
          },
        });
        console.log('find_nonce_resp', find_nonce_resp);

        if (find_nonce_resp.result) {
          setNonce(find_nonce_resp.data);
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const onClickSignTransaction = async () => {
    // if (!(await checkAddress())) {
    //   setSnackSeverity('error');
    //   setSnackMessage('The destination address cannot be empty or input errors');
    //   setSnackOpen(true);
    //   return;
    // }
    // if (!checkAmount()) {
    //   setSnackSeverity('error');
    //   setSnackMessage('Insufficient balance or input error');
    //   setSnackOpen(true);
    //   return;
    // }

    // if (!checkFeeRate()) {
    //   setSnackSeverity('error');
    //   setSnackMessage('Incorrect fee rate');
    //   setSnackOpen(true);
    //   return;
    // }

    setPage(2);
  };

  const init = async () => {
    await getEthereum();
    await getEthereumFeeRate();
    await getEthereumMaxPriortyFee();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mb={10}>
      <Typography variant="h4" mt={4}>
        Send Coin on Ethereum
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
              {/* <Typography color={'red'} mt={1} display={addressAlert ? 'block' : 'none'}>
                The Destination Address field is required.
              </Typography> */}
            </Box>

            <Box mt={4}>
              <Stack mt={2} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Typography>Destination Address</Typography>
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
              {/* <Typography color={'red'} mt={1} display={addressAlert ? 'block' : 'none'}>
                The Destination Address field is required.
              </Typography> */}
            </Box>

            <Box mt={4}>
              <Typography>Coin</Typography>
              <Box mt={1}>
                <FormControl>
                  <RadioGroup
                    value={coin}
                    onChange={(e: any) => {
                      setCoin(e.target.value);
                    }}
                  >
                    {balance &&
                      Object.entries(balance).map((item, index) => (
                        <FormControlLabel
                          value={item[0]}
                          control={<Radio />}
                          label={`${item[0].toUpperCase()} => Balance: ${item[1]}`}
                          key={index}
                          labelPlacement={'end'}
                        />
                      ))}
                  </RadioGroup>
                </FormControl>
              </Box>
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
                      // if (parseFloat(e.target.value) > parseFloat(balance)) {
                      //   setAmountRed(true);
                      // } else {
                      //   setAmountRed(false);
                      // }
                    }}
                  />
                </FormControl>
              </Box>
              {/* <Typography color={'red'} mt={1} display={amountAlert ? 'block' : 'none'}>
                The field Amount must be between 1E-08 and 21000000.
              </Typography>
              <Typography mt={1} color={amountRed ? 'red' : 'none'} fontWeight={'bold'}>
                Your available balance is {balance} BTC.
              </Typography> */}
            </Box>

            <Box mt={4}>
              <Typography>Nonce</Typography>
              <Box mt={1}>
                <FormControl fullWidth variant="outlined">
                  <OutlinedInput
                    size={'small'}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      'aria-label': 'weight',
                    }}
                    type="number"
                    value={nonce}
                    onChange={(e: any) => {
                      setNonce(e.target.value);
                    }}
                  />
                </FormControl>
              </Box>
            </Box>

            <Box mt={4}>
              <Typography>MaxFee (GWEI)</Typography>
              <Box mt={1}>
                <FormControl sx={{ width: '25ch' }} variant="outlined">
                  <OutlinedInput
                    size={'small'}
                    type="number"
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      'aria-label': 'weight',
                    }}
                    value={maxFee}
                    onChange={(e: any) => {
                      setMaxFee(e.target.value);
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
                  <ToggleButton value="high">High</ToggleButton>
                  <ToggleButton value="average">Average</ToggleButton>
                  <ToggleButton value="low">Low</ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Stack>

            <Box mt={4}>
              <Typography>MaxPriortyFee (GWEI)</Typography>
              <Box mt={1}>
                <FormControl sx={{ width: '25ch' }} variant="outlined">
                  <OutlinedInput
                    size={'small'}
                    type="number"
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      'aria-label': 'weight',
                    }}
                    value={maxPriortyFee}
                    onChange={(e: any) => {
                      setMaxPriortyFee(e.target.value);
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
                  value={maxPriortyFeeAlignment}
                  exclusive
                  onChange={handleChangeMaxPriortyFee}
                  aria-label="type"
                >
                  <ToggleButton value="fast">Fast</ToggleButton>
                  <ToggleButton value="normal">Normal</ToggleButton>
                  <ToggleButton value="slow">Slow</ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Stack>

            <Box mt={4}>
              <Typography>Gas</Typography>
              <Box mt={1}>
                <FormControl sx={{ width: '25ch' }} variant="outlined">
                  <OutlinedInput
                    size={'small'}
                    type="number"
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      'aria-label': 'weight',
                    }}
                    value={gasLimit}
                    onChange={(e: any) => {
                      setGasLimit(e.target.value);
                    }}
                  />
                </FormControl>
              </Box>
            </Box>

            <Box mt={4}>
              <Typography>Miner Fee: {networkFee}</Typography>
            </Box>

            <Box mt={8}>
              <Button variant={'contained'} onClick={onClickSignTransaction}>
                Sign transaction
              </Button>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default EthereumSend;
