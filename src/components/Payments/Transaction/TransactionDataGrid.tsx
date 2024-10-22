import { Dialog, DialogTitle, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useSnackPresistStore, useStorePresistStore, useUserPresistStore } from 'lib/store';
import { CHAINNAMES } from 'packages/constants/blockchain';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import { OmitMiddleString } from 'utils/strings';
import { FindChainNamesByChains } from 'utils/web3';

type RowType = {
  id: number;
  chain: CHAINNAMES;
  hash: string;
  address: string;
  fromAddress: string;
  toAddress: string;
  token: string;
  transactionType: string;
  amount: number;
  blockTimestamp: string;
};

export default function TransactionDataGrid() {
  const [rows, setRows] = useState<RowType[]>([]);

  const { getNetwork } = useUserPresistStore((state) => state);
  const { getStoreId } = useStorePresistStore((state) => state);
  const { setSnackOpen, setSnackMessage, setSnackSeverity } = useSnackPresistStore((state) => state);

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<RowType>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: RowType) => {
    setOpen(false);
  };

  const onClickRow = async (e: RowType) => {
    // const txId = e.id;
    setSelectedValue(e);
    setOpen(true);
  };

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'chain',
      headerName: 'Chain',
      width: 100,
    },
    {
      field: 'hash',
      headerName: 'Hash',
      width: 200,
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 200,
    },

    {
      field: 'fromAddress',
      headerName: 'FromAddress',
      width: 200,
    },
    {
      field: 'toAddress',
      headerName: 'ToAddress',
      width: 200,
    },
    {
      field: 'token',
      headerName: 'Token',
      width: 100,
    },
    {
      field: 'transactionType',
      headerName: 'Transaction Type',
      width: 100,
    },

    {
      field: 'amount',
      headerName: 'Amount',
      width: 100,
    },
    {
      field: 'blockTimestamp',
      headerName: 'Block Timestamp',
      width: 200,
    },
  ];

  const init = async () => {
    try {
      const tx_resp: any = await axios.get(Http.find_transaction_by_store_id, {
        params: {
          store_id: getStoreId(),
          network: getNetwork() === 'mainnet' ? 1 : 2,
        },
      });
      if (tx_resp.result) {
        if (tx_resp.data.length > 0) {
          let rt: RowType[] = [];
          tx_resp.data.forEach(async (item: any, index: number) => {
            rt.push({
              id: item.id,
              chain: FindChainNamesByChains(item.chain_id),
              hash: OmitMiddleString(item.hash, 10),
              address: OmitMiddleString(item.address, 10),
              fromAddress: OmitMiddleString(item.from_address, 10),
              toAddress: OmitMiddleString(item.to_address, 10),
              token: item.token,
              transactionType: item.transact_type,
              amount: item.amount,
              blockTimestamp: new Date(item.block_timestamp).toLocaleString(),
            });
          });
          setRows(rt);
        }
      } else {
        setSnackSeverity('error');
        setSnackMessage('Can not find the tx on site!');
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
          onClickRow(e.row);
        }}
        checkboxSelection
        disableRowSelectionOnClick
      />

      <TxDialog row={selectedValue as RowType} open={open} onClose={handleClose} />
    </Box>
  );
}

export type TxDialogProps = {
  open: boolean;
  row: RowType;
  onClose: (value: RowType) => void;
};

function TxDialog(props: TxDialogProps) {
  const { onClose, row, open } = props;

  if (!row) return;

  const handleClose = () => {
    onClose(row);
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <Box p={4}>
        <Typography variant="h5">Transaction</Typography>
        <Box mt={3}>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography>Chain</Typography>
            <Typography>{row.chain}</Typography>
          </Stack>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={1}>
            <Typography>Hash</Typography>
            <Typography>{row.hash}</Typography>
          </Stack>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={1}>
            <Typography>Address</Typography>
            <Typography>{row.address}</Typography>
          </Stack>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={1}>
            <Typography>From Address</Typography>
            <Typography>{row.fromAddress}</Typography>
          </Stack>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={1}>
            <Typography>To Address</Typography>
            <Typography>{row.toAddress}</Typography>
          </Stack>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={1}>
            <Typography>Token</Typography>
            <Typography>{row.token}</Typography>
          </Stack>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={1}>
            <Typography>Transaction Type</Typography>
            <Typography>{row.transactionType}</Typography>
          </Stack>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={1}>
            <Typography>Amount</Typography>
            <Typography>{row.amount}</Typography>
          </Stack>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={1}>
            <Typography>Block Timestamp</Typography>
            <Typography>{row.blockTimestamp}</Typography>
          </Stack>
        </Box>
      </Box>
    </Dialog>
  );
}
