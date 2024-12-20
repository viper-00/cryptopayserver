import styled from '@emotion/styled';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Typography } from './Typography';
import {
  Alert,
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
import { useEffect, useState } from 'react';
import { CustomLogo } from 'components/Logo/CustomLogo';
import { useStorePresistStore } from 'lib/store/store';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import { useUserPresistStore } from 'lib/store/user';
import { useSnackPresistStore } from 'lib/store/snack';

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

interface StoreProps {
  id: number;
  name: string;
  currency: string;
  price_source: string;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ children, ...rest }) => {
  const { getStoreId } = useStorePresistStore((state) => state);
  const { getUserId } = useUserPresistStore((state) => state);
  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);
  const { setStoreId, setStoreName, setStoreCurrency, setStorePriceSource } = useStorePresistStore((state) => state);

  const [stores, setStores] = useState<StoreProps[]>([]);

  const getStore = async () => {
    if (getUserId() === 0) {
      return;
    }

    const store_result: any = await axios.get(Http.find_store, {
      params: {
        user_id: getUserId(),
      },
    });

    if (store_result.result && store_result.data.length > 0) {
      let store_list: Array<StoreProps> = [];

      store_result.data.map((item: any) => {
        store_list.push({
          id: item.id,
          name: item.name,
          currency: item.currency,
          price_source: item.price_source,
        });
      });
      setStores(store_list);
    } else {
      // setSnackSeverity('error');
      // setSnackMessage("Can't find the store, please to create a new one.");
      // setSnackOpen(true);

      setTimeout(() => {
        window.location.href = '/stores/create';
      }, 2000);
    }
  };

  const onClickStore = async (id: number) => {
    const store_result: any = await axios.get(Http.find_store_by_id, {
      params: {
        id: id,
      },
    });

    if (store_result.result && store_result.data.length === 1) {
      setStoreId(store_result.data[0].id);
      setStoreName(store_result.data[0].name);
      setStoreCurrency(store_result.data[0].currency);
      setStorePriceSource(store_result.data[0].price_source);

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      setSnackSeverity('error');
      setSnackMessage("Can't find the store, please try again later.");
      setSnackOpen(true);
    }
  };

  useEffect(() => {
    getStore();
  }, []);

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

      {stores && stores.length > 0 && (
        <Box mt={3}>
          <FormControl fullWidth>
            <Select size={'small'} inputProps={{ 'aria-label': 'Without label' }} value={getStoreId()}>
              {stores.map((item, index) => (
                <MenuItem
                  value={item.id}
                  key={index}
                  onClick={() => {
                    onClickStore(item.id);
                  }}
                >
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
    </StyledSidebarHeader>
  );
};
