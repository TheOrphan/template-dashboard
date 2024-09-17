import { UseFormReturnType } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IProduct } from '../interfaces';
import { addProduct, editProduct } from './actions';

export const handleSubmit = async (
  values: IProduct,
  setLoading: (loading: boolean) => void,
  setResponse: (res: boolean) => void,
  close: () => void,
  form: UseFormReturnType<IProduct>,
  isUpdate: boolean
) => {
  setLoading(true);
  try {
    form.reset();
    try {
      const postRequest = (isUpdate ? editProduct : addProduct).bind(null, values);
      const responseData = await postRequest();
      if (!responseData) {
        throw new Error(`Failed to ${isUpdate ? 'edit' : 'add'} product`);
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
