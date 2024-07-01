import { Box, Button, Container, Grid, Icon, Stack, Typography } from '@mui/material';
import { Twitter, GitHub, Telegram, Favorite, Article, HelpOutline } from '@mui/icons-material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
const Footer = () => {
  return (
    <>
      <Box py={10}>
        <Container maxWidth={'md'}>
          <Grid container spacing={1} justifyContent={'center'} color={'#8f979e'}>
            <Grid item>
              <Stack direction={'row'} alignItems={'center'}>
                <Button>
                  <Icon component={GitHub} fontSize={'small'} />
                  <Typography pl={1}>Github</Typography>
                </Button>
              </Stack>
            </Grid>
            <Grid item>
              <Stack direction={'row'} alignItems={'center'}>
                <Button>
                  <Icon component={Twitter} fontSize={'small'} />
                  <Typography pl={1}>X</Typography>
                </Button>
              </Stack>
            </Grid>
            <Grid item>
              <Stack direction={'row'} alignItems={'center'}>
                <Button>
                  <Icon component={Telegram} fontSize={'small'} />
                  <Typography pl={1}>Telegram</Typography>
                </Button>
              </Stack>
            </Grid>
            <Grid item>
              <Stack direction={'row'} alignItems={'center'}>
                <Button>
                  <Icon component={Favorite} fontSize={'small'} />
                  <Typography pl={1}>Donate</Typography>
                </Button>
              </Stack>
            </Grid>
            <Grid item>
              <Stack direction={'row'} alignItems={'center'}>
                <Button>
                  <Icon component={Article} fontSize={'small'} />
                  <Typography pl={1}>API</Typography>
                </Button>
              </Stack>
            </Grid>
            <Grid item>
              <Stack direction={'row'} alignItems={'center'}>
                <Button>
                  <Icon component={HelpOutline} fontSize={'small'} />
                  <Typography pl={1}>Docs</Typography>
                </Button>
              </Stack>
            </Grid>
          </Grid>
          <Box color={'#8f979e'} mt={5}>
            <Typography textAlign={'center'}>© CryptoPay Server v1.0.0</Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
