import { Box, Container, Typography } from '@mui/material';
import { useEffect } from 'react';

const EthereumSend = () => {
  const getEthereum = async () => {};
  const getEthereumFeeRate = async () => {};

  const init = async () => {
    await getEthereum();
    await getEthereumFeeRate();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mb={10}>
      <Typography variant="h4" mt={4}>
        Send ETH
      </Typography>
      <Container></Container>
    </Box>
  );
};

export default EthereumSend;
