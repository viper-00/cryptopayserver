import { Box, Button, Card, CardContent, Chip, Container, Icon, Skeleton, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSnackPresistStore } from 'lib/store/snack';
import { useWalletPresistStore } from 'lib/store';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
const PhraseBackupConfirm = () => {
  const { setSnackOpen, setSnackMessage, setSnackSeverity } = useSnackPresistStore((state) => state);
  const { getIsWallet, getWalletId } = useWalletPresistStore((state) => state);

  const [phrase, setPhrase] = useState<string[]>([]);

  async function init() {
    try {
      if (getIsWallet()) {
        const resp: any = await axios.get(Http.find_wallet_by_id, {
          params: {
            id: getWalletId(),
          },
        });

        if (resp.result && resp.data.length === 1) {
          setPhrase(resp.data[0].mnemonic.split(' '));
        } else {
          setSnackSeverity('error');
          setSnackMessage("Can't find the wallet, please try again later.");
          setSnackOpen(true);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <Box>
      <Container>
        <Stack mt={20}>
          <Typography variant="h4">Confirm your mnemonic phrase again</Typography>
          <Typography mt={5}>Please select your mnemonic phrase in order</Typography>

          <Box mt={5} width={500}>
            <Card variant="outlined">
              <CardContent></CardContent>
            </Card>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default PhraseBackupConfirm;
