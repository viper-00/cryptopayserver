import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useSnackPresistStore, useStorePresistStore, useUserPresistStore } from 'lib/store';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

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
      const invoice_resp: any = await axios.get(Http.find_invoice, {
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
        console.log('invoice', invoice_resp.data);
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
    <Box sx={{ height: 400, width: '100%' }}>
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
          window.location.href = "/payments/invoices/" + e.row.orderId
        }}
        // checkboxSelection
        // disableRowSelectionOnClick
      />
    </Box>
  );
}
// https://mainnet.demo.btcpayserver.org/stores/GYQ7TXhK5JhbAGU1vFyRBFbS8XmZ7soSLMFLK7SvzviZ/invoices/$JN6KapwePaZjhrTjtN8nex
// https://mainnet.demo.btcpayserver.org/i/JN6KapwePaZjhrTjtN8nex

// https://mainnet.demo.btcpayserver.org/invoices/kFjRfGCnazSsov3n1mBcv