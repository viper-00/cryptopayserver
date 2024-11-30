import { ReportGmailerrorred, WarningAmber } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  Icon,
  IconButton,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { useSnackPresistStore, useStorePresistStore, useUserPresistStore } from 'lib/store';
import { CURRENCY, REQUEST_CUSTOMER_DATA } from 'packages/constants';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

const Requests = () => {
  const [openRequest, setOpenRequest] = useState<boolean>(false);
  const [openCreateRequest, setOpenCreateRequest] = useState<boolean>(false);

  const [title, setTitle] = useState<string>('');
  const [amount, setAmount] = useState<number>();
  const [currency, setCurrency] = useState<string>(CURRENCY[0]);
  const [allowCustomAmount, setAllowCustomAmount] = useState<boolean>(false);
  const [expirationDate, setExpirationDate] = useState<Dayjs>();
  const [email, setEmail] = useState<string>('');
  const [requestCustomerData, setRequestCustomerData] = useState<string>(REQUEST_CUSTOMER_DATA[0]);
  const [memo, setMemo] = useState<string>('');

  const { getNetwork } = useUserPresistStore((state) => state);
  const { getStoreId } = useStorePresistStore((state) => state);
  const { setSnackOpen, setSnackMessage, setSnackSeverity } = useSnackPresistStore((state) => state);

  const onClickCreate = async () => {
    console.log('expirationDate', expirationDate);
  };

  const handleDateChange = (newValue: Dayjs) => {
    setExpirationDate(newValue);
  };

  return (
    <Box>
      <Container>
        {openCreateRequest ? (
          <Box>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} pt={5}>
              <Typography variant="h6">Create Payment Requests</Typography>
              <Button variant={'contained'} onClick={onClickCreate}>
                Create
              </Button>
            </Stack>

            <Box mt={3}>
              <Typography>Title</Typography>
              <Box mt={1}>
                <FormControl variant="outlined" fullWidth>
                  <OutlinedInput
                    size={'small'}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      'aria-label': 'weight',
                    }}
                    value={title}
                    onChange={(e: any) => {
                      setTitle(e.target.value);
                    }}
                  />
                </FormControl>
              </Box>

              <Grid container justifyContent={'space-between'} mt={4}>
                <Grid item xs={8}>
                  <Typography>Amount</Typography>
                  <Box mt={1}>
                    <FormControl variant="outlined" fullWidth>
                      <OutlinedInput
                        size={'small'}
                        type="number"
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
                  </Box>
                  <Typography mt={1} color={'red'}>
                    Please provide an amount greater than 0
                  </Typography>
                </Grid>

                <Grid item xs={3}>
                  <Typography>Currency</Typography>
                  <Box mt={1}>
                    <FormControl variant="outlined" fullWidth>
                      <Select
                        size={'small'}
                        inputProps={{ 'aria-label': 'Without label' }}
                        value={currency}
                        onChange={(e: any) => {
                          setCurrency(e.target.value);
                        }}
                      >
                        {CURRENCY &&
                          CURRENCY.length > 0 &&
                          CURRENCY.map((item, index) => (
                            <MenuItem value={item} key={index}>
                              {item}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
              </Grid>

              <Stack mt={4} direction={'row'} alignItems={'center'}>
                <Switch
                  checked={allowCustomAmount}
                  onChange={() => {
                    setAllowCustomAmount(!allowCustomAmount);
                  }}
                />
                <Typography>Allow payee to create invoices with custom amounts</Typography>
              </Stack>

              <Box mt={4}>
                <Typography>Expiration Date</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateRangePicker']}>
                    <DemoItem>
                      <DateTimePicker
                        value={expirationDate}
                        onSelectedSectionsChange={(e: any) => {
                          setExpirationDate(e.target.value);
                        }}
                      />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
              </Box>

              <Box mt={4}>
                <Typography>Email</Typography>
                <Box mt={1}>
                  <FormControl variant="outlined" fullWidth>
                    <OutlinedInput
                      size={'small'}
                      aria-describedby="outlined-weight-helper-text"
                      inputProps={{
                        'aria-label': 'weight',
                      }}
                      value={email}
                      onChange={(e: any) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </FormControl>
                </Box>
              </Box>

              <Box mt={4}>
                <Typography>Request customer data on checkout</Typography>
                <Box mt={1}>
                  <FormControl sx={{ width: 300 }}>
                    <Select
                      size={'small'}
                      inputProps={{ 'aria-label': 'Without label' }}
                      value={requestCustomerData}
                      onChange={(e: any) => {
                        setRequestCustomerData(e.target.value);
                      }}
                    >
                      {REQUEST_CUSTOMER_DATA &&
                        REQUEST_CUSTOMER_DATA.length > 0 &&
                        REQUEST_CUSTOMER_DATA.map((item, index) => (
                          <MenuItem value={item} key={index}>
                            {item}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              <Box mt={4}>
                <Typography>Memo</Typography>
                <Box mt={1}>
                  <TextField
                    multiline
                    rows={8}
                    fullWidth
                    value={memo}
                    onChange={(e: any) => {
                      setMemo(e.target.value);
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} pt={5}>
              <Stack direction={'row'} alignItems={'center'}>
                <Typography variant="h6">Payment Requests</Typography>
                <IconButton
                  onClick={() => {
                    setOpenRequest(!openRequest);
                  }}
                >
                  <ReportGmailerrorred />
                </IconButton>
              </Stack>
              <Button
                variant={'contained'}
                onClick={() => {
                  setOpenCreateRequest(true);
                }}
              >
                Create Request
              </Button>
            </Stack>

            <Stack direction={'row'} mt={5} gap={3}>
              <Box>
                <FormControl sx={{ width: 700 }} variant="outlined">
                  <OutlinedInput
                    size={'small'}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      'aria-label': 'weight',
                    }}
                    placeholder="Search..."
                  />
                </FormControl>
              </Box>

              <Box>
                <FormControl sx={{ minWidth: 120 }}>
                  <Select
                    size={'small'}
                    inputProps={{ 'aria-label': 'Without label' }}
                    defaultValue={0}
                    //   value={age}
                    //   onChange={handleChange}
                  >
                    <MenuItem value={0}>All Status</MenuItem>
                    <Divider />
                    <MenuItem value={1}>Pending</MenuItem>
                    <MenuItem value={2}>Settled</MenuItem>
                    <MenuItem value={3}>Expired</MenuItem>
                    <Divider />
                    <MenuItem value={4}>Archived</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Stack>

            <Box mt={2}>
              <Typography>There are no payment requests matching your criteria.</Typography>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Requests;
