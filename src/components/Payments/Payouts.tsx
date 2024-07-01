import { ReportGmailerrorred } from '@mui/icons-material';
import { Box, Container, IconButton, Stack, Tab, Tabs, Typography } from '@mui/material';
import MetaTags from 'components/Common/MetaTags';
import { useState } from 'react';
import PayoutAwaitingApprovalDataGrid from './payout/awaitingApproval';

const Payouts = () => {
  const [openPayout, setOpenPayout] = useState<boolean>(false);

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <MetaTags title="Payouts" />
      <Container>
        <Box>
          <Stack direction={'row'} alignItems={'center'} pt={5}>
            <Typography variant="h6">Payouts</Typography>
            <IconButton
              onClick={() => {
                setOpenPayout(!openPayout);
              }}
            >
              <ReportGmailerrorred />
            </IconButton>
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
                <Tab label="Awaiting Approval" {...a11yProps(0)} />
                <Tab label="Awaiting Payment" {...a11yProps(1)} />
                <Tab label="In Progress" {...a11yProps(2)} />
                <Tab label="Completed" {...a11yProps(3)} />
                <Tab label="Cancelled" {...a11yProps(4)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <PayoutAwaitingApprovalDataGrid />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <Typography>There are no payouts matching this criteria.</Typography>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <Typography>There are no payouts matching this criteria.</Typography>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              <Typography>There are no payouts matching this criteria.</Typography>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
              <Typography>There are no payouts matching this criteria.</Typography>
            </CustomTabPanel>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Payouts;

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
