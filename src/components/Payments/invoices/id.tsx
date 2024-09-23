import { Box, Container, Typography } from '@mui/material';
import { useStorePresistStore, useUserPresistStore } from 'lib/store';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';

type OrderType = {
  amount: number;
  buyerEmail: string;
  createdDate: number;
  crypto: string;
  currency: string;
  description: string;
  destinationAddress: string;
  expiration_date: number;
  metadata: string;
  notificationEmail: string;
  notificationUrl: string;
  orderId: number;
  orderStatus: string;
  paid: number;
  paymentMethod: string;
};

const InvoiceDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const { getNetwork } = useUserPresistStore((state) => state);
  const { getStoreId } = useStorePresistStore((state) => state);

  const [order, setOrder] = useState<OrderType>();

  const init = async (id: any) => {
    try {
      const invoice_resp: any = await axios.get(Http.find_invoice_by_id, {
        params: {
          id: id,
          store_id: getStoreId(),
          network: getNetwork() === 'mainnet' ? 1 : 2,
        },
      });

      if (invoice_resp.result) {
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
        <Typography>Invoice </Typography>
      </Container>
    </Box>
  );
};

export default InvoiceDetails;
