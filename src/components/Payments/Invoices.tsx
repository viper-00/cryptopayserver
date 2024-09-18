import { ExpandMore, ReportGmailerrorred } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import InvoiceDataGrid from './Invoice/InvoiceDataGrid';
import { CURRENCY } from 'packages/constants';

const Invoices = () => {
  const [openInvoiceReport, setOpenInvoiceReport] = useState<boolean>(false);
  const [openCreateInvoice, setOpenCreateInvoice] = useState<boolean>(false);

  const [number, setNumber] = useState<number>();
  const [currency, setCurrency] = useState<string>(CURRENCY[0]);
  const [orderId, setOrderId] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [buyerEmail, setBuyerEmail] = useState<string>('');
  const [notificationUrl, setNotificationUrl] = useState<string>('');
  const [notificationEmail, setNotificationEmail] = useState<string>('');

  async function onClickCreateInvoice() {
    
  }

  return (
    <Box>
      <Container>
        {openCreateInvoice ? (
          <Box>
            <Box>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} pt={5}>
                <Typography variant="h6">Create Invoice</Typography>
                <Button variant={'contained'} onClick={onClickCreateInvoice}>
                  Create
                </Button>
              </Stack>

              <Stack direction={'row'} alignItems={'baseline'}>
                <Box mt={5}>
                  <Typography>Amount</Typography>
                  <Box mt={1}>
                    <TextField
                      fullWidth
                      hiddenLabel
                      defaultValue=""
                      size="small"
                      type="number"
                      onChange={(e: any) => {
                        setNumber(e.target.value);
                      }}
                      value={number}
                    />
                  </Box>
                </Box>
                <Box ml={5}>
                  <Typography>Currency</Typography>
                  <Box mt={1}>
                    <FormControl sx={{ minWidth: 300 }}>
                      <Select
                        size={'small'}
                        inputProps={{ 'aria-label': 'Without label' }}
                        defaultValue={CURRENCY[0]}
                        onChange={(e) => {
                          setCurrency(e.target.value);
                        }}
                        value={currency}
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
                </Box>
                <Box ml={5}>
                  <Typography>Crypto</Typography>
                  <Box mt={1}>
                    <TextField fullWidth hiddenLabel size="small" value={'BTC'} disabled />
                  </Box>
                </Box>
              </Stack>

              <Box mt={4}>
                <Typography>Order Id</Typography>
                <Box mt={1}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    defaultValue=""
                    size="small"
                    value={orderId}
                    onChange={(e: any) => {
                      setOrderId(e.target.value);
                    }}
                  />
                </Box>
              </Box>

              <Box mt={4}>
                <Typography>Item Description</Typography>
                <Box mt={1}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    defaultValue=""
                    size="small"
                    value={description}
                    onChange={(e: any) => {
                      setDescription(e.target.value);
                    }}
                  />
                </Box>
              </Box>

              {/* <Box mt={4}>
                <Typography>Supported Transaction Currencies</Typography>
                <Box mt={1}>
                  <Box mt={1}>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="BTC (On-Chain)" />
                  </Box>
                </Box>
              </Box> */}

              {/* <Box mt={4}>
                <Typography>Default payment method on checkout</Typography>
                <Box mt={1}>
                  <FormControl sx={{ minWidth: 300 }}>
                    <Select
                      size={'small'}
                      inputProps={{ 'aria-label': 'Without label' }}
                      id="demo-simple-select-helper"
                      defaultValue={1}
                      //   value={age}

                      //   onChange={handleChange}
                    >
                      <MenuItem value={1}>USD</MenuItem>
                      <MenuItem value={2}>AAA</MenuItem>
                      <MenuItem value={3}>BBB</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box> */}
            </Box>

            <Box mt={5}>
              <Typography variant="h6">Customer Information</Typography>
              <Box mt={4}>
                <Typography>Buyer Email</Typography>
                <Box mt={1}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    value={buyerEmail}
                    onChange={(e: any) => {
                      setBuyerEmail(e.target.value);
                    }}
                    size="small"
                  />
                </Box>
                {/* <Box mt={4}>
                  <Typography>Require Refund Email</Typography>
                  <Box mt={1}>
                    <FormControl sx={{ minWidth: 300 }}>
                      <Select
                        size={'small'}
                        inputProps={{ 'aria-label': 'Without label' }}
                        id="demo-simple-select-helper"
                        defaultValue={1}
                        //   value={age}

                        //   onChange={handleChange}
                      >
                        <MenuItem value={1}>USD</MenuItem>
                        <MenuItem value={2}>AAA</MenuItem>
                        <MenuItem value={3}>BBB</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box> */}
              </Box>
            </Box>

            <Box mt={5}>
              <Typography variant="h6">Additional Options</Typography>
              <Box mt={4}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1-content" id="panel1-header">
                    Metadata
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>Custom data to expand the invoice. This data is a JSON object.</Typography>

                    <Box mt={4}>
                      <Typography>Metadata</Typography>
                      <TextField hiddenLabel multiline rows={6} style={{ width: 600, marginTop: 10 }} />
                    </Box>
                  </AccordionDetails>
                </Accordion>

                <Box mt={4}>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel2-content" id="panel2-header">
                      Invoice Notifications
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box>
                        <Typography>Notification URL</Typography>
                        <Box mt={1}>
                          <TextField
                            fullWidth
                            hiddenLabel
                            size="small"
                            value={notificationUrl}
                            onChange={(e: any) => {
                              setNotificationUrl(e.target.value);
                            }}
                          />
                        </Box>
                      </Box>
                      <Box mt={4}>
                        <Typography>Notification Email</Typography>
                        <Box mt={1}>
                          <TextField
                            fullWidth
                            hiddenLabel
                            size="small"
                            value={notificationEmail}
                            onChange={(e: any) => {
                              setNotificationEmail(e.target.value);
                            }}
                          />
                        </Box>
                        <Typography mt={1}>Receive updates for this invoice.</Typography>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} pt={5}>
              <Stack direction={'row'} alignItems={'center'}>
                <Typography variant="h6">Invoices</Typography>
                <IconButton
                  onClick={() => {
                    setOpenInvoiceReport(!openInvoiceReport);
                  }}
                >
                  <ReportGmailerrorred />
                </IconButton>
              </Stack>
              <Button
                variant={'contained'}
                onClick={() => {
                  setOpenCreateInvoice(true);
                }}
              >
                Create Invoice
              </Button>
            </Stack>

            <Stack mt={5} direction={'row'} gap={2}>
              <FormControl sx={{ width: 500 }} variant="outlined">
                <OutlinedInput
                  size={'small'}
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
              </FormControl>
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
                  <MenuItem value={1}>Settled</MenuItem>
                  <MenuItem value={2}>Processing</MenuItem>
                  <MenuItem value={3}>Expired</MenuItem>
                  <MenuItem value={4}>Invalid</MenuItem>
                  <Divider />
                  <MenuItem value={5}>Settled Late</MenuItem>
                  <MenuItem value={6}>Settled Partial</MenuItem>
                  <MenuItem value={7}>Settled Over</MenuItem>
                  <MenuItem value={8}>Unusual</MenuItem>
                  <Divider />
                  <MenuItem value={9}>Include archived</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 120 }}>
                <Select
                  size={'small'}
                  inputProps={{ 'aria-label': 'Without label' }}
                  id="demo-simple-select-helper"
                  defaultValue={0}
                  //   value={age}
                  //   onChange={handleChange}
                >
                  <MenuItem value={0}>All Plugins</MenuItem>
                  <Divider />
                  <MenuItem value={1}>test</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 120 }}>
                <Select
                  size={'small'}
                  inputProps={{ 'aria-label': 'Without label' }}
                  id="demo-simple-select-helper"
                  defaultValue={0}
                  //   value={age}
                  //   onChange={handleChange}
                >
                  <MenuItem value={0}>All Time</MenuItem>
                  <Divider />
                  <MenuItem value={1}>Last 24 hours</MenuItem>
                  <MenuItem value={2}>Last 3 days</MenuItem>
                  <MenuItem value={3}>Last 7 days</MenuItem>
                  <MenuItem value={4}>Custom Range</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            <Box mt={5}>
              <InvoiceDataGrid />
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Invoices;
