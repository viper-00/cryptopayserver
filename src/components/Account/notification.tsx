import { Box, Button, FormControl, OutlinedInput, Stack, Switch, Typography } from '@mui/material';

const Notification = () => {
  return (
    <Box>
      <Typography variant={'h6'}>Notification Settings</Typography>
      <Typography mt={2}>To disable notification for a feature, kindly toggle off the specified feature.</Typography>

      <Box mt={2}>
        <Stack direction={'row'} alignItems={'center'}>
          <Switch defaultChecked />
          <Typography ml={2}>New version</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'}>
          <Switch defaultChecked />
          <Typography ml={2}>New user requires approval</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'}>
          <Switch defaultChecked />
          <Typography ml={2}>User accepted invitation</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'}>
          <Switch defaultChecked />
          <Typography ml={2}>Plugin update</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'}>
          <Switch defaultChecked />
          <Typography ml={2}>All invoice updates</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'}>
          <Switch defaultChecked />
          <Typography ml={2}>Invoice was paid after expiration</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'}>
          <Switch defaultChecked />
          <Typography ml={2}>Invoice expired with partial payments</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'}>
          <Switch defaultChecked />
          <Typography ml={2}>Invoice has payments that failed to confirm on time</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'}>
          <Switch defaultChecked />
          <Typography ml={2}>Invoice is settled</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'}>
          <Switch defaultChecked />
          <Typography ml={2}>Payouts</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'}>
          <Switch defaultChecked />
          <Typography ml={2}>External payout approval</Typography>
        </Stack>
      </Box>

      <Stack direction={'row'} alignItems={'center'} mt={4} gap={2}>
        <Button variant={'contained'}>Save</Button>
        <Button variant={'contained'}>Disable all notifications</Button>
      </Stack>
    </Box>
  );
};

export default Notification;
