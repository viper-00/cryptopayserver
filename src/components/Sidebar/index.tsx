import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Menu, menuClasses, MenuItem, MenuItemStyles, Sidebar, SubMenu } from 'react-pro-sidebar';
import { SidebarFooter } from './SidebarFooter';
import { SidebarHeader } from './SidebarHeader';
import { Typography } from './Typography';
import { Box, Stack } from '@mui/material';
import {
  Assessment,
  CurrencyBitcoin,
  Dashboard,
  Description,
  Extension,
  Groups,
  Payment,
  Payments,
  PointOfSale,
  RadioButtonChecked,
  Receipt,
  Settings,
  ShoppingBag,
} from '@mui/icons-material';

type Theme = 'light' | 'dark';

const themes = {
  light: {
    sidebar: {
      backgroundColor: '#ffffff',
      color: '#607489',
    },
    menu: {
      menuContent: '#fbfcfd',
      icon: '#000000',
      hover: {
        backgroundColor: '#c5e4ff',
        color: '#44596e',
      },
      disabled: {
        color: '#9fb6cf',
      },
    },
  },
  dark: {
    sidebar: {
      backgroundColor: '#0b2948',
      color: '#8ba1b7',
    },
    menu: {
      menuContent: '#082440',
      icon: '#59d0ff',
      hover: {
        backgroundColor: '#00458b',
        color: '#b6c8d9',
      },
      disabled: {
        color: '#3e5e7e',
      },
    },
  },
};

