import {
  Box,
  Button,
  Container,
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
import MetaTags from 'components/Common/MetaTags';

const Notifications = () => {
  return (
    <Box>
      <MetaTags title="Notifications" />
      <Container>
        <Box pt={5}>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography variant="h6">Notifications</Typography>
            <Button
              variant={'contained'}
              onClick={() => {
                window.location.href = '/account/notifications';
              }}
            >
              Settings
            </Button>
          </Stack>

          <Box mt={5}>
            <NotificationsTab />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Notifications;

function createData(id: number, date: string, message: string) {
  return { id, date, message };
}

const rows = [createData(1, '6/21/24, 11:30 PM', '	A new payout is awaiting for approval')];

function NotificationsTab() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Message</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell>{row.message}</TableCell>
              <TableCell align="right">
                <Button>Mark unseen</Button>
                <Button>Details</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
