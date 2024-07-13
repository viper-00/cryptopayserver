import { ReportGmailerrorred, WarningAmber } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
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
import { useState } from 'react';

const Requests = () => {
  const [openRequest, setOpenRequest] = useState<boolean>(false);
  const [openCreateRequest, setOpenCreateRequest] = useState<boolean>(false);

  return (
    <Box>
      <Container>
        {openCreateRequest ? (
          <Box>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} pt={5}>
              <Typography variant="h6">Create Payment Requests</Typography>
              <Button variant={'contained'}>Create</Button>
            </Stack>

            <Box mt={5}>
              <Typography>Title</Typography>
              <Box mt={1}>
                <FormControl sx={{ width: 700 }} variant="outlined">
                  <OutlinedInput
                    size={'small'}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      'aria-label': 'weight',
                    }}
                  />
                </FormControl>
              </Box>

              <Stack mt={4} alignItems={'baseline'} direction={'row'} gap={3}>
                <Box>
                  <Typography>Amount</Typography>
                  <Box mt={1}>
                    <FormControl sx={{ width: 500 }} variant="outlined">
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
                  <Typography mt={1}>Please provide an amount greater than 0</Typography>
                </Box>
                <Box>
                  <Typography>Currency</Typography>
                  <Box mt={1}>
                    <FormControl sx={{ width: 200 }}>
                      <Select
                        size={'small'}
                        inputProps={{ 'aria-label': 'Without label' }}
                        id="demo-simple-select-helper"
                        defaultValue={0}
                        //   value={age}
                        //   onChange={handleChange}
                      >
                        <MenuItem value={0}>USD</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              </Stack>

              <Stack mt={4} direction={'row'} alignItems={'center'}>
                <Switch />
                <Typography>Allow payee to create invoices with custom amounts</Typography>
              </Stack>

              <Box mt={4}>
                <Typography>Expiration Date</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateRangePicker']}>
                    <DemoItem>
                      <DateTimePicker />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
              </Box>

              <Box mt={4}>
                <Typography>Email</Typography>
                <Box mt={1}>
                  <FormControl sx={{ width: 700 }} variant="outlined">
                    <OutlinedInput
                      size={'small'}
                      aria-describedby="outlined-weight-helper-text"
                      inputProps={{
                        'aria-label': 'weight',
                      }}
                    />
                  </FormControl>
                  <Typography mt={1}>
                    This will send notification mails to the recipient, as configured by the email rules.
                  </Typography>
                  <Stack direction={'row'} alignItems={'center'} mt={1}>
                    <Icon component={WarningAmber} />
                    <Typography ml={1}>
                      No payment request related email rules have been configured for this store.
                    </Typography>
                  </Stack>
                </Box>
              </Box>

              <Box mt={4}>
                <Typography>Request customer data on checkout</Typography>
                <Box mt={1}>
                  <FormControl sx={{ width: 300 }}>
                    <Select
                      size={'small'}
                      inputProps={{ 'aria-label': 'Without label' }}
                      id="demo-simple-select-helper"
                      defaultValue={1}
                      //   value={age}
                      //   onChange={handleChange}
                    >
                      <MenuItem value={1}>Do not request any information</MenuItem>
                      <MenuItem value={2}>Request email address only</MenuItem>
                      <MenuItem value={3}>Request shipping address</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              <Box mt={4}>
                <Typography>Memo</Typography>
                <Box mt={1}>
                  <TextField id="outlined-multiline-static" multiline rows={8} fullWidth />
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
                    id="demo-simple-select-helper"
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
