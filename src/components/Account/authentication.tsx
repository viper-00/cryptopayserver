import { Box, Button, FormControl, OutlinedInput, Stack, Typography } from '@mui/material';

const Authentication = () => {
  return (
    <Box>
      <Typography variant={'h6'}>Two-Factor Authentication</Typography>
      <Typography mt={2}>
        Two-Factor Authentication (2FA) is an additional measure to protect your account. In addition to your password
        you will be asked for a second proof on login. This can be provided by an app (such as Google or Microsoft
        Authenticator) or a security device (like a Yubikey or your hardware wallet supporting FIDO2).
      </Typography>

      <Typography variant={"h6"} mt={4}>App-based 2FA</Typography>
    </Box>
  );
};

export default Authentication;
