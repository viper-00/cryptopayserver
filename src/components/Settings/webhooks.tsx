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
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import { useSnackPresistStore, useStorePresistStore, useUserPresistStore } from 'lib/store';

const Webhooks = () => {
  const [IsWebhook, setIsWebhook] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const [payloadUrl, setPayloadUrl] = useState<string>();
  const [secret, setSecret] = useState<string>();
  const [showAutomaticRedelivery, setShowAutomaticRedelivery] = useState<boolean>();
  const [showEnabled, setShowEnabled] = useState<boolean>();
  const [eventType, setEventType] = useState<number>();

  const { getStoreId } = useStorePresistStore((state) => state);
  const { getUserId } = useUserPresistStore((state) => state);
  const { setSnackSeverity, setSnackOpen, setSnackMessage } = useSnackPresistStore((state) => state);

  const init = async () => {
    try {
      const find_webhook_resp: any = await axios.get(Http.find_store_webhook_setting, {
        params: {
          store_id: getStoreId(),
          user_id: getUserId(),
        },
      });

      if (find_webhook_resp.result && find_webhook_resp.data.length > 0) {
        console.log('list', find_webhook_resp.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const onClickAdd = async () => {
    try {
      const save_webhook_resp: any = await axios.post(Http.save_store_webhook_setting, {
        store_id: getStoreId(),
        user_id: getUserId(),
        payload_url: payloadUrl ? payloadUrl : '',
        secret: secret ? secret : '',
        automatic_redelivery: showAutomaticRedelivery ? 1 : 2,
        enabled: showEnabled ? 1 : 2,
        event_type: eventType ? eventType : '',
      });

      if (save_webhook_resp.result) {
        setSnackSeverity('success');
        setSnackMessage('Save successful!');
        setSnackOpen(true);

        clearInput()

        await init();

        setIsWebhook(false);
      } else {
        setSnackSeverity('error');
        setSnackMessage('Save failed!');
        setSnackOpen(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const clearInput = () => {
    setPayloadUrl('');
    setSecret('');
    setShowAutomaticRedelivery(false);
    setShowEnabled(false);
    setEventType(1);
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
            Webhooks allow CryptoPay Server to send HTTP events related to your store to another server.
          </Typography>
          <Typography mt={2} fontSize={14}>
            There are no webhooks yet.
          </Typography>
        </Box>
      ) : (
        <Box>
          <Typography variant="h6">Webhook Settings</Typography>
          <Box mt={2}>
            <Typography>Payload URL</Typography>
            <Box mt={1}>
              <TextField
                fullWidth
                hiddenLabel
                size="small"
                value={payloadUrl}
                onChange={(e: any) => {
                  setPayloadUrl(e.target.value);
                }}
              />
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
                value={secret}
                onChange={(e: any) => {
                  setSecret(e.target.value);
                }}
              />
            </FormControl>
            <Typography mt={1} fontSize={14}>
              The endpoint receiving the payload must validate the payload by checking that the HTTP header
              <span style={{ fontWeight: 'bold' }}> CryptoPay-SIG</span> of the callback matches the HMAC256 of the
              secret on the payload's body bytes.
            </Typography>
            <Stack mt={2} direction={'row'} alignItems={'center'}>
              <Switch
                checked={showAutomaticRedelivery}
                onChange={() => {
                  setShowAutomaticRedelivery(!showAutomaticRedelivery);
                }}
              />
              <Box ml={2}>
                <Typography>Automatic redelivery</Typography>
                <Typography mt={1} fontSize={14}>
                  We will try to redeliver any failed delivery after 10 seconds, 1 minute and up to 6 times after 10
                  minutes
                </Typography>
              </Box>
            </Stack>
            <Stack mt={3} direction={'row'} alignItems={'center'}>
              <Switch
                checked={showEnabled}
                onChange={() => {
                  setShowEnabled(!showEnabled);
                }}
              />
              <Typography ml={2}>Enabled</Typography>
            </Stack>
          </Box>

          <Box mt={5}>
            <Typography variant="h6">Events</Typography>
            <Typography mt={2}>Which events would you like to trigger this webhook?</Typography>
            <Box mt={1}>
              <Select
                size={'small'}
                inputProps={{ 'aria-label': 'Without label' }}
                value={eventType}
                onChange={(e: any) => {
                  setEventType(e.target.value);
                }}
              >
                <MenuItem value={1}>Send me everything</MenuItem>
                <MenuItem value={2}>Send specific events</MenuItem>
              </Select>
            </Box>
            <Box mt={4}>
              <Button variant={'contained'} size="large" onClick={onClickAdd}>
                Add webhook
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Webhooks;
