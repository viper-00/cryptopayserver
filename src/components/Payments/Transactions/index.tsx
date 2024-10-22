import { ExpandMore, ReportGmailerrorred } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import TransactionDataGrid from '../Transaction/TransactionDataGrid';
import { COINGECKO_IDS, CURRENCY, ORDER_TIME } from 'packages/constants';
import { IsValidEmail, IsValidHTTPUrl, IsValidJSON } from 'utils/verify';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import { CHAINNAMES, CHAINS, COINS } from 'packages/constants/blockchain';
import { useSnackPresistStore, useStorePresistStore, useUserPresistStore } from 'lib/store';
import { ORDER_STATUS } from 'packages/constants';
import { BigDiv } from 'utils/number';
import { FindChainIdsByChainNames } from 'utils/web3';

const PaymentTransactions = () => {
  const [search, setSearch] = useState<string>('');

  return (
    <Box>
      <Container>
        <Box>
          <Stack direction={'row'} alignItems={'center'} pt={5}>
            <Typography variant="h6">Transactions</Typography>
            <IconButton
              onClick={() => {
                // setOpenInvoiceReport(!openInvoiceReport);
              }}
            >
              <ReportGmailerrorred />
            </IconButton>
          </Stack>

          <Stack mt={5} direction={'row'} gap={2}>
            <FormControl sx={{ width: 500 }} variant="outlined">
              <OutlinedInput
                size={'small'}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                }}
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </FormControl>
            <FormControl sx={{ minWidth: 120 }}>
              <Select
                size={'small'}
                inputProps={{ 'aria-label': 'Without label' }}
                //   value={orderTime}
                //   defaultValue={orderTime}
                //   onChange={(e) => {
                //     setOrderTime(e.target.value);
                //   }}
              >
                {/* {ORDER_TIME &&
                    Object.entries(ORDER_TIME).map((item, index) => (
                      <MenuItem value={item[1]} key={index}>
                        {item[1]}
                      </MenuItem>
                    ))} */}
              </Select>
            </FormControl>
          </Stack>

          <Box mt={5}>
            <TransactionDataGrid />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default PaymentTransactions;
