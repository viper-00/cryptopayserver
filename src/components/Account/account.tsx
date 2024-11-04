import styled from '@emotion/styled';
import { CloudUpload } from '@mui/icons-material';
import { Box, Button, FormControl, OutlinedInput, Stack, Typography } from '@mui/material';
import { useUserPresistStore } from 'lib/store/user';
import Image from 'next/image';
import { useState } from 'react';

const MainAccount = () => {
  const { getUserEmail, getUsername } = useUserPresistStore((state) => state);

  const [profileUrl, setProfileUrl] = useState<string>('');

  const onClickSave = async () => {
    try {
    } catch (e) {
      console.error(e);
    }
  };

  const onClickDeleteAccount = async () => {
    try {
    } catch (e) {
      console.error(e);
    }
  };

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
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Typography variant={'h6'}>Update your account</Typography>
        <Button variant={'contained'} onClick={onClickSave} size="large">
          Save
        </Button>
      </Stack>

      <Box mt={4}>
        <Typography>Email</Typography>
        <Box mt={1}>
          <FormControl fullWidth variant="outlined">
            <OutlinedInput
              size={'small'}
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                'aria-label': 'weight',
              }}
              value={getUserEmail()}
            />
          </FormControl>
        </Box>
      </Box>

      <Box mt={2}>
        <Typography>Name</Typography>
        <Box mt={1}>
          <FormControl fullWidth variant="outlined">
            <OutlinedInput
              fullWidth
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

      <Box mt={2}>
        <Typography>Profile Picture</Typography>
        <Box mt={1}>
          {profileUrl && (
            <Box mt={4} mb={4}>
              <Image src={profileUrl} alt="logo" width={100} height={100} />
            </Box>
          )}

          <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUpload />}>
            Choose File
            <VisuallyHiddenInput type="file" />
          </Button>
        </Box>
      </Box>

      <Box mt={5}>
        <Typography variant={'h6'}>Delete Account</Typography>
        <Box mt={2}>
          <Button variant={'contained'} size={'large'} onClick={onClickDeleteAccount}>
            Delete Account
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MainAccount;
