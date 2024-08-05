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
import TransactionDataGrid from './Transaction';
import { useStorePresistStore } from 'lib/store';

const Dashboard = () => {
  const onChangeToggle = () => {};

  const { getStoreName } = useStorePresistStore((state) => state);

  return (
    <Box>
      <Container>
        <Typography variant="h5" pt={5}>{getStoreName()}</Typography>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={8}>
            <Card variant="outlined">
              <CardContent>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                  <Typography>Wallet Balance</Typography>
                  <ToggleButtonGroup value={''} exclusive onChange={onChangeToggle} aria-label="text alignment">
                    <ToggleButton value="left" aria-label="left aligned">
                      <FormatAlignLeft />
                    </ToggleButton>
                    <ToggleButton value="center" aria-label="centered">
                      <FormatAlignCenter />
                    </ToggleButton>
                    <ToggleButton value="right" aria-label="right aligned">
                      <FormatAlignRight />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Stack>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mt={2}>
                  <Stack direction={'row'}>
                    <Typography>0.00</Typography>
                    <Typography ml={1}>USDC</Typography>
                  </Stack>
                  <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                    <FormControlLabel value="female" control={<Radio />} label="1W" />
                    <FormControlLabel value="male" control={<Radio />} label="1M" />
                    <FormControlLabel value="other" control={<Radio />} label="1Y" />
                  </RadioGroup>
                </Stack>

                <Box mt={2}>
                  <BalanceBars />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={4}>
            <Card variant="outlined">
              <CardContent>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                  <Box>
                    <Typography>Paid invoices in the last 7 days</Typography>
                    <Typography mt={2}>0</Typography>
                    <Typography mt={5}>Payouts Pending</Typography>
                    <Typography mt={2}>0</Typography>
                    <Typography mt={5}>Refunds Issued</Typography>
                    <Typography mt={2}>0</Typography>
                  </Box>
                  <Box>
                    <Button>Manage</Button>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                  <Typography variant="h5">Recent Transactions</Typography>
                  <Button>View All</Button>
                </Stack>

                <Box mt={3}>
                  <TransactionDataGrid />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                  <Typography variant="h5">Recent Invoices</Typography>
                  <Button>View All</Button>
                </Stack>

                <Box mt={3}>
                  <TransactionDataGrid />
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
