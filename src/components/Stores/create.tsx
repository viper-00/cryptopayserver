import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { CustomLogo } from 'components/Logo/CustomLogo';
import { CURRENCY, PRICE_RESOURCE } from 'packages/constants';
import { useState } from 'react';

const CreateStore = () => {
  const [name, setName] = useState<string>('');
  const [currency, setCurrency] = useState<string>(CURRENCY[0]);
  const [priceSource, setPriceSource] = useState<string>(PRICE_RESOURCE[0]);

  const onCreateStore = () => {
    if (name !== '' && currency !== '' && priceSource !== '') {
    }
  };

  return (
    <Box>
      <Container>
        <Stack alignItems={'center'} mt={8}>
          <CustomLogo style={{ width: 50, height: 50 }}>C</CustomLogo>
          <Typography variant="h5" fontWeight={'bold'} mt={4}>
            Create a new store
          </Typography>
          <Typography variant="h6" mt={2}>
            Create a store to begin accepting payments.
          </Typography>

          <Card sx={{ width: 500, mt: 4, padding: 2 }}>
            <CardContent>
              <Box mt={3}>
                <Typography>Name</Typography>
                <Box mt={1}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    id="filled-hidden-label-small"
                    size="small"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </Box>
              </Box>
              <Box mt={3}>
                <Typography>Default currency</Typography>
                <Box mt={1}>
                  <Select
                    size={'small'}
                    inputProps={{ 'aria-label': 'Without label' }}
                    id="demo-simple-select-helper"
                    defaultValue={CURRENCY[0]}
                    onChange={(e) => {
                      setCurrency(e.target.value);
                    }}
                    fullWidth
                  >
                    {CURRENCY &&
                      CURRENCY.length > 0 &&
                      CURRENCY.map((item, index) => (
                        <MenuItem value={item} key={index}>
                          {item}
                        </MenuItem>
                      ))}
                  </Select>
                </Box>
              </Box>
              <Box mt={3}>
                <Typography>Preferred Price Source</Typography>
                <Box mt={1}>
                  <Select
                    size={'small'}
                    inputProps={{ 'aria-label': 'Without label' }}
                    id="demo-simple-select-helper"
                    defaultValue={PRICE_RESOURCE[0]}
                    onChange={(e) => {
                      setPriceSource(e.target.value);
                    }}
                    fullWidth
                  >
                    {PRICE_RESOURCE &&
                      PRICE_RESOURCE.length > 0 &&
                      PRICE_RESOURCE.map((item, index) => (
                        <MenuItem value={item} key={index}>
                          {item}
                        </MenuItem>
                      ))}
                  </Select>
                </Box>
                <Typography fontSize={14}>
                  The recommended price source gets chosen based on the default currency.
                </Typography>
              </Box>
              <Box mt={3}>
                <Button fullWidth variant={'contained'} size={'large'} onClick={onCreateStore}>
                  Create Store
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
};

export default CreateStore;
