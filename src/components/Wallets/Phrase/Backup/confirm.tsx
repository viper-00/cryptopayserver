import { Box, Button, Card, CardContent, Chip, Container, Icon, Skeleton, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSnackPresistStore } from 'lib/store/snack';
import { useWalletPresistStore } from 'lib/store';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import { randomWords, addAndShuffleArray } from 'utils/strings';

type SelectMems = {
  id: number;
  index: number;
  selectArrays: string[];
  value: string;
};

const PhraseBackupConfirm = () => {
  const { setSnackOpen, setSnackMessage, setSnackSeverity } = useSnackPresistStore((state) => state);
  const { getIsWallet, getWalletId } = useWalletPresistStore((state) => state);

  const [selectMems, setSelectMems] = useState<SelectMems[]>([]);

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
          const phraseArray = resp.data[0].mnemonic.split(' ');
          setPhrase(phraseArray);

          // const randomNumberOne = getRandomNumber()
          const memOne: SelectMems = {
            id: 1,
            index: 5,
            selectArrays: addAndShuffleArray(randomWords(2), phraseArray[4]),
            value: phraseArray[4],
          };
          const memTwo: SelectMems = {
            id: 1,
            index: 8,
            selectArrays: addAndShuffleArray(randomWords(2), phraseArray[7]),
            value: phraseArray[7],
          };
          const memThree: SelectMems = {
            id: 1,
            index: 9,
            selectArrays: addAndShuffleArray(randomWords(2), phraseArray[8]),
            value: phraseArray[8],
          };

          let arrs: SelectMems[] = [memOne, memTwo, memThree];
          setSelectMems(arrs);
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

          <Typography>{phrase}</Typography>

          <Box mt={5} width={500}>
            <Card variant="outlined">
              <CardContent>
                {selectMems &&
                  selectMems.length > 0 &&
                  selectMems.map((item: SelectMems, index: number) => (
                    <Box key={index} pb={4}>
                      <Stack direction={'row'} alignItems={'center'}>
                        <Typography>Mnemonic phrase</Typography>
                        <Typography># {item.index}</Typography>
                      </Stack>

                      <Stack direction={'row'} alignItems={'center'} mt={2}>
                        {item.selectArrays &&
                          item.selectArrays.length > 0 &&
                          item.selectArrays.map((selectItem, selectIndex) => (
                            <Box>
                              <Button style={{ minWidth: 100 }}>{selectItem}</Button>
                            </Box>
                          ))}
                      </Stack>
                    </Box>
                  ))}
              </CardContent>
            </Card>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default PhraseBackupConfirm;
