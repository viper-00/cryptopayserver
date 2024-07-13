import { KeyboardArrowDown } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  Menu,
  MenuItem,
  OutlinedInput,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

const Emails = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Box>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography variant="h6">Email Rules</Typography>
          <Button variant={'contained'}>Configure</Button>
        </Stack>
        <Typography mt={2}>
          Email rules allow CryptoPay Server to send customized emails from your store based on events.
        </Typography>
      </Box>

      <Box mt={5}>
        <Typography variant="h6">Email Server</Typography>

        <Box mt={4}>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography>SMTP Server</Typography>
            <Button
              id="demo-positioned-button"
              aria-controls={open ? 'demo-positioned-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              endIcon={<KeyboardArrowDown />}
            >
              Quick Fill
            </Button>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <MenuItem onClick={handleClose}>Gamil.com</MenuItem>
              <MenuItem onClick={handleClose}>Yahoo.com</MenuItem>
              <MenuItem onClick={handleClose}>Outlook.com</MenuItem>
            </Menu>
          </Stack>
          <Box mt={1}>
            <TextField fullWidth hiddenLabel defaultValue="" size="small" />
          </Box>
        </Box>

        <Box mt={2}>
          <Typography>Port</Typography>
          <Box mt={1}>
            <FormControl fullWidth variant="outlined">
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
        </Box>
        <Box mt={2}>
          <Typography>Sender's Email Address</Typography>
          <Box mt={1}>
            <FormControl fullWidth variant="outlined">
              <OutlinedInput
                size={'small'}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                }}
              />
            </FormControl>
          </Box>
        </Box>
        <Box mt={2}>
          <Typography>Login</Typography>
          <Box mt={1}>
            <FormControl fullWidth variant="outlined">
              <OutlinedInput
                size={'small'}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                }}
              />
            </FormControl>
          </Box>
          <Typography>For many email providers (like Gmail) your login is your email address.</Typography>
        </Box>
        <Box mt={2}>
          <Typography>Password</Typography>
          <Box mt={1}>
            <FormControl fullWidth variant="outlined">
              <OutlinedInput
                size={'small'}
                type={'password'}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                }}
              />
            </FormControl>
          </Box>
        </Box>
        <Stack direction={'row'} alignItems={'center'} mt={2}>
          <Switch />
          <Typography ml={1}>TLS certificate security checks</Typography>
        </Stack>

        <Box mt={4}>
          <Button variant={'contained'}>Save</Button>
        </Box>
      </Box>

      <Box mt={5}>
        <Typography variant={'h6'}>Testing</Typography>
        <Box mt={4}>
          <Typography>To test your settings, enter an email address</Typography>
          <Box mt={1}>
            <FormControl fullWidth variant="outlined">
              <OutlinedInput
                size={'small'}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                }}
              />
            </FormControl>
          </Box>
        </Box>

        <Box mt={4}>
          <Button variant={'contained'}>Send Test Email</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Emails;
