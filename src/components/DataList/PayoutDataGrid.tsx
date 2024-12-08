import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useSnackPresistStore, useStorePresistStore, useUserPresistStore } from 'lib/store';
import { PAYOUT_STATUS } from 'packages/constants';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import { FindChainNamesByChains } from 'utils/web3';

type RowType = {
  id: number;
  payoutId: number;
  address: string;
  createdDate: string;
  refunded: string;
  sourceType: string;
  externalPaymentId: number;
  chainName: string;
  transaction: string;
  url: string;
};

type GridType = {
  status: (typeof PAYOUT_STATUS)[keyof typeof PAYOUT_STATUS];
};

export default function PayoutDataGrid(props: GridType) {
  const { getUserId, getNetwork } = useUserPresistStore((state) => state);
  const { getStoreId } = useStorePresistStore((state) => state);
  const { setSnackOpen, setSnackMessage, setSnackSeverity } = useSnackPresistStore((state) => state);

  const [rows, setRows] = useState<RowType[]>([]);

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: 'createdDate',
      headerName: 'Start',
      width: 200,
    },
    {
      field: 'chainName',
      headerName: 'Chain',
      width: 200,
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 250,
    },
    {
      field: 'refunded',
      headerName: 'Refunded',
      width: 200,
    },
    {
      field: 'sourceType',
      headerName: 'Source Type',
      width: 150,
    },
    {
      field: 'externalPaymentId',
      headerName: 'External Payment Id',
      width: 200,
    },
    {
      field: 'transaction',
      headerName: 'Transaction',
      width: 200,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      width: 600,
      align: 'right',
      headerAlign: 'right',
      getActions: ({ row }) => {
        switch (props.status) {
          case PAYOUT_STATUS.AwaitingApproval:
            return [
              <Button
                onClick={() => {
                  onClickApprove(row);
                }}
              >
                Approve
              </Button>,
              <Button
                onClick={() => {
                  onClickCancel(row);
                }}
              >
                Cancel
              </Button>,
            ];
          case PAYOUT_STATUS.AwaitingPayment:
            return [
              <Button
                onClick={() => {
                  onClickReject(row);
                }}
              >
                Reject payout transaction
              </Button>,
              <Button
                onClick={() => {
                  onClickSend(row);
                }}
              >
                Send
              </Button>,
              <Button
                onClick={() => {
                  onClickCancel(row);
                }}
              >
                Cancel
              </Button>,
              <Button
                onClick={() => {
                  onClickMarkPaid(row);
                }}
              >
                Mark as already paid
              </Button>,
            ];

          default:
            return [];
        }
      },
    },
  ];

  const onClickApprove = async (row: any) => {
    try {
      const response: any = await axios.put(Http.update_payout_by_id, {
        id: row.payoutId,
        user_id: getUserId(),
        store_id: getStoreId(),
        payout_status: PAYOUT_STATUS.AwaitingPayment,
      });
      if (response.result) {
        setSnackSeverity('success');
        setSnackMessage('Update successful!');
        setSnackOpen(true);

        await init(props.status);
      } else {
        setSnackSeverity('error');
        setSnackMessage('Update failed!');
        setSnackOpen(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onClickReject = async (row: any) => {
    try {
      const response: any = await axios.put(Http.update_payout_by_id, {
        id: row.payoutId,
        user_id: getUserId(),
        store_id: getStoreId(),
        payout_status: PAYOUT_STATUS.AwaitingApproval,
      });
      if (response.result) {
        setSnackSeverity('success');
        setSnackMessage('Update successful!');
        setSnackOpen(true);

        await init(props.status);
      } else {
        setSnackSeverity('error');
        setSnackMessage('Update failed!');
        setSnackOpen(true);
      }
    } catch (e) {
      console.error(e);
    }
  };
  const onClickSend = async (row: any) => {};
  const onClickCancel = async (row: any) => {
    try {
      const response: any = await axios.put(Http.update_payout_by_id, {
        id: row.payoutId,
        user_id: getUserId(),
        store_id: getStoreId(),
        payout_status: PAYOUT_STATUS.Cancelled,
      });
      if (response.result) {
        setSnackSeverity('success');
        setSnackMessage('Update successful!');
        setSnackOpen(true);

        await init(props.status);
      } else {
        setSnackSeverity('error');
        setSnackMessage('Update failed!');
        setSnackOpen(true);
      }
    } catch (e) {
      console.error(e);
    }
  };
  const onClickMarkPaid = async (row: any) => {
    try {
      const response: any = await axios.put(Http.update_payout_by_id, {
        id: row.payoutId,
        user_id: getUserId(),
        store_id: getStoreId(),
        payout_status: PAYOUT_STATUS.Completed,
      });
      if (response.result) {
        setSnackSeverity('success');
        setSnackMessage('Update successful!');
        setSnackOpen(true);

        await init(props.status);
      } else {
        setSnackSeverity('error');
        setSnackMessage('Update failed!');
        setSnackOpen(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const init = async (status: (typeof PAYOUT_STATUS)[keyof typeof PAYOUT_STATUS]) => {
    try {
      const response: any = await axios.get(Http.find_payout, {
        params: {
          store_id: getStoreId(),
          network: getNetwork() === 'mainnet' ? 1 : 2,
          payout_status: status,
        },
      });
      if (response.result && response.data.length > 0) {
        let rt: RowType[] = [];
        response.data.forEach(async (item: any, index: number) => {
          rt.push({
            id: item.id,
            payoutId: item.payout_id,
            address: item.address,
            createdDate: new Date(item.created_date).toLocaleString(),
            refunded: item.amount + ' ' + item.currency,
            sourceType: item.source_type,
            externalPaymentId: item.external_payment_id,
            chainName: FindChainNamesByChains(item.chain_id),
            transaction: item.tx,
            url: '',
          });
        });
        setRows(rt);
      } else {
        setRows([]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    props.status && init(props.status);
  }, [props.status]);

  return (
    <Box>
      <DataGrid
        autoHeight
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
          window.location.href = e.row.url;
        }}
        disableColumnMenu
      />
    </Box>
  );
}
