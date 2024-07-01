import { Box, Stack, Typography } from '@mui/material';
import CustomButton from 'components/Button/CustomButton';
import MetaTags from 'components/Common/MetaTags';
import Link from 'next/link';
import { APP_NAME } from 'packages/constants';

const Custom500 = () => {
  const onClickButton = async () => {
    window.location.href = '/';
  };

  return (
    <>
      <MetaTags title="Something wrong" />
      {/* <Center> */}
      <Stack direction={'column'} alignItems={'center'}>
        <Box className="mb-10">
          <Typography fontSize={30} fontWeight="bold">
            {APP_NAME}
          </Typography>
        </Box>
        <Typography className="text-4xl font-bold">500</Typography>
        <Typography className="text-4xl font-bold">Looks like something went wrong!</Typography>
        <Box className="mb-6">
          We track these errors automatically, but if the problem persists feel free to contact us. In the meantime, try
          refreshing.
        </Box>
        <CustomButton variant="surface" text={'Go Home'} onClick={onClickButton} />
      </Stack>
      {/* </Center> */}
    </>
  );
};

export default Custom500;
