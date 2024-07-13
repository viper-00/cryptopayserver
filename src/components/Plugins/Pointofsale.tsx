import { Box, Button, Container, FormControl, OutlinedInput, Typography } from '@mui/material';

const Pointofsale = () => {
  return (
    <Box>
      <Container>
        <Typography variant="h6" pt={5}>
          Create a new PointOfSale
        </Typography>
        <Box mt={4}>
          <Typography>App Name</Typography>
          <Box mt={1}>
            <FormControl fullWidth variant="outlined">
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

        <Box mt={5}>
          <Button variant={'contained'} size={'large'}>
            Create
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Pointofsale;
