import { AccountCircle, CloudUpload } from '@mui/icons-material';
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
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

const General = () => {
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  return (
    <Box>
      <Box>
        <Typography variant="h6">General</Typography>
        <Box mt={4}>
          <Typography>Store ID</Typography>
          <Box mt={1}>
            <TextField fullWidth hiddenLabel defaultValue="" size="small" />
          </Box>
        </Box>
        <Box mt={2}>
          <Typography>Store Name</Typography>
          <Box mt={1}>
            <TextField fullWidth hiddenLabel defaultValue="" size="small" />
          </Box>
        </Box>
        <Box mt={2}>
          <Typography>Store Website </Typography>
          <Box mt={1}>
            <TextField fullWidth hiddenLabel defaultValue="" size="small" />
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography variant="h6" mt={5}>
          Branding
        </Typography>
        <Box mt={4}>
          <Typography>Brand Color</Typography>
          <Box mt={1}>
            <TextField
              id="input-with-icon-textfield"
              hiddenLabel
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
          </Box>
        </Box>
        <Box mt={6}>
          <Typography>Logo</Typography>
          <Box mt={1}>
            <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUpload />}>
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button>
          </Box>
        </Box>
        <Box mt={6}>
          <Typography>Custom CSS</Typography>
          <Box mt={1}>
            <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUpload />}>
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button>
          </Box>
          <Typography mt={2}>
            Use this CSS to customize the public/customer-facing pages of this store. (Invoice, Payment Request, Pull
            Payment, etc.)
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography variant="h6" mt={5}>
          Payment
        </Typography>
        <Box mt={4}>
          <Typography>Default currency</Typography>
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
                <MenuItem value={1}>USD</MenuItem>
                <MenuItem value={2}>AAA</MenuItem>
                <MenuItem value={3}>BBB</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Stack direction={'row'} alignItems={'center'} mt={4}>
            <Switch />
            <Typography ml={2}>Allow anyone to create invoice</Typography>
            <Box ml={1}>
              <Icon component={ReportGmailerrorredIcon} />
            </Box>
          </Stack>

          <Stack direction={'row'} alignItems={'center'} mt={4}>
            <Typography>Add additional fee (network fee) to invoice …</Typography>
            <Box ml={1}>
              <Icon component={ReportGmailerrorredIcon} />
            </Box>
          </Stack>

          <Box mt={2}>
            <FormControl sx={{ minWidth: 500 }}>
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

          <Box mt={3}>
            <Stack direction={'row'} alignItems={'center'} mt={4}>
              <Typography>Invoice expires if the full amount has not been paid after …</Typography>
              <Box ml={1}>
                <Icon component={ReportGmailerrorredIcon} />
              </Box>
            </Stack>

            <Box mt={2}>
              <FormControl sx={{ width: '25ch' }} variant="outlined">
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

          <Box mt={3}>
            <Stack direction={'row'} alignItems={'center'} mt={4}>
              <Typography>Consider the invoice paid even if the paid amount is ... % less than expected</Typography>
              <Box ml={1}>
                <Icon component={ReportGmailerrorredIcon} />
              </Box>
            </Stack>

            <Box mt={2}>
              <FormControl sx={{ width: '25ch' }} variant="outlined">
                <OutlinedInput
                  size={'small'}
                  endAdornment={<InputAdornment position="end">percent</InputAdornment>}
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
              </FormControl>
            </Box>
          </Box>

          <Box mt={3}>
            <Stack direction={'row'} alignItems={'center'} mt={4}>
              <Typography>Minimum acceptable expiration time for BOLT11 for refunds</Typography>
              <Box ml={1}>
                <Icon component={ReportGmailerrorredIcon} />
              </Box>
            </Stack>

            <Box mt={2}>
              <FormControl sx={{ width: '25ch' }} variant="outlined">
                <OutlinedInput
                  size={'small'}
                  type="number"
                  endAdornment={<InputAdornment position="end">days</InputAdornment>}
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
              </FormControl>
            </Box>
          </Box>
          <Box mt={3}>
            <Button variant="contained">Save</Button>
          </Box>
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" mt={5}>
          Additional Actions
        </Typography>
        <Stack mt={4} direction={'row'} columnGap={3}>
          <Button variant="contained">Archive this store</Button>

          <Button variant="contained">Delete this store</Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default General;
