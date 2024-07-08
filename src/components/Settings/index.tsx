import { Box, Container, Tab, Tabs, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import AccessToken from './accessToken';
import Checkout from './checkout';
import Emails from './email';
import Forms from './forms';
import General from './general';
import Payout from './payout';
import Rates from './rates';
import Roles from './roles';
import Users from './users';
import Webhooks from './webhooks';

const Settings = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Container>
        <Typography variant="h6" pt={5}>
          Store Settings
        </Typography>

        <Box mt={2}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="General" {...a11yProps(0)} />
              <Tab label="Rates" {...a11yProps(1)} />
              <Tab label="Checkout Appearance" {...a11yProps(2)} />
              <Tab label="Access Tokens" {...a11yProps(3)} />
              <Tab label="Users" {...a11yProps(4)} />
              <Tab label="Roles" {...a11yProps(5)} />
              <Tab label="Webhooks" {...a11yProps(6)} />
              <Tab label="Payout Processors" {...a11yProps(7)} />
              <Tab label="Emails" {...a11yProps(8)} />
              <Tab label="Forms" {...a11yProps(9)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <General />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Rates />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Checkout />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <AccessToken />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={4}>
            <Users />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={5}>
            <Roles />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={6}>
            <Webhooks />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={7}>
            <Payout />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={8}>
            <Emails />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={9}>
            <Forms />
          </CustomTabPanel>
        </Box>
      </Container>
    </Box>
  );
};

export default Settings;

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
