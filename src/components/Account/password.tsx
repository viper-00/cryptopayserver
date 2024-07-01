import { Box, Button, FormControl, OutlinedInput, Stack, Typography } from '@mui/material';

const Password = () => {
  return (
    <Box>
      <Typography variant={'h6'}>Change your password</Typography>
      <Box mt={4}>
        <Typography>Current password</Typography>
        <Box mt={1}>
          <FormControl variant="outlined" fullWidth>
            <OutlinedInput
              size={'small'}
              id="outlined-adornment-weight"
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                'aria-label': 'weight',
              }}
              type={'password'}
            />
          </FormControl>
        </Box>
      </Box>

      <Box mt={4}>
        <Typography>New password</Typography>
        <Box mt={1}>
          <FormControl variant="outlined" fullWidth>
            <OutlinedInput
              size={'small'}
              id="outlined-adornment-weight"
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                'aria-label': 'weight',
              }}
              type={'password'}
            />
          </FormControl>
        </Box>
      </Box>

      <Box mt={4}>
        <Typography>Confirm new password</Typography>
        <Box mt={1}>
          <FormControl variant="outlined" fullWidth>
            <OutlinedInput
              size={'small'}
              id="outlined-adornment-weight"
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                'aria-label': 'weight',
              }}
              type={'password'}
            />
          </FormControl>
        </Box>
      </Box>

      <Box mt={5}>
        <Button variant={'contained'} size={'large'}>
          Update Password
        </Button>
      </Box>
    </Box>
  );
};

export default Password;
