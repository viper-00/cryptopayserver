import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

const Forms = () => {
  return (
    <Box>
      <Box>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography variant="h6">Roles</Typography>
          <Button variant={'contained'}>Create Form</Button>
        </Stack>

        <Typography mt={5}>There are no forms yet.</Typography>
      </Box>
    </Box>
  );
};

export default Forms;
