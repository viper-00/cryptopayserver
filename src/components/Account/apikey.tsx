import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

const ApiKey = () => {
  return (
    <Box>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Typography variant={'h6'}>API Keys</Typography>
        <Button variant={'contained'}>Generate Key</Button>
      </Stack>

      <Typography mt={2}>
        The CryptoPay Server Greenfield API offers programmatic access to your instance. You can manage your CryptoPay
        Server (e.g. stores, invoices, users) as well as automate workflows and integrations (see use case examples).
        For that you need the API keys, which can be generated here. Find more information in the API authentication
        docs.
      </Typography>

      <Box mt={5}>
        <AccountApiKeyTable />
      </Box>
    </Box>
  );
};

export default ApiKey;

function createData(id: number, label: string, key: string, permissions: string) {
  return { id, label, key, permissions };
}

const rows = [createData(1, '123', 'reveal', 'no')];

function AccountApiKeyTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Label</TableCell>
            <TableCell>Key</TableCell>
            <TableCell>Permissions</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.label}
              </TableCell>
              <TableCell>{row.key}</TableCell>
              <TableCell>{row.permissions}</TableCell>
              <TableCell align="right">
                <Button>Delete</Button>
                <Button>Show QR</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