// hex to rgba converter
const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const HomeSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const [theme, setTheme] = useState<Theme>('light');

  const router = useRouter();

  const menuItemStyles: MenuItemStyles = {
    root: {
      fontSize: '13px',
      fontWeight: 400,
    },
    icon: {
      color: themes[theme].menu.icon,
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
      [`&.ps-active`]: {
        color: '#0098e5',
      },
    },
    SubMenuExpandIcon: {
      color: '#b6b7b9',
    },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0 ? hexToRgba(themes[theme].menu.menuContent, hasImage && !collapsed ? 0.4 : 1) : 'transparent',
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
      '&:hover': {
        backgroundColor: hexToRgba(themes[theme].menu.hover.backgroundColor, hasImage ? 0.8 : 1),
        color: themes[theme].menu.hover.color,
      },
      [`&.ps-active`]: {
        color: '#0098e5',
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };

  return (
    <Sidebar
      collapsed={collapsed}
      toggled={toggled}
      onBackdropClick={() => setToggled(false)}
      onBreakPoint={setBroken}
      // image="https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg"
      breakPoint="md"
      rtl={false}
      // backgroundColor={hexToRgba(themes[theme].sidebar.backgroundColor, hasImage ? 0.9 : 1)}
      // rootStyles={{
      //   color: themes[theme].sidebar.color,
      // }}
      style={{ height: '100%' }}
    >
      <Stack
        direction={'column'}
        height={'100%'}
        position={'fixed'}
        width={'250px'}
        style={{ backgroundColor: '#fff', overflowY: 'auto', overflowX: 'hidden' }}
        borderRight={1}
        borderColor={'#efefef'}
      >
        <SidebarHeader style={{ marginBottom: 20, marginTop: 30 }} />
        <Box flex={1} mt={2}>
          <Menu menuItemStyles={menuItemStyles}>
            <MenuItem
              icon={<Dashboard />}
              active={router.pathname === '/dashboard' ? true : false}
              component={<Link href={'/dashboard'} />}
            >
              Dashboard
            </MenuItem>
            <MenuItem
              icon={<Settings />}
              active={router.pathname === '/settings' ? true : false}
              component={<Link href={'/settings'} />}
            >
              Settings
            </MenuItem>
          </Menu>

          <div style={{ padding: '0 24px', marginBottom: '8px', marginTop: '32px' }}>
            <Typography
              variant="body2"
              fontWeight={600}
              style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px' }}
            >
              WALLETS
            </Typography>
          </div>

          <Menu menuItemStyles={menuItemStyles}>
            <MenuItem
              icon={<CurrencyBitcoin />}
              active={router.pathname === '/wallet/bitcoin' ? true : false}
              component={<Link href={'/wallet/bitcoin'} />}
            >
              Bitcoin
            </MenuItem>
            <MenuItem
              icon={<CurrencyBitcoin />}
              active={router.pathname === '/wallet/bitcoin/lightning' ? true : false}
              component={<Link href={'/wallet/bitcoin/lightning'} />}
            >
              Lightning
            </MenuItem>
            <MenuItem
              icon={<CurrencyBitcoin />}
              active={router.pathname === '/wallet/ethereum' ? true : false}
              component={<Link href={'/wallet/ethereum'} />}
            >
              Ethereum
            </MenuItem>
            <MenuItem
              icon={<CurrencyBitcoin />}
              active={router.pathname === '/wallet/bsc' ? true : false}
              component={<Link href={'/wallet/bsc'} />}
            >
              Binance Smart Chain
            </MenuItem>
            <MenuItem
              icon={<CurrencyBitcoin />}
              active={router.pathname === '/wallet/litecoin' ? true : false}
              component={<Link href={'/wallet/litecoin'} />}
            >
              Litecoin
            </MenuItem>
            <MenuItem
              icon={<CurrencyBitcoin />}
              active={router.pathname === '/wallet/solana' ? true : false}
              component={<Link href={'/wallet/solana'} />}
            >
              Solana
            </MenuItem>
            <MenuItem
              icon={<CurrencyBitcoin />}
              active={router.pathname === '/wallet/ton' ? true : false}
              component={<Link href={'/wallet/ton'} />}
            >
              Ton
            </MenuItem>
            <MenuItem
              icon={<CurrencyBitcoin />}
              active={router.pathname === '/wallet/tron' ? true : false}
              component={<Link href={'/wallet/tron'} />}
            >
              Tron
            </MenuItem>
          </Menu>

          <div style={{ padding: '0 24px', marginBottom: '8px', marginTop: '32px' }}>
            <Typography
              variant="body2"
              fontWeight={600}
              style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px' }}
            >
              PAYMENTS
            </Typography>
          </div>

          <Menu menuItemStyles={menuItemStyles}>
            <SubMenu
              label="PAYMENTS"
              icon={<Payment />}
              // suffix={
              //   <Badge variant="danger" shape="circle">
              //     6
              //   </Badge>
              // }
            >
              <MenuItem
                icon={<Description />}
                active={router.pathname === '/payments/invoices' ? true : false}
                component={<Link href={'/payments/invoices'} />}
              >
                Invoices
              </MenuItem>
              <MenuItem
                icon={<Assessment />}
                active={router.pathname === '/payments/reporting' ? true : false}
                component={<Link href={'/payments/reporting'} />}
              >
                Reporting
              </MenuItem>
              <MenuItem
                icon={<Receipt />}
                active={router.pathname === '/payments/requests' ? true : false}
                component={<Link href={'/payments/requests'} />}
              >
                Requests
              </MenuItem>
              <MenuItem
                icon={<Payments />}
                active={router.pathname === '/payments/pullpayments' ? true : false}
                component={<Link href={'/payments/pullpayments'} />}
              >
                Pull Payments
              </MenuItem>
              <MenuItem
                icon={<Receipt />}
                active={router.pathname === '/payments/payouts' ? true : false}
                component={<Link href={'/payments/payouts'} />}
              >
                Payouts
              </MenuItem>
            </SubMenu>
          </Menu>

          <div style={{ padding: '0 24px', marginBottom: '8px', marginTop: '32px' }}>
            <Typography
              variant="body2"
              fontWeight={600}
              style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px' }}
            >
              PLUGINS
            </Typography>
          </div>

          <Menu menuItemStyles={menuItemStyles}>
            <SubMenu
              label="PLUGINS"
              icon={<Extension />}
              // suffix={
              //   <Badge variant="danger" shape="circle">
              //     6
              //   </Badge>
              // }
            >
              <MenuItem
                icon={<ShoppingBag />}
                active={router.pathname === '/plugins/shopify' ? true : false}
                component={<Link href={'/plugins/shopify'} />}
              >
                Shopify
              </MenuItem>
              <MenuItem
                icon={<PointOfSale />}
                active={router.pathname === '/plugins/pointofsale' ? true : false}
                component={<Link href={'/plugins/pointofsale'} />}
              >
                Point of Sale
              </MenuItem>
              <MenuItem
                icon={<RadioButtonChecked />}
                active={router.pathname === '/plugins/paybutton' ? true : false}
                component={<Link href={'/plugins/paybutton'} />}
              >
                Pay Button
              </MenuItem>
              <MenuItem
                icon={<Groups />}
                active={router.pathname === '/plugins/crowdfund' ? true : false}
                component={<Link href={'/plugins/crowdfund'} />}
              >
                Crowdfund
              </MenuItem>
            </SubMenu>
          </Menu>
        </Box>
        <SidebarFooter collapsed={collapsed} />
      </Stack>
    </Sidebar>
  );
};

export default HomeSidebar;
