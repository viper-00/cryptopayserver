import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  OutlinedInput,
  Paper,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useState } from 'react';

const Payout = () => {
  const [isConfigure, setIsConfigure] = useState<boolean>(true);

  const setTrueConfigure = () => {
    setIsConfigure(true);
  };

  return (
    <Box>
      {!isConfigure ? (
        <Box>
          <Box>
            <Typography variant="h6">Payout Processors</Typography>
            <Typography mt={2}>Payout Processors allow CryptoPay Server to handle payouts in an automated way.</Typography>
          </Box>

          <Box mt={5}>
            <Typography variant="h6">Automated Bitcoin Sender</Typography>

            <Box mt={4}>
              <StorePayoutTable />
            </Box>
          </Box>
        </Box>
      ) : (
        <Box>
          <Typography variant="h6">Payout Processors</Typography>
          <Typography mt={2}>Set a schedule for automated Payouts.</Typography>
          <Stack direction={'row'} alignItems={'center'} mt={2}>
            <Switch />
            <Typography ml={2}>Process approved payouts instantly</Typography>
          </Stack>
          <Box mt={2}>
            <Typography>Interval</Typography>
            <Box mt={1}>
              <FormControl sx={{ width: '25ch' }} variant="outlined">
                <OutlinedInput
                  size={'small'}
                  id="outlined-adornment-weight"
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
            <Typography>Fee block target</Typography>
            <Box mt={1}>
              <FormControl sx={{ width: '25ch' }} variant="outlined">
                <OutlinedInput
                  size={'small'}
                  id="outlined-adornment-weight"
                  type="number"
                  endAdornment={<InputAdornment position="end">blocks</InputAdornment>}
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
              </FormControl>
            </Box>
          </Box>
          <Box mt={2}>
            <Typography>Threshold</Typography>
            <Box mt={1}>
              <FormControl sx={{ width: '25ch' }} variant="outlined">
                <OutlinedInput
                  size={'small'}
                  id="outlined-adornment-weight"
                  endAdornment={<InputAdornment position="end">BTC</InputAdornment>}
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
              </FormControl>
            </Box>
            <Typography mt={1}>Only process payouts when this payout sum is reached.</Typography>
          </Box>

          <Box mt={5}>
            <Button variant={'contained'}>Save</Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Payout;

function createData(id: number, paymentMethod: string) {
  return { id, paymentMethod };
}

const rows = [createData(1, 'BTC (On-Chain)'), createData(2, 'Ethereum')];

function StorePayoutTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.paymentMethod}
              </TableCell>
              <TableCell align="right">
                <Button
                  onClick={() => {
                    // setTrueConfigure();
                  }}
                >
                  Configure
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
