import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import BalanceBars from './Balance';
import { FormatAlignCenter, FormatAlignLeft, FormatAlignRight } from '@mui/icons-material';
import { useStorePresistStore } from 'lib/store';
import { useState } from 'react';
import TransactionDataGrid from 'components/Payments/Transaction/TransactionDataGrid';
import InvoiceDataGrid from 'components/Payments/Invoice/InvoiceDataGrid';

const Dashboard = () => {
  const [walletBalanceAlignment, setWalletBalanceAlignment] = useState<'USD' | 'USDT' | 'USDC'>('USD');
  const [walletBalanceDayAlignment, setWalletBalanceDayAlignment] = useState<'WEEK' | 'MONTH' | 'YEAR'>('WEEK');

  const onChangeCurrency = (e: any) => {
    setWalletBalanceAlignment(e.target.value);
  };

  const onChangeDay = (e: any) => {
    setWalletBalanceDayAlignment(e.target.value);
  };

  const { getStoreName } = useStorePresistStore((state) => state);

  return (
    <Box>
      <Container>
        <Typography variant="h5" pt={5}>
          {getStoreName()}
        </Typography>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                  <Typography>Wallet Balance</Typography>
                  <ToggleButtonGroup value={walletBalanceAlignment} exclusive onChange={onChangeCurrency}>
                    <ToggleButton value="USD" aria-label="left aligned">
                      USD
                    </ToggleButton>
                    <ToggleButton value="USDT" aria-label="centered">
                      USDT
                    </ToggleButton>
                    <ToggleButton value="USDC" aria-label="right aligned">
                      USDC
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Stack>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mt={2}>
                  <Stack direction={'row'} alignItems={'baseline'}>
                    <Typography variant="h4">0.00</Typography>
                    <Typography ml={1}>{walletBalanceAlignment}</Typography>
                  </Stack>
                  <RadioGroup row value={walletBalanceDayAlignment} onChange={onChangeDay}>
                    <FormControlLabel value="WEEK" control={<Radio />} label="1W" />
                    <FormControlLabel value="MONTH" control={<Radio />} label="1M" />
                    <FormControlLabel value="YEAR" control={<Radio />} label="1Y" />
                  </RadioGroup>
                </Stack>

                <Box mt={2}>
                  <BalanceBars />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* <Grid item xs={4}>
            <Card variant="outlined">
              <CardContent>
                <Box>
                  <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-start'}>
                    <Box>
                      <Typography>
                        Paid invoices in the last&nbsp;
                        {walletBalanceDayAlignment === 'WEEK' && '7 days'}
                        {walletBalanceDayAlignment === 'MONTH' && '1 months'}
                        {walletBalanceDayAlignment === 'YEAR' && '1 years'}
                      </Typography>
                      <Typography mt={2} variant="h6">
                        0
                      </Typography>
                    </Box>
                    <Button
                      onClick={() => {
                        window.location.href = '/payments/invoices';
                      }}
                    >
                      Manage
                    </Button>
                  </Stack>
                  <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-start'} mt={4}>
                    <Box>
                      <Typography>Payouts Pending</Typography>
                      <Typography mt={2} variant="h6">
                        0
                      </Typography>
                    </Box>
                    <Button
                      onClick={() => {
                        window.location.href = '/payments/payouts';
                      }}
                    >
                      Manage
                    </Button>
                  </Stack>
                  <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-start'} mt={4}>
                    <Box>
                      <Typography>Refunds Issued</Typography>
                      <Typography mt={2} variant="h6">
                        0
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Grid> */}

          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                  <Typography variant="h5">Recent Transactions</Typography>
                  <Button
                    onClick={() => {
                      window.location.href = '/payments/transactions';
                    }}
                  >
                    View All
                  </Button>
                </Stack>

                <Box mt={3}>
                  <TransactionDataGrid source="dashboard" />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                  <Typography variant="h5">Recent Invoices</Typography>
                  <Button
                    onClick={() => {
                      window.location.href = '/payments/invoices';
                    }}
                  >
                    View All
                  </Button>
                </Stack>

                <Box mt={3}>
                  <InvoiceDataGrid source="dashboard" />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
