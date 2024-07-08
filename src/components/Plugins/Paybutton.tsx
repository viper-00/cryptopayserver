import { Box, Container, Typography } from '@mui/material';

const Paybutton = () => {
  return (
    <Box>
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
