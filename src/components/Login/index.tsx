import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  FormControlLabel,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { CustomLogo } from 'components/Logo/CustomLogo';
import { useSnackPresistStore } from 'lib/store/snack';
import { useUserPresistStore } from 'lib/store/user';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { setSnackOpen, setSnackMessage, setSnackSeverity } = useSnackPresistStore((state) => state);
  const { setUserId, setUserEmail, setUsername, setIsLogin, setUseStoreId } = useUserPresistStore((state) => state);

  const onLogin = async () => {
    try {
      if (email !== '' && password !== '') {
        const login_resp: any = await axios.post(Http.login, {
          email: email,
          password: password,
        });
        if (login_resp.result && login_resp.data.length === 1) {

          setUserId(login_resp.data[0].id)
          setUserEmail(login_resp.data[0].email)
          setUsername(login_resp.data[0].email)

          const store_resp: any = await axios.get(Http.find_store, {
            params: {
              user_id: login_resp.data[0].id
            }
          })

          if (store_resp.result) {
            if (store_resp.data.length > 0) {
              setUseStoreId(store_resp.data[0].id)
              window.location.href = "/"
            } else {
              window.location.href = "/stores/create"
            }
          } else {
            setSnackSeverity('error');
            setSnackMessage('Can not find the store on site!');
            setSnackOpen(true);
          }
        } else {
          setSnackSeverity('error');
          setSnackMessage('User not exists!');
          setSnackOpen(true);
        }
      } else {
        setSnackSeverity('error');
        setSnackMessage('The input content is incorrect, please check!');
        setSnackOpen(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  async function init() {}

  useEffect(() => {
    init();
  }, []);

  return (
    <Box>
      <Container>
        <Stack alignItems={'center'} mt={8}>
          <CustomLogo style={{ width: 50, height: 50 }}>C</CustomLogo>
          <Typography variant="h5" fontWeight={'bold'} mt={4}>
            Welcome to your CryptoPay Server
          </Typography>

          <Card sx={{ minWidth: 450, mt: 4, padding: 2 }}>
            <CardContent>
              <Typography variant="h5">Sign in</Typography>
              <Box mt={3}>
                <Typography>Email</Typography>
                <Box mt={1}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    id="filled-hidden-label-small"
                    size="small"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Box>
              </Box>
              <Box mt={3}>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                  <Typography>Password</Typography>
                  <Button>Forgot password?</Button>
                </Stack>
                <Box mt={1}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    type={'password'}
                    id="filled-hidden-label-small"
                    size="small"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Box>
              </Box>
              <Box mt={3}>
                <FormControlLabel control={<Checkbox />} label="Remember me" />
              </Box>

              <Box mt={3}>
                <Button fullWidth variant={'contained'} size={'large'} onClick={onLogin}>
                  Sign in
                </Button>
              </Box>

              <Box mt={3} textAlign={'center'}>
                <Button
                  onClick={() => {
                    window.location.href = '/register';
                  }}
                >
                  Create your account
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
};

export default Login;
