import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Icon,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { useSnackPresistStore } from 'lib/store';
import { useState } from 'react';

const ImportPrivateKey = () => {
  const { setSnackOpen, setSnackMessage, setSnackSeverity } = useSnackPresistStore((state) => state);

  const onClickBatchImport = () => {
    setSnackMessage('No support right now');
    setSnackSeverity('error');
    setSnackOpen(true);
  };

  const handleButtonClick = () => {};

  return (
    <Box>
      <TextField label="Private key" multiline rows={10} style={{ width: 400 }} />
      <Box mt={5}>
        <Button onClick={onClickBatchImport}>
          <Typography>Batch import private key</Typography>
        </Button>
      </Box>

      <Box mt={5}>
        <Button size="large" variant={'contained'} onClick={() => handleButtonClick()}>
          Confirm
        </Button>
      </Box>
    </Box>
  );
};

export default ImportPrivateKey;
