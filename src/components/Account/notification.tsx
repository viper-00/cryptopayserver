import { Box, Button, FormControl, OutlinedInput, Stack, Switch, Typography } from '@mui/material';
import { useSnackPresistStore } from 'lib/store/snack';
import { useUserPresistStore } from 'lib/store/user';
import { NOTIFICATIONS } from 'packages/constants';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';

interface Notification {
  notify_id: number;
  status: number;
}

const Notification = () => {
  const { getUserId } = useUserPresistStore((state) => state);
  const { setSnackMessage, setSnackSeverity, setSnackOpen } = useSnackPresistStore((state) => state);

  const [notification, setNotification] = useState<Notification[]>([]);

  const getNotifications = async () => {
    const resposne: any = await axios.get(Http.find_notification, {
      params: {
        user_id: getUserId(),
      },
    });

    if (resposne.result && resposne.data.length > 0) {
      let notification_list: Array<Notification> = [];

      resposne.data.map((item: any) => {
        notification_list.push({
          notify_id: item.notify_id,
          status: item.status,
        });
      });
      setNotification(notification_list);
    } else {
      setSnackSeverity('error');
      setSnackMessage('Something wrong, please try it again');
      setSnackOpen(true);
    }
  };

  const init = async () => {
    await getNotifications();
  };

  useEffect(() => {
    init();
  }, []);

  async function handleChangeNotification(itemId: number) {
    const item = notification.find((item) => item.notify_id === itemId);
    const status = item?.status === 1 ? 2 : 1;

    const resposne: any = await axios.put(Http.update_notification, {
      user_id: getUserId(),
      notify_id: itemId,
      status: status,
    });

    if (resposne.result) {
      setSnackSeverity('success');
      setSnackMessage('Successful update!');
      setSnackOpen(true);

      await getNotifications();
    } else {
      setSnackSeverity('error');
      setSnackMessage('Something wrong, please try it again');
      setSnackOpen(true);
    }
  }

  return (
    <Box>
      <Typography variant={'h6'}>Notification Settings</Typography>
      <Typography mt={2}>To disable notification for a feature, kindly toggle off the specified feature.</Typography>

      <Box mt={2}>
        {Object.keys(NOTIFICATIONS).length > 0 &&
          Object.keys(NOTIFICATIONS).map((objectItem: any, index) => (
            <Stack direction={'row'} alignItems={'center'} key={index}>
              <Switch
                checked={
                  notification.find((item) => item.notify_id === parseInt(objectItem))?.status === 1 ? true : false
                }
                onChange={() => {
                  handleChangeNotification(parseInt(objectItem));
                }}
              />
              <Typography ml={2}>{NOTIFICATIONS[objectItem as keyof typeof NOTIFICATIONS]}</Typography>
            </Stack>
          ))}

        {/* <Stack direction={'row'} alignItems={'center'}>
          <Switch defaultChecked />
          <Typography ml={2}>{NOTIFICATIONS[2]}</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'}>
          <Switch defaultChecked />
          <Typography ml={2}>{NOTIFICATIONS[3]}</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'}>
          <Switch defaultChecked />
          <Typography ml={2}>{NOTIFICATIONS[4]}</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'}>
          <Switch defaultChecked />
          <Typography ml={2}>{NOTIFICATIONS[5]}</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'}>
          <Switch defaultChecked />
          <Typography ml={2}>{NOTIFICATIONS[6]}</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'}>
          <Switch defaultChecked />
          <Typography ml={2}>{NOTIFICATIONS[7]}</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'}>
          <Switch defaultChecked />
          <Typography ml={2}>{NOTIFICATIONS[8]}</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'}>
          <Switch defaultChecked />
          <Typography ml={2}>{NOTIFICATIONS[9]}</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'}>
          <Switch defaultChecked />
          <Typography ml={2}>{NOTIFICATIONS[10]}</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'}>
          <Switch defaultChecked />
          <Typography ml={2}>{NOTIFICATIONS[11]}</Typography>
        </Stack> */}
      </Box>

      <Stack direction={'row'} alignItems={'center'} mt={4} gap={2}>
        <Button variant={'contained'}>Save</Button>
        <Button variant={'contained'}>Disable all notifications</Button>
      </Stack>
    </Box>
  );
};

export default Notification;
