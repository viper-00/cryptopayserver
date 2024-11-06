import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

const ApiKey = () => {
  const [page, setPage] = useState<number>(1);
  const [label, setLabel] = useState<string>('');

  const [showViewInvoices, setShowViewInvoices] = useState<boolean>(false);

  return (
    <Box>
      {page === 1 && (
        <>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography variant={'h6'}>API Keys</Typography>
            <Button
              variant={'contained'}
              size="large"
              onClick={() => {
                setPage(2);
              }}
            >
              Generate Key
            </Button>
          </Stack>

          <Typography mt={4}>
            The <Link href={'#'}>Greenfield API</Link> offers programmatic access to your instance. You can manage your
            CryptoPay Server (e.g. stores, invoices, users) as well as automate workflows and integrations (see{' '}
            <Link href={'#'}>use case examples</Link>). For that you need the API keys, which can be generated here.
            Find more information in the&nbsp;
            <Link href={'#'}>API authentication docs</Link>.
          </Typography>

          <Box mt={5}>
            <AccountApiKeyTable />
          </Box>
        </>
      )}

      {page === 2 && (
        <>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography variant={'h6'}>Generate API Key</Typography>
            <Button variant={'contained'} size="large" onClick={() => {}}>
              Generate API Key
            </Button>
          </Stack>

          <Typography mt={4}>Generate a new api key to use CryptoPay through its API.</Typography>

          <Box mt={3}>
            <Typography mb={1} fontSize={14}>
              Label
            </Typography>
            <TextField
              fullWidth
              hiddenLabel
              size="small"
              value={label}
              onChange={(e) => {
                setLabel(e.target.value);
              }}
            />
          </Box>

          <Box mt={3}>
            <Typography>Permissions</Typography>
            <Box mt={2}>
              <Card>
                <CardContent>
                  <Stack direction={'row'} alignItems={'flex-start'}>
                    <Checkbox
                      style={{ padding: 0 }}
                      checked={showViewInvoices}
                      onChange={() => {
                        setShowViewInvoices(!showViewInvoices);
                      }}
                    />
                    <Box ml={1}>
                      <Stack direction={'row'} alignItems={'center'}>
                        <Typography fontWeight={'bold'}>View invoices</Typography>
                        <Typography ml={1}>cryptopay.store.canviewinvoices</Typography>
                      </Stack>
                      <Typography mt={1} fontSize={14}>
                        Allows viewing invoices on the selected stores.
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </>
      )}
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
