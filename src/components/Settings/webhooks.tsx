import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

const Webhooks = () => {
  const [IsWebhook, setIsWebhook] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <Box>
      {!IsWebhook ? (
        <Box>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Typography variant="h6">Webhooks</Typography>
            <Button
              variant={'contained'}
              onClick={() => {
                setIsWebhook(true);
              }}
            >
              Create Webhook
            </Button>
          </Stack>

          <Typography mt={2}>
            Webhooks allow Pay Server to send HTTP events related to your store to another server.
          </Typography>
          <Typography mt={2}>There are no webhooks yet.</Typography>
        </Box>
      ) : (
        <Box>
          <Typography variant="h6">Webhook Settings</Typography>
          <Box mt={2}>
            <Typography>Payload URL</Typography>
            <Box mt={1}>
              <TextField fullWidth hiddenLabel defaultValue="" size="small" />
            </Box>
          </Box>
          <Box mt={3}>
            <Typography>Secret</Typography>
            <FormControl fullWidth>
              <OutlinedInput
                size={'small'}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                }}
              />
            </FormControl>
            <Typography mt={1}>
              The endpoint receiving the payload must validate the payload by checking that the HTTP header
              CryptoPay-SIG of the callback matches the HMAC256 of the secret on the payload's body bytes.
            </Typography>
            <Stack mt={4} direction={'row'} alignItems={'center'}>
              <Switch />
              <Box ml={2}>
                <Typography>Automatic redelivery</Typography>
                <Typography mt={1}>
                  We will try to redeliver any failed delivery after 10 seconds, 1 minute and up to 6 times after 10
                  minutes
                </Typography>
              </Box>
            </Stack>
            <Stack mt={3} direction={'row'} alignItems={'center'}>
              <Switch />
              <Typography ml={2}>Enabled</Typography>
            </Stack>
          </Box>

          <Box mt={5}>
            <Typography variant="h6">Events</Typography>
            <Typography mt={2}>Which events would you like to trigger this webhook?</Typography>
            <Box mt={2}>
              <Select
                size={'small'}
                inputProps={{ 'aria-label': 'Without label' }}
                id="demo-simple-select-helper"
                defaultValue={1}
                //   value={age}
                //   onChange={handleChange}
              >
                <MenuItem value={1}>Send me everything</MenuItem>
                <MenuItem value={2}>Send specific events</MenuItem>
              </Select>
            </Box>
            <Box mt={4}>
              <Button variant={'contained'}>Add webhook</Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Webhooks;
