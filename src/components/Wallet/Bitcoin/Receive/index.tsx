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
import { GenerateQrCode } from 'utils/qrcode';
import { ContentCopy, CopyAll } from '@mui/icons-material';

const BitcoinReceive = () => {
  const [alignment, setAlignment] = useState('address');

  const handleChange = (e: any) => {
    setAlignment(e.target.value);
  };
  return (
    <Box textAlign={'center'}>
      <Typography variant="h4">Receive BTC</Typography>
      <Box mt={2}>
        <ToggleButtonGroup color="primary" value={alignment} exclusive onChange={handleChange} aria-label="type">
          <ToggleButton value="address">Address</ToggleButton>
          <ToggleButton value="link">Link</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box
        display="inline-block" // Keeps the Paper element from taking up full width
        width={350} // Set the width of the Paper element
        textAlign="center" // Center text inside Paper
        mt={4} // Adds some margin-top
      >
        <Paper
          style={{
            width: '100%', // Ensure Paper takes up the full width of its container
            // padding: 20, // Optional: Add some padding around the QR code
            paddingBlock: 40,
            display: 'flex', // Use flexbox to center content
            justifyContent: 'center', // Center horizontally
            alignItems: 'center', // Center vertically
          }}
        >
          <QRCodeSVG
            value={'sdfsdfs'}
            width={250}
            height={250}
            imageSettings={{
              src: 'http://127.0.0.1:8888/btc.svg',
              width: 30,
              height: 30,
              excavate: false,
            }}
          />
        </Paper>
      </Box>

      <Box mt={2}>
        <Typography>Address</Typography>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
          <Typography mr={1}>bc1qmxdysupv8------r0zn7dru8vxvl</Typography>
          <IconButton>
            <ContentCopy />
          </IconButton>
        </Stack>
      </Box>

      <Box>
        <Button>A</Button>
        <Button>B</Button>
      </Box>
    </Box>
  );
};

export default BitcoinReceive;
