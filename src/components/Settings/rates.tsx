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

const Rates = () => {
  return (
    <Box>
      <Box>
        <Typography variant="h6">Rates</Typography>
        <Box mt={4}>
          <Typography>Preferred Price Source</Typography>
          <Box mt={2}>
            <FormControl fullWidth>
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
            <Typography mt={1}>Current Rates source is coingecko.</Typography>
          </Box>

          <Stack direction={'row'} alignItems={'center'} mt={4}>
            <Switch />
            <Box ml={2}>
              <Typography>Advanced rate rule scripting</Typography>
              <Typography>
                Enabling will modify your current rate sources. This is a feature for advanced users.
              </Typography>
            </Box>
          </Stack>

          <Box mt={4}>
            <Typography>Add Exchange Rate Spread</Typography>
            <Box mt={2}>
              <FormControl fullWidth variant="outlined">
                <OutlinedInput
                  size={'small'}
                  id="outlined-adornment-weight"
                  endAdornment={<InputAdornment position="end">%</InputAdornment>}
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
              </FormControl>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box mt={5}>
        <Typography variant="h6">Testing</Typography>
        <Box mt={4}>
          <Typography>Currency pairs to test against your rule (e.g. DOGE_USD,DOGE_CAD,BTC_CAD,BTC_USD)</Typography>
          <Stack direction={'row'} alignItems={'center'} gap={2} mt={1}>
            <TextField
              fullWidth
              hiddenLabel
              id="filled-hidden-label-small"
              defaultValue=""
              size="small"
            />
            <Button>Test</Button>
          </Stack>
        </Box>
      </Box>

      <Box mt={5}>
        <Typography variant="h6">Default Currency Pairs</Typography>
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

      <Box mt={5}>
        <Button variant={'contained'}>Save</Button>
      </Box>
    </Box>
  );
};

export default Rates;
