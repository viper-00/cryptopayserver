import styled from '@emotion/styled';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Typography } from './Typography';
import {
  Box,
  Button,
  FormControl,
  Icon,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material';
import { useState } from 'react';
import { CustomLogo } from 'components/Logo/CustomLogo';

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const StyledSidebarHeader = styled.div`
  padding: 0 20px;

  > div {
    width: 100%;
    overflow: hidden;
  }
`;

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ children, ...rest }) => {
  const [store, setStore] = useState('');
  const handleChangeStore = (event: SelectChangeEvent) => {
    setStore(event.target.value as string);
  };

  return (
    <StyledSidebarHeader {...rest}>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Button
          style={{ padding: 0 }}
          onClick={() => {
            window.location.href = '/dashboard';
          }}
        >
          <Stack direction={'row'} alignItems={'center'}>
            <CustomLogo>C</CustomLogo>
            <Typography fontWeight={'bold'} color="#0098e5" fontSize={10}>
              Crypto Pay
            </Typography>
          </Stack>
        </Button>

        <IconButton
          onClick={() => {
            window.location.href = '/notifications';
          }}
        >
          <NotificationsNoneIcon />
        </IconButton>
      </Stack>

      <Box mt={3}>
        <FormControl fullWidth>
          <Select
            size={'small'}
            inputProps={{ 'aria-label': 'Without label' }}
            id="demo-simple-select-helper"
            defaultValue={1}
          >
            <MenuItem value={1}>USD</MenuItem>
            <MenuItem value={2}>AAA</MenuItem>
            <MenuItem value={3}>BBB</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </StyledSidebarHeader>
  );
};
