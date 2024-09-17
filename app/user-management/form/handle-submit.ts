import { UseFormReturnType } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { addUser, editUser } from './actions';
import { IUser } from '@/lib/auth/interfaces';

export const handleSubmit = async (
  values: IUser,
  setLoading: (loading: boolean) => void,
  setResponse: (res: boolean) => void,
  close: () => void,
  form: UseFormReturnType<IUser>,
  isUpdate: boolean
) => {
  setLoading(true);
  try {
    form.reset();
    try {
      const postRequest = (isUpdate ? editUser : addUser).bind(null, values);
      const responseData = await postRequest();
      if (!responseData) {
        throw new Error(`Failed to ${isUpdate ? 'edit' : 'add'} user`);
      }
      return setResponse(true);
    } catch (error) {
      notifications.show({
        message: (error as string).toString(),
        autoClose: 3000,
      });
      close();
      return setResponse(false);
    }
  } finally {
    setLoading(false);
  }
};
