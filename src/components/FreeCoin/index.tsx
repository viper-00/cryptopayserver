import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  Grid,
  InputAdornment,
  OutlinedInput,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { BLOCKCHAIN, BLOCKCHAINNAMES, COIN } from 'packages/constants/blockchain';
import { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FindChainNamesByChains } from 'utils/web3';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';

const FreeCoin = () => {
  const onClickCoin = async (item: COIN, address: string, amount: number) => {
    try {
        const resp: any = await axios.get(Http.get_free_coin)
    } catch(e) {
        console.error(e)
    }
  };

  return (
    <Box mt={4}>
      <Container>
        <Typography variant="h4" textAlign={'center'}>
          Get Testnet Coin
        </Typography>

        <Box mt={2}>
          <SelectChainAndCrypto network={2} amount={0} currency={''} onClickCoin={onClickCoin} />
        </Box>
      </Container>
    </Box>
  );
};

export default FreeCoin;

type SelectType = {
  network: number;
  amount: number;
  currency: string;
  onClickCoin: (item: COIN, address: string, amount: number) => Promise<void>;
};

const SelectChainAndCrypto = (props: SelectType) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [blockchain, setBlcokchain] = useState<BLOCKCHAIN[]>([]);
  const [selectCoinItem, setSelectCoinItem] = useState<COIN>();

  const [address, setAddress] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    const value = BLOCKCHAINNAMES.filter((item: any) => (props.network === 1 ? item.isMainnet : !item.isMainnet));
    setBlcokchain(value);
  }, [props.network]);

  return (
    <Box>
      <Card>
        <CardContent>
          <Typography variant={'h5'} textAlign={'center'} mt={1}>
            Select Chain and Crypto
          </Typography>
        </CardContent>
      </Card>
      <Box mt={2}>
        {blockchain &&
          blockchain.length > 0 &&
          blockchain.map((item, index) => (
            <Accordion expanded={expanded === item.name} onChange={handleChange(item.name)} key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content">
                <Typography sx={{ width: '33%', flexShrink: 0 }}>{item.name}</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{item.desc}</Typography>
              </AccordionSummary>
              {item.coins &&
                item.coins.length > 0 &&
                item.coins.map((coinItem, coinIndex) => (
                  <AccordionDetails key={coinIndex}>
                    <Button
                      fullWidth
                      onClick={async () => {
                        setSelectCoinItem(coinItem);
                      }}
                    >
                      <Image src={coinItem.icon} alt="icon" width={50} height={50} />
                      <Typography ml={2}>{coinItem.name}</Typography>
                    </Button>
                  </AccordionDetails>
                ))}
            </Accordion>
          ))}
      </Box>

      {selectCoinItem && (
        <Box mt={2}>
          <Card>
            <CardContent>
              <Grid container mt={2} gap={1} justifyContent={'space-between'} alignItems={'center'}>
                <Grid item xs={5}>
                  <FormControl variant="outlined" fullWidth>
                    <OutlinedInput
                      type="text"
                      endAdornment={
                        <InputAdornment position="end">{FindChainNamesByChains(selectCoinItem.chainId)}</InputAdornment>
                      }
                      aria-describedby="outlined-weight-helper-text"
                      inputProps={{
                        'aria-label': 'weight',
                      }}
                      value={address}
                      onChange={(e: any) => {
                        setAddress(e.target.value);
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl variant="outlined" fullWidth>
                    <OutlinedInput
                      type="number"
                      endAdornment={<InputAdornment position="end">{props.currency}</InputAdornment>}
                      aria-describedby="outlined-weight-helper-text"
                      inputProps={{
                        'aria-label': 'weight',
                      }}
                      value={amount}
                      onChange={(e: any) => {
                        setAmount(e.target.value);
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <Button
                    size={'large'}
                    variant={'contained'}
                    fullWidth
                    onClick={async () => {
                      await props.onClickCoin(selectCoinItem, address, amount);
                    }}
                  >
                    Claim Funds
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};
