import { Box, Container, Typography } from '@mui/material';
import MetaTags from 'components/Common/MetaTags';

const Login = () => {
  return (
    <Box>
      <MetaTags title="Login" />
      <Container>
        <Typography variant="h5" fontWeight={'bold'}>
          Welcome to your CryptoPay Server
        </Typography>
      </Container>
    </Box>
  );
};

export default Login;
