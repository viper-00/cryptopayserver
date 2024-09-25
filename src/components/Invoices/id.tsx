import { ContentCopy, ExpandMore } from '@mui/icons-material';
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
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from '@mui/material';
import { useSnackPresistStore, useStorePresistStore, useUserPresistStore } from 'lib/store';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import { QRCodeSVG } from 'qrcode.react';
import { OmitMiddleString } from 'utils/strings';

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

  const [qrCodeVal, setQrCodeVal] = useState<string>('');

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

        const qrVal =
          'bitcoin:' + invoice_resp.data[0].destination_address + '?amount=' + '0.0012312' + 'pj=' + location.href;
        setQrCodeVal(qrVal);
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
    <Box mt={4}>
      <Container maxWidth="sm">
        <Typography textAlign={'center'}>{order.description}</Typography>
        <Stack direction={'row'} alignItems={'center'} mt={2} justifyContent={'center'}>
          <Typography fontSize={24} fontWeight={'bold'}>
            0.0012312311
          </Typography>
          <Typography ml={1} fontSize={24} fontWeight={'bold'}>
            BTC
          </Typography>
        </Stack>

        <Box mt={2}>
          <Alert variant="filled" severity="info">
            <Stack direction={'row'} alignItems={'center'}>
              <Typography>This invoice will expire in</Typography>
              <Typography ml={1}>00:28</Typography>
            </Stack>
          </Alert>
        </Box>

        <Box mt={2}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1-content">
              View Details
            </AccordionSummary>
            <AccordionDetails>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mb={1}>
                <Typography>Total Price</Typography>
                <Typography fontWeight={'bold'}>0.00123123 BTC</Typography>
              </Stack>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mb={1}>
                <Typography>Total Fiat</Typography>
                <Typography fontWeight={'bold'}>
                  {order.amount} {order.currency}
                </Typography>
              </Stack>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mb={1}>
                <Typography>Exchange Rate</Typography>
                <Typography fontWeight={'bold'}>1 BTC = $60000,00</Typography>
              </Stack>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mb={1}>
                <Typography>Amount Due</Typography>
                <Typography fontWeight={'bold'}>0.00123123 BTC</Typography>
              </Stack>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography>Recommended Fee</Typography>
                <Typography fontWeight={'bold'}>3.123 sat/byte</Typography>
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Box>

        <Box mt={2} textAlign={'center'}>
          <Paper style={{ padding: 20 }}>
            <QRCodeSVG
              value={qrCodeVal}
              width={250}
              height={250}
              imageSettings={{
                src: 'http://127.0.0.1:8888/btc.svg',
                width: 35,
                height: 35,
                excavate: false,
              }}
            />
          </Paper>
        </Box>

        <Box mt={4}>
          <Typography>ADDRESS</Typography>
          <Stack direction={'row'} alignItems={'center'}>
            <Typography mr={1}>{OmitMiddleString(order.destinationAddress, 10)}</Typography>
            <IconButton>
              <ContentCopy fontSize={'small'} />
            </IconButton>
          </Stack>
        </Box>

        <Box mt={2}>
          <Button variant={'contained'} size={'large'} fullWidth onClick={() => {}}>
            Pay in wallet
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default InvoiceDetails;
