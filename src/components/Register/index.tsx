import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import MetaTags from 'components/Common/MetaTags';
import Footer from 'components/Home/Footer';
import { CustomLogo } from 'components/Logo/CustomLogo';

const Register = () => {
  return (
    <Box>
      <MetaTags title="Login" />
      <Container>
        <Stack alignItems={'center'} mt={8}>
          <CustomLogo style={{ width: 50, height: 50 }}>C</CustomLogo>
          <Typography variant="h5" fontWeight={'bold'} mt={4}>
            Welcome to your CryptoPay Server
          </Typography>
          <Typography mt={2}>
            A self-hosted, open-source crypto payment processor. It is secure, private, censorship-resistant and free.
          </Typography>

          <Card sx={{ minWidth: 450, mt: 4, padding: 2 }}>
            <CardContent>
              <Typography variant="h5">Create account</Typography>
              <Box mt={3}>
                <Typography>Email</Typography>
                <Box mt={1}>
                  <TextField fullWidth hiddenLabel id="filled-hidden-label-small" defaultValue="" size="small" />
                </Box>
              </Box>
              <Box mt={3}>
                <Typography>Password</Typography>
                <Box mt={1}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    type={'password'}
                    id="filled-hidden-label-small"
                    defaultValue=""
                    size="small"
                  />
                </Box>
              </Box>
              <Box mt={3}>
                <Typography>Confirm Password</Typography>
                <Box mt={1}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    type={'password'}
                    id="filled-hidden-label-small"
                    defaultValue=""
                    size="small"
                  />
                </Box>
              </Box>
              <Box mt={3}>
                <Button fullWidth variant={'contained'} size={'large'}>
                  Create account
                </Button>
              </Box>

              <Box mt={3} textAlign={'center'}>
                <Button
                  onClick={() => {
                    window.location.href = '/login';
                  }}
                >
                  Log in
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Stack>

        <Footer />
      </Container>
    </Box>
  );
};

export default Register;
