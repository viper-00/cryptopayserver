import { Box, Button, Card, CardContent, Container, Icon, Stack, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useEffect } from 'react';
import { useSnackPresistStore } from 'lib/store/snack';

const PhraseIntro = () => {
  const { setSnackOpen, setSnackMessage, setSnackSeverity } = useSnackPresistStore((state) => state);

  const onClickBackup = () => {
    window.location.href = '/wallets/phrase/backup';
  };

  const onClickBackupLater = () => {
    window.location.href = '/dashboard';
  };

  return (
    <Box>
      <Container>
        <Stack mt={20}>
          <Typography variant="h4">
            Before recording the mnemonic phrase, please remember the following security tips.
          </Typography>

          <Stack direction={'row'} mt={10}>
            <Icon component={CheckCircleIcon} fontSize={'small'} color="success" />
            <Typography pl={1}>The mnemonic phrase is the only way to recover wallet assets.</Typography>
          </Stack>
          <Stack direction={'row'} mt={5}>
            <Icon component={CheckCircleIcon} fontSize={'small'} color="success" />
            <Typography pl={1}>Do not share your mnemonic phrase with anyone.</Typography>
          </Stack>
          <Stack direction={'row'} mt={5}>
            <Icon component={CheckCircleIcon} fontSize={'small'} color="success" />
            <Typography pl={1}>Handwrite the mnemonic phrase and store it in a secure place.</Typography>
          </Stack>
        </Stack>

        <Stack direction={'row'} mt={16}>
          <Button variant={'contained'} size={'large'} onClick={onClickBackup}>
            Back up the mnemonic phrase.
          </Button>
          <Button
            variant={'contained'}
            size={'large'}
            color="error"
            onClick={onClickBackupLater}
            style={{ marginLeft: 10 }}
          >
            Backup later.
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default PhraseIntro;
