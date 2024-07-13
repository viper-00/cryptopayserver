import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

const Lightning = () => {
  return (
    <Box>
      <Container>
        <Box pt={10}>
          <Typography variant="h4" fontWeight={'bold'} textAlign={'center'}>
            Connect to a Lightning node
          </Typography>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} gap={2} mt={5}>
            <Button variant={'contained'} disabled>
              Use internal node
            </Button>
            <Button variant={'contained'}>Use custom node</Button>
          </Stack>

          <Box mt={5}>
            <Typography>Connection configuration for your custom Lightning node:</Typography>
            <Stack direction={'row'} alignItems={'center'} gap={2} mt={1}>
              <TextField fullWidth hiddenLabel defaultValue="" size="small" />
              <Button variant={'contained'} style={{ width: 250 }}>
                Test connection
              </Button>
            </Stack>
          </Box>

          <Box mt={5}>
            <Typography>CryptoPay Server currently supports:</Typography>
          </Box>

          <Box mt={3}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1-content" id="panel1-header">
                c-lightning via TCP or unix domain socket connection
              </AccordionSummary>
              <AccordionDetails>EXAMPLE</AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel2-content" id="panel2-header">
                Lightning Charge via HTTPS
              </AccordionSummary>
              <AccordionDetails>EXAMPLE</AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel3-content" id="panel3-header">
                Lightning Charge via HTTPS
              </AccordionSummary>
              <AccordionDetails>EXAMPLE</AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel3-content" id="panel3-header">
                Eclair via HTTPS
              </AccordionSummary>
              <AccordionDetails>EXAMPLE</AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel3-content" id="panel3-header">
                LND via the REST proxy
              </AccordionSummary>
              <AccordionDetails>EXAMPLE</AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel3-content" id="panel3-header">
                LNDhub via the REST API
              </AccordionSummary>
              <AccordionDetails>EXAMPLE</AccordionDetails>
            </Accordion>
          </Box>

          <Box mt={5}>
            <Button variant={'contained'} size={'large'}>
              Save
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Lightning;
