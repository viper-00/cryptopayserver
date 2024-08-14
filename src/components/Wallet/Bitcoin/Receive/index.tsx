import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ContentCopy } from '@mui/icons-material';

const BitcoinReceive = () => {
  const [alignment, setAlignment] = useState<'address' | 'link'>('address');

  const handleChange = (e: any) => {
    setAlignment(e.target.value);
  };
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Typography variant="h4" mt={4}>
        Receive BTC
      </Typography>
      <Box mt={2}>
        <ToggleButtonGroup color="primary" value={alignment} exclusive onChange={handleChange} aria-label="type">
          <ToggleButton value="address">Address</ToggleButton>
          <ToggleButton value="link">Link</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {alignment === 'address' ? (
        <>
          <Box mt={4} display="flex" justifyContent="center" width="100%" maxWidth={350}>
            <Paper
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <QRCodeSVG
                value={'sdfsdfs'}
                width={250}
                height={350}
                imageSettings={{
                  src: 'http://127.0.0.1:8888/btc.svg',
                  width: 35,
                  height: 35,
                  excavate: false,
                }}
              />
            </Paper>
          </Box>

          <Box mt={2}>
            <Typography mt={1} fontWeight={'bold'}>
              {'Address'.toUpperCase()}
            </Typography>
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Typography mr={1}>bc1qmxdysupv8------r0zn7dru8vxvl</Typography>
              <IconButton>
                <ContentCopy />
              </IconButton>
            </Stack>

            <Box mt={2} display="flex" flexDirection="column">
              <Button fullWidth variant="contained">
                A
              </Button>
              <Box mt={1}>
                <Button fullWidth variant="contained">
                  B
                </Button>
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <>
          <Box mt={4} display="flex" justifyContent="center" width="100%" maxWidth={350}>
            <Paper
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <QRCodeSVG
                value={'sdfsdfs'}
                width={250}
                height={350}
                imageSettings={{
                  src: 'http://127.0.0.1:8888/btc.svg',
                  width: 35,
                  height: 35,
                  excavate: false,
                }}
              />
            </Paper>
          </Box>

          <Box mt={2}>
            <Typography mt={1} fontWeight={'bold'}>
              {'payment link'.toUpperCase()}
            </Typography>
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Typography mr={1}>bitcoin:XXXXXXX?pj=http://localhost:8888/wallet/bitcoin/receive</Typography>
              <IconButton>
                <ContentCopy />
              </IconButton>
            </Stack>

            <Box mt={2} display="flex" flexDirection="column">
              <Button fullWidth variant="contained">
                A
              </Button>
              <Box mt={1}>
                <Button fullWidth variant="contained">
                  B
                </Button>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default BitcoinReceive;
