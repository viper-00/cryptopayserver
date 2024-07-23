import { Box, Button, Card, CardContent, Container, Icon, Stack, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useEffect, useState } from 'react';
import { useSnackPresistStore } from 'lib/store/snack';

const PhraseBack = () => {
  const { setSnackOpen, setSnackMessage, setSnackSeverity } = useSnackPresistStore((state) => state);
  const [isDisable, setIsDisable] = useState<boolean>(true);

  const onClickBackup = () => {
    window.location.href = '/wallets/phrase/backup';
  };

  const onClickBackupLater = () => {
    window.location.href = '/dashboard';
  };

  useEffect

  return (
    <Box>
      <Container>
        <Stack mt={20}>
          <Typography variant="h4">Please record the following mnemonic phrase.</Typography>
          <Typography mt={5}>
            Connected devices may leak information. It is strongly recommended that you transcribe and securely store
            your mnemonic phrase as a backup.
          </Typography>

          <Box mt={5} width={500}>
            <Card variant="outlined">
              <CardContent>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}></Stack>
              </CardContent>
            </Card>
          </Box>

          <Box mt={16}>
            <Button variant={'contained'} size={'large'} onClick={onClickBackupLater} disabled={isDisable}>
              I have finished recording.
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default PhraseBack;
