import { Box, Stack, Typography } from '@mui/material';
import CustomButton from 'components/Button/CustomButton';
import MetaTags from 'components/Common/MetaTags';
import { APP_NAME } from 'packages/constants';

const Custom404 = () => {
  const onClickButton = async () => {
    window.location.href = '/';
  };

  return (
    <>
      <MetaTags title="Not found" />
      {/* <Center> */}
      <Stack direction={'column'} alignItems={'center'}>
        <Box className="mb-10">
          <Typography fontSize={30} fontWeight="bold">
            {APP_NAME}
          </Typography>
        </Box>
        <Typography className="text-4xl font-bold">404</Typography>
        <Box className="mb-6">This page could not be found.</Box>
        <CustomButton variant="surface" text={'Go Home'} onClick={onClickButton} />
      </Stack>
      {/* </Center> */}
    </>
  );
};

export default Custom404;
