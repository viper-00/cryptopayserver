import { ContentCopy, ExpandMore } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Paper,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Card,
  CardContent,
} from '@mui/material';
import { useSnackPresistStore } from 'lib/store';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import { QRCodeSVG } from 'qrcode.react';
import { OmitMiddleString } from 'utils/strings';
import { ORDER_STATUS } from 'packages/constants';
import { GetImgSrcByCrypto } from 'utils/qrcode';
import Link from 'next/link';
import { FindChainNamesByChains, GetBlockchainAddressUrlByChainIds, GetBlockchainTxUrlByChainIds } from 'utils/web3';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BLOCKCHAIN, BLOCKCHAINNAMES, COIN } from 'packages/constants/blockchain';
import Image from 'next/image';

type paymentRequestType = {
  userId: number;
  storeId: number;
  network: number;
  title: string;
  amount: number;
  currency: string;
  memo: string;
  expirationDate: number;
  paymentRequestStatus: string;
  requesCustomerData: string;
  showAllowCustomAmount: boolean;
  email: string;
};

const PaymentRequestsDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [page, setPage] = useState<number>(1);

  const [paymentRequestData, setPaymentRequestData] = useState<paymentRequestType>();

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);

  const init = async () => {
    try {
      if (!id) return;

      const response: any = await axios.get(Http.find_payment_request_by_id, {
        params: {
          id: id,
        },
      });

      if (response.result && response.data.length === 1) {
        setPaymentRequestData({
          userId: response.data[0].user_id,
          storeId: response.data[0].store_id,
          network: response.data[0].network,
          title: response.data[0].title,
          amount: response.data[0].amount,
          currency: response.data[0].currency,
          memo: response.data[0].memo,
          expirationDate: response.data[0].expiration_date,
          paymentRequestStatus: response.data[0].payment_request_status,
          requesCustomerData: response.data[0].reques_customer_data,
          showAllowCustomAmount: response.data[0].show_allow_customAmount === 1 ? true : false,
          email: response.data[0].email,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const onClickPayInvoice = () => {
    setPage(2);
  };

  const onClickCoin = async (item: COIN) => {
    try {
      const create_invoice_resp: any = await axios.post(Http.create_invoice_from_external, {
        user_id: paymentRequestData?.userId,
        store_id: paymentRequestData?.storeId,
        chain_id: item.chainId,
        network: paymentRequestData?.network,
        amount: paymentRequestData?.amount,
        currency: paymentRequestData?.currency,
        crypto: item.name,
        notification_email: paymentRequestData?.email,
      });

      if (create_invoice_resp.result && create_invoice_resp.data.order_id) {
        setSnackSeverity('success');
        setSnackMessage('Successful creation!');
        setSnackOpen(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box mt={4}>
      <Container maxWidth="sm">
        <Typography textAlign={'center'} variant="h4">
          test
        </Typography>
        <Typography textAlign={'center'} mt={2}>
          Invoice from store
        </Typography>

        {page === 1 && (
          <Box mt={2}>
            <Card>
              <CardContent>
                <Stack direction={'row'} alignItems={'center'}>
                  <Typography variant="h5" fontWeight={'bold'}>
                    {paymentRequestData?.amount} {paymentRequestData?.currency}
                  </Typography>
                </Stack>
                <Box mt={2}>
                  {paymentRequestData?.memo ? (
                    <>
                      <Typography>{paymentRequestData.memo}</Typography>
                    </>
                  ) : (
                    <>
                      <Typography>No due date</Typography>
                    </>
                  )}
                </Box>

                <Box mt={4}>
                  <Button variant={'contained'} size="large" fullWidth onClick={onClickPayInvoice}>
                    Pay Invoice
                  </Button>
                </Box>

                <Stack mt={2} alignItems={'center'} gap={2} direction={'row'}>
                  <Button
                    variant={'outlined'}
                    fullWidth
                    onClick={() => {
                      window.print();
                    }}
                  >
                    Print
                  </Button>

                  <Button
                    variant={'outlined'}
                    fullWidth
                    onClick={async () => {
                      await navigator.clipboard.writeText(window.location.href);

                      setSnackMessage('Successfully copy');
                      setSnackSeverity('success');
                      setSnackOpen(true);
                    }}
                  >
                    Copy Link
                  </Button>
                </Stack>
              </CardContent>
            </Card>

            <Box mt={4}>
              <Card>
                <CardContent>
                  <Typography variant={'h6'}>Payment History</Typography>
                  <Typography mt={2}>No payments have been made yet.</Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>
        )}

        {page === 2 && (
          <Box mt={2}>
            <SelectChainAndCrypto network={paymentRequestData?.network as number} onClickCoin={onClickCoin} />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default PaymentRequestsDetails;

type SelectType = {
  network: number;
  onClickCoin: (item: COIN) => Promise<void>;
};

const SelectChainAndCrypto = (props: SelectType) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [blockchain, setBlcokchain] = useState<BLOCKCHAIN[]>([]);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    const value = BLOCKCHAINNAMES.filter((item: any) => (props.network === 1 ? item.isMainnet : !item.isMainnet));
    setBlcokchain(value);
  }, [props.network]);

  return (
    <Box>
      <Card>
        <CardContent>
          <Typography variant={'h5'} textAlign={'center'}>
            Select Chain and Crypto
          </Typography>
        </CardContent>
      </Card>
      <Box mt={2}>
        {blockchain &&
          blockchain.length > 0 &&
          blockchain.map((item, index) => (
            <Accordion expanded={expanded === item.name} onChange={handleChange(item.name)} key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content">
                <Typography sx={{ width: '33%', flexShrink: 0 }}>{item.name}</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{item.desc}</Typography>
              </AccordionSummary>
              {item.coins &&
                item.coins.length > 0 &&
                item.coins.map((coinItem, coinIndex) => (
                  <AccordionDetails key={coinIndex}>
                    <Button
                      onClick={async () => {
                        await props.onClickCoin(coinItem);
                      }}
                      fullWidth
                    >
                      <Image src={coinItem.icon} alt="icon" width={50} height={50} />
                      <Typography ml={2}>{coinItem.name}</Typography>
                    </Button>
                  </AccordionDetails>
                ))}
            </Accordion>
          ))}
      </Box>
    </Box>
  );
};
