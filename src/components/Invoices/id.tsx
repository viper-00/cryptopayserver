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
import { COINGECKO_IDS, ORDER_STATUS } from 'packages/constants';
import { BigDiv } from 'utils/number';
import { GetImgSrcByCrypto } from 'utils/qrcode';

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
  rate: number;
  totalPrice: string;
  amountDue: string;
};

const InvoiceDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);

  const [qrCodeVal, setQrCodeVal] = useState<string>('');
  const [countdownVal, setCountdownVal] = useState<string>('0');

  const [payStatus, setPayStatus] = useState<number>(1);

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
    rate: 0,
    totalPrice: '0',
    amountDue: '0',
  });

  const init = async (id: any) => {
    try {
      const invoice_resp: any = await axios.get(Http.find_invoice_by_id, {
        params: {
          id: id,
        },
      });

      if (invoice_resp.result && invoice_resp.data.length === 1) {
        const ids = COINGECKO_IDS[invoice_resp.data[0].crypto];
        const rate_response: any = await axios.get(Http.find_crypto_price, {
          params: {
            ids: ids,
            currency: invoice_resp.data[0].currency,
          },
        });

        const rate = rate_response.data[ids][(invoice_resp.data[0].currency as string).toLowerCase()];
        const totalPrice = parseFloat(BigDiv(invoice_resp.data[0].amount, rate)).toFixed(8);

        if (rate_response.result) {
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
            rate: rate,
            totalPrice: totalPrice,
            amountDue: totalPrice,
          });
        }

        const qrVal =
          'bitcoin:' + invoice_resp.data[0].destination_address + '?amount=' + totalPrice + '&pj=' + location.href;
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

    const activeInit = setInterval(() => {
      id && init(id);
    }, 10 * 1000);

    return () => clearInterval(activeInit);
  }, [id]);

  const countDownTime = () => {
    if (!order.expirationDate || order.expirationDate <= 0) {
      return;
    }

    const currentTime = Date.now();
    const remainingTime = order.expirationDate - currentTime;

    if (remainingTime <= 0) {
      return;
    }

    const seconds = Math.floor((remainingTime / 1000) % 60);
    const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    setCountdownVal(formattedTime);
  };

  useEffect(() => {
    const activeCountDownTime = setInterval(() => {
      countDownTime();
    }, 1000);

    return () => clearInterval(activeCountDownTime);
  }, [order.expirationDate]);

  return (
    <Box mt={4}>
      <Container maxWidth="sm">
        <Typography textAlign={'center'}>{order.description}</Typography>
        <Stack direction={'row'} alignItems={'center'} mt={2} justifyContent={'center'}>
          <Typography fontSize={24} fontWeight={'bold'}>
            {order.totalPrice}
          </Typography>
          <Typography ml={1} fontSize={24} fontWeight={'bold'}>
            {order.crypto}
          </Typography>
        </Stack>

        <Box mt={2}>
          {order.orderStatus === ORDER_STATUS.Processing && (
            <Alert variant="filled" severity="info">
              <Stack direction={'row'} alignItems={'center'}>
                <Typography>This invoice will expire in</Typography>
                <Typography ml={1}>{countdownVal}</Typography>
              </Stack>
            </Alert>
          )}

          {order.orderStatus === ORDER_STATUS.Settled && (
            <Alert variant="filled" severity="success">
              <Stack direction={'row'} alignItems={'center'}>
                <Typography>The order has been paid successfully</Typography>
              </Stack>
            </Alert>
          )}

          {order.orderStatus === ORDER_STATUS.Expired && (
            <Alert variant="filled" severity="warning">
              <Stack direction={'row'} alignItems={'center'}>
                <Typography>The order has expired, please do not continue to pay</Typography>
              </Stack>
            </Alert>
          )}
        </Box>

        <Box mt={2}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1-content">
              View Details
            </AccordionSummary>
            <AccordionDetails>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mb={1}>
                <Typography>Total Price</Typography>
                <Typography fontWeight={'bold'}>
                  {order.totalPrice} {order.crypto}
                </Typography>
              </Stack>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mb={1}>
                <Typography>Total Fiat</Typography>
                <Typography fontWeight={'bold'}>
                  {order.amount} {order.currency}
                </Typography>
              </Stack>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mb={1}>
                <Typography>Exchange Rate</Typography>
                <Typography fontWeight={'bold'}>
                  1 {order.crypto} = {order.rate} {order.currency}
                </Typography>
              </Stack>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mb={1}>
                <Typography>Amount Due</Typography>
                <Typography fontWeight={'bold'}>
                  {order.amountDue} {order.crypto}
                </Typography>
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Box>

        {order.orderStatus === ORDER_STATUS.Processing && (
          <Box mt={2} textAlign={'center'}>
            <Paper style={{ padding: 20 }}>
              <QRCodeSVG
                value={qrCodeVal}
                width={250}
                height={250}
                imageSettings={{
                  src: GetImgSrcByCrypto(order.crypto),
                  width: 35,
                  height: 35,
                  excavate: false,
                }}
              />
            </Paper>
          </Box>
        )}

        <Box mt={4}>
          <Typography>ADDRESS</Typography>
          <Stack direction={'row'} alignItems={'center'}>
            <Typography mr={1}>{OmitMiddleString(order.destinationAddress, 10)}</Typography>
            <IconButton>
              <ContentCopy fontSize={'small'} />
            </IconButton>
          </Stack>
        </Box>

        {order.orderStatus === ORDER_STATUS.Processing && (
          <Box mt={2}>
            <Button variant={'contained'} size={'large'} fullWidth onClick={() => {}}>
              Pay in wallet
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default InvoiceDetails;
