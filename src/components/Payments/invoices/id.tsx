import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  Stack,
  TableContainer,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { useSnackPresistStore, useStorePresistStore, useUserPresistStore } from 'lib/store';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';

type OrderType = {
  orderId: number;
  amount: number;
  buyerEmail: string;
  crypto: string;
  currency: string;
  description: string;
  destinationAddress: string;
  metadata: string;
  notificationEmail: string;
  notificationUrl: string;
  orderStatus: string;
  paid: number;
  paymentMethod: string;
  createdDate: number;
  expirationDate: number;
};

const InvoiceDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const { getNetwork } = useUserPresistStore((state) => state);
  const { getStoreId, getStoreName } = useStorePresistStore((state) => state);
  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);

  const [order, setOrder] = useState<OrderType>({
    orderId: 0,
    amount: 0,
    buyerEmail: '',
    crypto: '',
    currency: '',
    description: '',
    destinationAddress: '',
    metadata: '',
    notificationEmail: '',
    notificationUrl: '',
    orderStatus: '',
    paid: 0,
    paymentMethod: '',
    createdDate: 0,
    expirationDate: 0,
  });

  const init = async (id: any) => {
    try {
      const invoice_resp: any = await axios.get(Http.find_invoice_by_id, {
        params: {
          id: id,
          store_id: getStoreId(),
          network: getNetwork() === 'mainnet' ? 1 : 2,
        },
      });

      if (invoice_resp.result && invoice_resp.data.length === 1) {
        setOrder({
          orderId: invoice_resp.data[0].order_id,
          amount: invoice_resp.data[0].amount,
          buyerEmail: invoice_resp.data[0].buyer_email,
          crypto: invoice_resp.data[0].crypto,
          currency: invoice_resp.data[0].currency,
          description: invoice_resp.data[0].description,
          destinationAddress: invoice_resp.data[0].destination_address,
          metadata: invoice_resp.data[0].metadata,
          notificationEmail: invoice_resp.data[0].notification_email,
          notificationUrl: invoice_resp.data[0].notification_url,
          orderStatus: invoice_resp.data[0].order_status,
          paid: invoice_resp.data[0].paid,
          paymentMethod: invoice_resp.data[0].payment_method,
          createdDate: invoice_resp.data[0].created_date,
          expirationDate: invoice_resp.data[0].expiration_date,
        });
      } else {
        setSnackSeverity('error');
        setSnackMessage('Can not find the invoice!');
        setSnackOpen(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    id && init(id);
  }, [id]);

  return (
    <Box>
      <Container>
        <Stack direction={'row'} alignItems={'center'}>
          <Typography variant={'h5'} fontWeight={'bold'}>
            Invoice
          </Typography>
          <Typography variant={'h5'} fontWeight={'bold'} ml={1}>
            {order.orderId}
          </Typography>
        </Stack>

        <Stack direction={'row'} alignItems={'center'} mt={4}>
          <Button variant={'outlined'} onClick={() => {
            window.location.href = "/invoices/" + order.orderId
          }}>
            Checkout
          </Button>
          <Button variant={'outlined'} onClick={() => {}} style={{ marginLeft: 20 }}>
            Archive
          </Button>
        </Stack>

        <Box mt={4}>
          <Typography variant="h5" fontWeight={'bold'}>
            General Information
          </Typography>
          <List style={{ marginTop: 10 }}>
            <ListItem>
              <Grid container>
                <Grid item xs={3}>
                  <Typography>Store</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography>{getStoreName()}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
            <ListItem>
              <Grid container>
                <Grid item xs={3}>
                  <Typography>Order Id</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography>{order.orderId}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
            <ListItem>
              <Grid container>
                <Grid item xs={3}>
                  <Typography>State</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography>{order.orderStatus}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
            <ListItem>
              <Grid container>
                <Grid item xs={3}>
                  <Typography>Created Date</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography>{order.createdDate}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
            <ListItem>
              <Grid container>
                <Grid item xs={3}>
                  <Typography>Expiration Date</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography>{order.expirationDate}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
            <ListItem>
              <Grid container>
                <Grid item xs={3}>
                  <Typography>Total Amount Due</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography>
                    {order.amount} {order.currency}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
            <ListItem>
              <Grid container>
                <Grid item xs={3}>
                  <Typography>Refund Email</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography>{order.buyerEmail}</Typography>
                </Grid>
              </Grid>
            </ListItem>
          </List>
        </Box>

        <Box mt={4}>
          <Typography variant="h5" fontWeight={'bold'}>
            Product Information
          </Typography>

          <List style={{ marginTop: 10 }}>
            <ListItem>
              <Grid container>
                <Grid item xs={3}>
                  <Typography>Item Description</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography>{order.description}</Typography>
                </Grid>
              </Grid>
            </ListItem>
          </List>
        </Box>

        <Box mt={4}>
          <Typography variant="h5" fontWeight={'bold'}>
            Buyer Information
          </Typography>

          <List style={{ marginTop: 10 }}>
            <ListItem>
              <Grid container>
                <Grid item xs={3}>
                  <Typography>Email</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography>{order.buyerEmail}</Typography>
                </Grid>
              </Grid>
            </ListItem>
          </List>
        </Box>

        <Box mt={4}>
          <Typography variant="h5" fontWeight={'bold'}>
            Invoice Summary
          </Typography>

          <List style={{ marginTop: 10 }}>
            <ListItem>
              <Grid container>
                <Grid item xs={3}>
                  <Typography>Payment method</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography>{order.paymentMethod}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
            <ListItem>
              <Grid container>
                <Grid item xs={3}>
                  <Typography>Destination</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography>{order.destinationAddress}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
            <ListItem>
              <Grid container>
                <Grid item xs={3}>
                  <Typography>Rate</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography>123 USD</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
            <ListItem>
              <Grid container>
                <Grid item xs={3}>
                  <Typography>Total due</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography>0.0123123 BTC</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
            <ListItem>
              <Grid container>
                <Grid item xs={3}>
                  <Typography>Paid</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography>{order.paid}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
          </List>
        </Box>

        <Box mt={4}>
          <Typography variant="h5" fontWeight={'bold'}>
            Events
          </Typography>

          <Box mt={4}>
            <EventTab />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default InvoiceDetails;

function createData(date: string, message: string) {
  return { date, message };
}

const rows = [
  createData('6/14/24, 2:52:11 AM', 'Creation of invoice starting'),
  createData('6/14/24, 2:52:11 AM', 'Creation of invoice starting'),
  createData('6/14/24, 2:52:11 AM', 'Creation of invoice starting'),
  createData('6/14/24, 2:52:11 AM', 'Creation of invoice starting'),
  createData('6/14/24, 2:52:11 AM', 'Creation of invoice starting'),
  createData('6/14/24, 2:52:11 AM', 'Creation of invoice starting'),
];

export function EventTab() {
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.date} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.date}
                </TableCell>
                <TableCell align="left">{row.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
