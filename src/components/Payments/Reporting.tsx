import { ReportGmailerrorred } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers-pro';
import MetaTags from 'components/Common/MetaTags';
import { useState } from 'react';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const Reporting = () => {
  const [openReport, setOpenReport] = useState<boolean>(false);

  return (
    <Box>
      <MetaTags title="Reporting" />
      <Container>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} pt={5}>
          <Stack direction={'row'} alignItems={'center'}>
            <Typography variant="h6">Reporting</Typography>
            <IconButton
              onClick={() => {
                setOpenReport(!openReport);
              }}
            >
              <ReportGmailerrorred />
            </IconButton>
          </Stack>
          <Button variant={'contained'}>Export</Button>
        </Stack>

        <Stack mt={5} direction={'row'} gap={3} alignItems={'baseline'}>
          <FormControl sx={{ minWidth: 120 }}>
            <Select
              inputProps={{ 'aria-label': 'Without label' }}
              id="demo-simple-select-helper"
              defaultValue={0}
              //   value={age}
              //   onChange={handleChange}
            >
              <MenuItem value={0}>Legacy Invoice Export</MenuItem>
              <MenuItem value={1}>Payments</MenuItem>
              <MenuItem value={2}>Payouts</MenuItem>
              <MenuItem value={3}>Refunds</MenuItem>
              <MenuItem value={4}>Sales</MenuItem>
              <MenuItem value={4}>Wallets</MenuItem>
            </Select>
          </FormControl>

          <Box flex={1}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateRangePicker']}>
                <DemoItem>
                  <DateTimePicker />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          </Box>

          <Box flex={1}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateRangePicker']}>
                <DemoItem>
                  <DateTimePicker />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        </Stack>

        <Box mt={5}>
          <Typography variant='h6'>Raw data</Typography>
          <Typography mt={4}>No data</Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Reporting;
