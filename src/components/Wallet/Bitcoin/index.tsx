import { ContentCopy, CopyAll, QrCode, Settings } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { useState } from 'react';

const Bitcoin = () => {
  const [isSettings, setIsSettings] = useState<boolean>(false);

  return (
    <Box>
      <Container>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} pt={5}>
          <Box>
            <Typography variant="h6">test BTC Wallet</Typography>
            <Typography>0.00000000 BTC (0.00 USD)</Typography>
          </Box>
          <Stack direction={'row'} alignItems={'center'} gap={2}>
            <Box>
              <Button variant={'contained'}>Send</Button>
            </Box>
            <Box>
              <Button variant={'contained'}>Receive</Button>
            </Box>
            <IconButton
              onClick={() => {
                setIsSettings(!isSettings);
              }}
            >
              <Settings />
            </IconButton>
          </Stack>
        </Stack>

        <Box mt={5}>
          {isSettings ? (
            <Box>
              <Typography variant="h6">BTC Wallet Settings</Typography>
              <Stack alignItems={'center'} direction={'row'} mt={2}>
                <Typography>Hot wallet</Typography>
                <Box ml={2}>
                  <FormControl sx={{ minWidth: 300 }}>
                    <Select
                      size={'small'}
                      inputProps={{ 'aria-label': 'Without label' }}
                      id="demo-simple-select-helper"
                      defaultValue={0}
                      //   value={age}

                      //   onChange={handleChange}
                    >
                      <MenuItem disabled value={0}>
                        <em>Actions</em>
                      </MenuItem>
                      <MenuItem value={1}>Rescan wallet for missing transactions</MenuItem>
                      <MenuItem value={2}>Prune old transactions from history</MenuItem>
                      <MenuItem value={3}>Register wallet for payment links</MenuItem>
                      <MenuItem value={4}>Replace wallet</MenuItem>
                      <MenuItem value={5}>Remove wallet</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Stack>
              <Stack alignItems={'center'} direction={'row'} mt={2}>
                <Switch />
                <Typography>Enabled</Typography>
              </Stack>

              <Box mt={2}>
                <Typography>Label</Typography>
                <Box mt={1}>
                  <FormControl variant="outlined">
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

              <Box mt={2}>
                <Typography>Derivation scheme</Typography>
                <Box mt={1}>
                  <FormControl sx={{ width: '500px' }} variant="outlined">
                    <OutlinedInput
                      size={'small'}
                      id="outlined-adornment-weight"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton aria-label="toggle password visibility" onClick={() => {}} edge="end">
                            <ContentCopy />
                          </IconButton>
                        </InputAdornment>
                      }
                      aria-describedby="outlined-weight-helper-text"
                      inputProps={{
                        'aria-label': 'weight',
                      }}
                      value={
                        'xpub6DRunDsNiq7TnoRURSkhQ3C5BL6GFPCCmifHup86urjRjJdvnue6ArArMvkhiAaMMbq3mtCoAGfL8DSLqZwzSHTXt8c7YismkM8oUaaaYiq'
                      }
                      disabled
                    />
                  </FormControl>
                </Box>
              </Box>

              <Box mt={5}>
                <Typography variant="h6">Account Key 0</Typography>

                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={2}>
                  <Typography>Account key</Typography>
                  <Stack direction={'row'} alignItems={'center'}>
                    <QrCode />
                    <Typography pl={1}>Show export QR</Typography>
                  </Stack>
                </Stack>

                <Box mt={1}>
                  <FormControl variant="outlined" fullWidth>
                    <OutlinedInput
                      size={'small'}
                      id="outlined-adornment-weight"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton aria-label="toggle password visibility" onClick={() => {}} edge="end">
                            <ContentCopy />
                          </IconButton>
                        </InputAdornment>
                      }
                      aria-describedby="outlined-weight-helper-text"
                      inputProps={{
                        'aria-label': 'weight',
                      }}
                      value={
                        'xpub6DRunDsNiq7TnoRURSkhQ3C5BL6GFPCCmifHup86urjRjJdvnue6ArArMvkhiAaMMbq3mtCoAGfL8DSLqZwzSHTXt8c7YismkM8oUaaaYiq'
                      }
                      disabled
                    />
                  </FormControl>
                </Box>

                <Stack direction={'row'} alignItems={'center'} mt={3}>
                  <Box>
                    <Typography>Master fingerprint</Typography>
                    <Box mt={1}>
                      <FormControl variant="outlined">
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
                  <Box ml={4}>
                    <Typography>Account key path</Typography>
                    <Box mt={1}>
                      <FormControl variant="outlined">
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
                </Stack>

                <Box mt={5}>
                  <Button variant={'contained'}>Save Wallet Settings</Button>
                </Box>
              </Box>

              <Box mt={5}>
                <Typography variant="h6">Payment</Typography>

                <Box mt={2}>
                  <Typography>Payment invalid if transactions fails to confirm … after invoice expiration</Typography>
                  <Box mt={2}>
                    <FormControl variant="outlined">
                      <OutlinedInput
                        size={'small'}
                        id="outlined-adornment-weight"
                        type="number"
                        endAdornment={<InputAdornment position="end">minutes</InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                          'aria-label': 'weight',
                        }}
                      />
                    </FormControl>
                  </Box>
                </Box>
                <Box mt={2}>
                  <Typography>Consider the invoice settled when the payment transaction …</Typography>
                  <Box mt={2}>
                    <FormControl sx={{ minWidth: 300 }}>
                      <Select
                        size={'small'}
                        inputProps={{ 'aria-label': 'Without label' }}
                        id="demo-simple-select-helper"
                        defaultValue={2}
                        //   value={age}

                        //   onChange={handleChange}
                      >
                        <MenuItem value={1}>Is unconfirmed</MenuItem>
                        <MenuItem value={2}>Has at least 1 confirmation</MenuItem>
                        <MenuItem value={3}>Has at least 2 confirmation</MenuItem>
                        <MenuItem value={4}>Has at least 6 confirmation</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                <Box mt={2}>
                  <Stack direction={'row'} alignItems={'center'}>
                    <Switch />
                    <Box ml={2}>
                      <Typography>Show recommended fee</Typography>
                      <Typography>Fee will be shown for BTC and LTC onchain payments only.</Typography>
                    </Box>
                  </Stack>
                </Box>

                <Typography mt={2}>Recommended fee confirmation target blocks</Typography>
                <Box mt={2}>
                  <FormControl variant="outlined">
                    <OutlinedInput
                      size={'small'}
                      id="outlined-adornment-weight"
                      type="number"
                      aria-describedby="outlined-weight-helper-text"
                      inputProps={{
                        'aria-label': 'weight',
                      }}
                    />
                  </FormControl>
                </Box>

                <Box mt={4}>
                  <Button variant={'contained'}>Save Payment Settings</Button>
                </Box>
              </Box>

              <Box mt={5}>
                <Typography variant="h6">Labels</Typography>
                <Box mt={2}>
                  <Button>Manage labels</Button>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box>
              <Typography>There are no transactions yet.</Typography>

              <Box mt={8}>
                <Typography>If CryptoPay Server shows you an invalid balance, rescan your wallet.</Typography>
                <Typography mt={1}>
                  If some transactions appear in CryptoPay Server, but are missing in another wallet, follow these
                  instructions.
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Bitcoin;
