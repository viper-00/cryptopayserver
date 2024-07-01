import styled from '@emotion/styled';
import CustomButton from 'components/Button/CustomButton';
import CustomIconButton from 'components/Button/CustomIconButton';
import {
  Box,
  Button,
  ClickAwayListener,
  Divider,
  Drawer,
  Icon,
  IconButton,
  Popover,
  Stack,
  SwipeableDrawer,
  Switch,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Brightness4, DarkMode, PermIdentity, WbSunny } from '@mui/icons-material';

interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  collapsed?: boolean;
}

const StyledButton = styled.a`
  padding: 5px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  display: inline-block;
  background-color: #fff;
  color: #484848;
  text-decoration: none;
`;

const StyledSidebarFooter = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 8px;
  /* background: linear-gradient(45deg, rgb(21 87 205) 0%, rgb(90 225 255) 100%); */
  /* background: #0098e5; */
`;

const StyledCollapsedSidebarFooter = styled.a`
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  color: white;
  background: linear-gradient(45deg, rgb(21 87 205) 0%, rgb(90 225 255) 100%);
  /* background: #0098e5; */
`;

const codeUrl = 'https://github.com/azouaoui-med/react-pro-sidebar/blob/master/storybook/Playground.tsx';

export const SidebarFooter: React.FC<SidebarFooterProps> = ({ children, collapsed, ...rest }) => {
  const [openAccountDrawer, setOpenAccountDrawer] = useState(false);

  const toggleAccountDrawer = (newOpen: boolean) => () => {
    setOpenAccountDrawer(newOpen);
  };

  const switchlabel = { inputProps: { 'aria-label': 'Switch demo' } };

  const AccountDrawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleAccountDrawer(false)} p={2}>
      <Typography mb={2}>aur-014@hotmail.com</Typography>
      <Divider />
      <Box my={2}>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography>Theme</Typography>
          <Stack direction={'row'} alignItems={'center'}>
            <IconButton>
              <Brightness4 />
            </IconButton>
            <IconButton>
              <WbSunny />
            </IconButton>
            <IconButton>
              <DarkMode />
            </IconButton>
          </Stack>
        </Stack>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mt={2}>
          <Typography>Hide Sensitive Info</Typography>
          <Box>
            <Switch {...switchlabel} />
          </Box>
        </Stack>
      </Box>
      <Divider />
      <Box my={1}>
        <Button
          onClick={() => {
            window.location.href = '/account';
          }}
        >
          Manage Account
        </Button>
      </Box>
      <Divider />
      <Box my={1}>
        <Button
          onClick={() => {
            window.location.href = '/login';
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <Stack>
      {collapsed ? (
        <StyledCollapsedSidebarFooter href={codeUrl} target="_blank">
          {/* <MdPhone size={28} /> */}
        </StyledCollapsedSidebarFooter>
      ) : (
        <StyledSidebarFooter {...rest}>
          <Box>
            <Button onClick={toggleAccountDrawer(true)}>
              <Icon component={PermIdentity} />
              <Typography ml={1}>Account</Typography>
            </Button>

            <Drawer open={openAccountDrawer} onClose={toggleAccountDrawer(false)} anchor={'right'}>
              {AccountDrawer}
            </Drawer>
          </Box>
        </StyledSidebarFooter>
      )}
    </Stack>
  );
};
