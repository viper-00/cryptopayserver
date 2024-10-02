import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useSnackPresistStore, useStorePresistStore, useUserPresistStore } from 'lib/store';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';

type RowType = {
  id: number;
  orderId: number;
  amount: number;
  currency: string;
  crypto: string;
  createdDate: string;
  expirationDate: string;
  orderStatus: string;
};

export default function InvoiceDataGrid() {
  const [rows, setRows] = useState<RowType[]>([]);

  const { getNetwork } = useUserPresistStore((state) => state);
  const { getStoreId } = useStorePresistStore((state) => state);
  const { setSnackOpen, setSnackMessage, setSnackSeverity } = useSnackPresistStore((state) => state);

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'orderId',
      headerName: 'Order Id',
      // editable: true,
      width: 200,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 100,
    },
    {
      field: 'currency',
      headerName: 'Currency',
      width: 100,
    },
    {
      field: 'crypto',
      headerName: 'Crypto',
      width: 100,
    },
    {
      field: 'createdDate',
      headerName: 'Created Date',
      width: 200,
    },
    {
      field: 'expirationDate',
      headerName: 'Expiration Date',
      width: 200,
    },
    {
      field: 'orderStatus',
      headerName: 'Order Status',
      width: 200,
    },
  ];

  const init = async () => {
    try {
      const invoice_resp: any = await axios.get(Http.find_invoice_by_store_id, {
        params: {
          store_id: getStoreId(),
          network: getNetwork() === 'mainnet' ? 1 : 2,
        },
      });
      if (invoice_resp.result) {
        if (invoice_resp.data.length > 0) {
          let rt: RowType[] = [];
          invoice_resp.data.forEach(async (item: any, index: number) => {
            rt.push({
              id: index + 1,
              orderId: item.order_id,
              amount: item.amount,
              currency: item.currency,
              crypto: item.crypto,
              createdDate: new Date(item.created_date).toLocaleString(),
              expirationDate: new Date(item.expiration_date).toLocaleString(),
              orderStatus: item.order_status,
            });
          });
          setRows(rt);
        }
      } else {
        setSnackSeverity('error');
        setSnackMessage('Can not find the invoice on site!');
        setSnackOpen(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Box>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        onRowClick={(e: any) => {
          window.location.href = '/payments/invoices/' + e.row.orderId;
        }}
        // checkboxSelection
        // disableRowSelectionOnClick
      />
    </Box>
  );
}
