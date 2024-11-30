import { ExpandMore, ReportGmailerrorred } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import PullPaymentActiveDataGrid from './Active';

const Pullpayments = () => {
  const [openPullPayment, setOpenPullPayment] = useState<boolean>(false);
  const [openCreatePullPayment, setOpenCreatePullPayment] = useState<boolean>(false);

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Container>
        {openCreatePullPayment ? (
          <Box>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} pt={5}>
              <Typography variant="h6">New pull payment</Typography>
              <Button
                variant={'contained'}
                onClick={() => {
                  setOpenCreatePullPayment(true);
                }}
              >
                Create
              </Button>
            </Stack>

            <Box mt={4}>
              <Typography>Name</Typography>
              <Box mt={1}>
                <FormControl sx={{ width: 500 }} variant="outlined">
                  <OutlinedInput
                    size={'small'}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      'aria-label': 'weight',
                    }}
                  />
                </FormControl>
              </Box>
            </Box>

            <Stack mt={4} alignItems={'baseline'} direction={'row'} gap={3}>
              <Box>
                <Typography>Amount</Typography>
                <Box mt={1}>
                  <FormControl sx={{ width: 500 }} variant="outlined">
                    <OutlinedInput
                      size={'small'}
                      type="number"
                      aria-describedby="outlined-weight-helper-text"
                      inputProps={{
                        'aria-label': 'weight',
                      }}
                    />
                  </FormControl>
                </Box>
              </Box>
              <Box>
                <Typography>Currency</Typography>
                <Box mt={1}>
                  <FormControl sx={{ width: 200 }}>
                    <Select
                      size={'small'}
                      inputProps={{ 'aria-label': 'Without label' }}
                      defaultValue={0}
                      //   value={age}
                      //   onChange={handleChange}
                    >
                      <MenuItem value={0}>USD</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Stack>

            <Box mt={4}>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Automatically approve claims" />
            </Box>

            <Box mt={4}>
              <Typography>Payment Methods</Typography>
              <Box mt={1}>
                <FormControlLabel control={<Checkbox defaultChecked />} label="BTC (On-Chain)" />
              </Box>
            </Box>

            <Box mt={4}>
              <Typography>Description</Typography>
              <Box mt={1}>
                <TextField multiline rows={8} fullWidth />
              </Box>
            </Box>

            <Box mt={5}>
              <Typography variant={'h6'}>Additional Options</Typography>
              <Box mt={4}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1-content">
                    Lightning network settings
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>Minimum acceptable expiration time for BOLT11 for refunds</Typography>
                    <Box mt={2}>
                      <FormControl sx={{ width: '25ch' }} variant="outlined">
                        <OutlinedInput
                          size={'small'}
                          type="number"
                          endAdornment={<InputAdornment position="end">days</InputAdornment>}
                          aria-describedby="outlined-weight-helper-text"
                          inputProps={{
                            'aria-label': 'weight',
                          }}
                        />
                      </FormControl>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} pt={5}>
              <Stack direction={'row'} alignItems={'center'}>
                <Typography variant="h6">Pull payments</Typography>
                <IconButton
                  onClick={() => {
                    setOpenPullPayment(!openPullPayment);
                  }}
                >
                  <ReportGmailerrorred />
                </IconButton>
              </Stack>
              <Button
                variant={'contained'}
                onClick={() => {
                  setOpenCreatePullPayment(true);
                }}
              >
                Create pull payment
              </Button>
            </Stack>

            <Box mt={5}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab label="Active" {...a11yProps(0)} />
                  <Tab label="Expired" {...a11yProps(1)} />
                  <Tab label="Archived" {...a11yProps(2)} />
                  <Tab label="Future" {...a11yProps(3)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <PullPaymentActiveDataGrid />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <Typography>There are no expired pull payments yet.</Typography>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <Typography>There are no expired pull payments yet.</Typography>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={3}>
                <Typography>There are no expired pull payments yet.</Typography>
              </CustomTabPanel>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Pullpayments;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
