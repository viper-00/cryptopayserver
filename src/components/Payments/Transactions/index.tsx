import { ReportGmailerrorred } from '@mui/icons-material';
import { Box, Container, FormControl, IconButton, OutlinedInput, Select, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import TransactionDataGrid from '../../DataList/TransactionDataGrid';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';

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
            <TransactionDataGrid source="none" />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default PaymentTransactions;
