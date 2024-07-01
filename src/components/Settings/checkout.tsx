import {
  Box,
  Button,
  Container,
  FormControl,
  Icon,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  styled,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';

const Checkout = () => {
  return (
    <Box>
      <Box>
        <Typography variant="h6">Invoice Settings</Typography>
        <Box mt={4}>
          <Typography>Default payment method on checkout</Typography>
          <Box mt={2}>
            <FormControl sx={{ minWidth: 300 }}>
              <Select
                size={'small'}
                inputProps={{ 'aria-label': 'Without label' }}
                id="demo-simple-select-helper"
                defaultValue={1}
                //   value={age}

                //   onChange={handleChange}
              >
                <MenuItem value={1}>BTC(On-Chain)</MenuItem>
                <MenuItem value={2}>AAA</MenuItem>
                <MenuItem value={3}>BBB</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box mt={5}>
          <Typography>Enable payment methods only when amount is …</Typography>
          <Stack direction={'row'} alignItems={'center'} mt={2}>
            <Typography>BTC (On-Chain)</Typography>
            <Box ml={10}>
              <Select
                size={'small'}
                inputProps={{ 'aria-label': 'Without label' }}
                id="demo-simple-select-helper"
                defaultValue={1}
                //   value={age}
                //   onChange={handleChange}
              >
                <MenuItem value={1}>Greater than</MenuItem>
                <MenuItem value={2}>Less than</MenuItem>
              </Select>
            </Box>
            <Box ml={2}>
              <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                defaultValue=""
                size="small"
                placeholder="6.15 USD"
              />
            </Box>
          </Stack>
        </Box>
      </Box>

      <Box mt={5}>
        <Typography variant="h6">Checkout</Typography>
        <Stack direction={'row'} mt={5} alignItems={'center'}>
          <Switch />
          <Typography>Use the classic checkout</Typography>
        </Stack>
        <Stack direction={'row'} mt={2} alignItems={'center'}>
          <Switch />
          <Typography>Show "Pay in wallet" button</Typography>
        </Stack>
        <Stack direction={'row'} mt={2} alignItems={'center'}>
          <Switch />
          <Typography>Unify on-chain and lightning payment URL/QR code</Typography>
        </Stack>
        <Stack direction={'row'} mt={2} alignItems={'center'}>
          <Switch />
          <Typography>Display Lightning payment amounts in Satoshis</Typography>
        </Stack>
        <Stack direction={'row'} mt={2} alignItems={'center'}>
          <Switch />
          <Typography>Requires a refund email</Typography>
        </Stack>

        <Box mt={5}>
          <Typography>Default language on checkout</Typography>
          <Box mt={1}>
            <Select
              size={'small'}
              inputProps={{ 'aria-label': 'Without label' }}
              id="demo-simple-select-helper"
              defaultValue={1}
              //   value={age}
              //   onChange={handleChange}
            >
              <MenuItem value={1}>English</MenuItem>
              <MenuItem value={2}>English</MenuItem>
            </Select>
          </Box>

          <Box mt={3}>
            <Typography>Custom HTML title to display on Checkout page</Typography>
            <Box mt={1}>
              <TextField
                fullWidth
                hiddenLabel
                id="filled-hidden-label-small"
                defaultValue=""
                size="small"
              />
            </Box>
          </Box>

          <Box mt={3}>
            <Typography>Support URL</Typography>
            <Box mt={1}>
              <TextField
                fullWidth
                hiddenLabel
                id="filled-hidden-label-small"
                defaultValue=""
                size="small"
              />
            </Box>
            <Typography mt={1}>
              For support requests related to partially paid invoices. A "Contact Us" button with this link will be
              shown on the invoice expired page. Can contain the placeholders OrderId and InvoiceId. Can be any valid
              URI, such as a website, email, and Nostr.
            </Typography>
          </Box>

          <Box mt={4}>
            <Stack direction={'row'} alignItems={'center'}>
              <Switch />
              <Typography ml={1}>Only enable the payment method after user explicitly chooses it</Typography>
            </Stack>
            <Stack direction={'row'} alignItems={'center'}>
              <Switch />
              <Typography ml={1}>Redirect invoice to redirect url automatically after paid</Typography>
            </Stack>
          </Box>
        </Box>
      </Box>

      <Box mt={5}>
        <Typography variant="h6">Public receipt</Typography>
        <Box mt={5}>
          <Stack direction={'row'} alignItems={'center'}>
            <Switch />
            <Typography ml={1}>Enable public receipt page for settled invoices</Typography>
          </Stack>
          <Stack direction={'row'} alignItems={'center'}>
            <Switch />
            <Typography ml={1}>Show the payment list in the public receipt page</Typography>
          </Stack>
          <Stack direction={'row'} alignItems={'center'}>
            <Switch />
            <Typography ml={1}>Show the QR code of the receipt in the public receipt page</Typography>
          </Stack>
        </Box>

        <Box mt={4}>
          <Button variant={'contained'}>Save</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Checkout;
