import { ReportGmailerrorred } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import MetaTags from 'components/Common/MetaTags';
import { useState } from 'react';

const Shopify = () => {
  const [openShopify, setOpenShopify] = useState<boolean>(false);

  return (
    <Box>
      <MetaTags title="Shopify" />
      <Container>
        <Box>
          <Stack direction={'row'} alignItems={'center'} pt={5}>
            <Typography variant="h6">Shopify</Typography>
            <IconButton
              onClick={() => {
                setOpenShopify(!openShopify);
              }}
            >
              <ReportGmailerrorred />
            </IconButton>
          </Stack>
          <Typography mt={2}>
            Connect CryptoPay Server to your Shopify checkout experience to accept Bitcoin.
          </Typography>

          <Box mt={3}>
            <Typography>Shop Name</Typography>
            <Box mt={1}>
              <FormControl variant="outlined" fullWidth>
                <OutlinedInput
                  size={'small'}
                  id="outlined-adornment-weight"
                  endAdornment={<InputAdornment position="end">.myshopify.com</InputAdornment>}
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
              </FormControl>
            </Box>
          </Box>

          <Box mt={3}>
            <Typography>Api Key</Typography>
            <Box mt={1}>
              <FormControl fullWidth variant="outlined">
                <OutlinedInput
                  size={'small'}
                  id="outlined-adornment-weight"
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
              </FormControl>
            </Box>
          </Box>

          <Box mt={4}>
            <Typography>Admin API access token</Typography>
            <Box mt={1}>
              <FormControl fullWidth variant="outlined">
                <OutlinedInput
                  size={'small'}
                  id="outlined-adornment-weight"
                  type="password"
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
              </FormControl>
            </Box>
          </Box>

          <Box mt={5}>
            <Button variant={'contained'} size={'large'}>Save</Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Shopify;
