import { Box, Container, Typography } from '@mui/material';
import MetaTags from 'components/Common/MetaTags';

const Paybutton = () => {
  return (
    <Box>
      <MetaTags title="Paybutton" />
      <Container>
        <Typography variant="h6" pt={5}>
          Pay Button
        </Typography>

        <Typography mt={4}>Configure your Pay Button, and the generated code will be displayed at the bottom of the page to copy into your project.</Typography>
      </Container>
    </Box>
  );
};

export default Paybutton;
