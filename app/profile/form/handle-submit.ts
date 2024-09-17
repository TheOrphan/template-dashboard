import { notifications } from '@mantine/notifications';
import { changePassword } from './actions';
import { IChangePassword } from '../interface';

export const handleSubmit = async (
  user_id: string,
  reqBody: IChangePassword,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);
  try {
    try {
      const postRequest = changePassword.bind(null, { user_id, reqBody });
      const responseData = await postRequest();
      if (!responseData.status) {
        throw new Error(responseData.message || 'Failed to change password');
      }
      return true;
    } catch (error) {
      notifications.show({
        message: (error as string).toString(),
        autoClose: 3000,
      });
      return false;
    }
  } finally {
    setLoading(false);
  }
};
