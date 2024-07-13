import { Box, Button, FormControl, OutlinedInput, Stack, Typography } from '@mui/material';
import { useUserPresistStore } from 'lib/store/user';

const MainAccount = () => {
  const { getUserEmail, getUsername } = useUserPresistStore((state) => state);

  return (
    <Box>
      <Typography variant={'h6'}>Update your account</Typography>
      <Box mt={4}>
        <Typography>Username</Typography>
        <Box mt={1}>
          <FormControl style={{ width: 400 }} variant="outlined">
            <OutlinedInput
              size={'small'}
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                'aria-label': 'weight',
              }}
              value={getUsername()}
              disabled
            />
          </FormControl>
        </Box>
      </Box>

      <Box mt={4}>
        <Typography>Email</Typography>
        <Stack direction={'row'} gap={2} mt={1}>
          <FormControl style={{ width: 400 }} variant="outlined">
            <OutlinedInput
              size={'small'}
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                'aria-label': 'weight',
              }}
              value={getUserEmail()}
            />
          </FormControl>
          <Button variant={'contained'}>Send verification email</Button>
        </Stack>
      </Box>

      <Box mt={4}>
        <Button variant={'contained'} size={'large'}>
          Save
        </Button>
      </Box>

      <Box mt={5}>
        <Typography variant={'h6'}>Delete Account</Typography>
        <Box mt={4}>
          <Button variant={'contained'} size={'large'}>
            Delete Account
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MainAccount;
