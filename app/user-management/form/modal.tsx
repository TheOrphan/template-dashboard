import { Button, Flex, Loader, Modal, Select, Text, TextInput } from '@mantine/core';
import { IconCircleCheckFilled, IconPencil, IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IOpenModalProps, IResponseComponent } from '../interfaces';
import { handleSubmit } from './handle-submit';
import { IUser } from '@/lib/auth/interfaces';

const LoadingComponent = () => (
  <Flex justify="center" direction="column" gap="md" align="center">
    <Loader color="#FFCB05" size={50} />
    <Text>general.loading</Text>
  </Flex>
);

const ResponseComponent = ({ closeModal }: IResponseComponent) => {
  const router = useRouter();

  return (
    <Flex justify="center" direction="column" gap="md" align="center">
      <IconCircleCheckFilled color="#67BF67" width="70px" height="70px" />
      <Text size="xl" fw={700}>
        general.success
      </Text>
      <Button
        fullWidth
        c="#14213D"
        radius="md"
        style={{ background: '#FFCB05' }}
        onClick={() => {
          closeModal();
          router.refresh();
        }}
      >
        general.ok
      </Button>
    </Flex>
  );
};

const OpenModal = ({ form, opened, close, isUpdate }: IOpenModalProps) => {
  const [loading, setLoading] = useState(false);
  const [responseRegister, setResponse] = useState(false);

  const closeModal = () => {
    setResponse(false);
    close();
  };

  const ModalComponent = () => {
    if (loading) {
      return <LoadingComponent />;
    }

    if (responseRegister) {
      return <ResponseComponent closeModal={closeModal} />;
    }
    return (
      <form
        onSubmit={form.onSubmit(async (values: IUser) => {
          await handleSubmit(values, setLoading, setResponse, close, form, isUpdate);
        })}
      >
        <Flex justify="center" direction="column" gap="md">
          <Select
            data={[
              { value: 'customer', label: 'Customer' },
              { value: 'staff', label: 'Staff' },
            ]}
            label="user.role"
            placeholder={`${'user.placeholder-role'}`}
            {...form.getInputProps('role')}
          />
          <TextInput
            label="user.name"
            placeholder={`${'user.placeholder-name'}`}
            {...form.getInputProps('name')}
          />
          <TextInput
            label="user.email"
            placeholder={`${'user.placeholder-email'}`}
            {...form.getInputProps('email')}
          />
          {!isUpdate && (
            <TextInput
              label="user.password"
              placeholder={`${'user.placeholder-password'}`}
              disabled
              {...form.getInputProps('password')}
            />
          )}
          <Button fullWidth c="#14213D" radius="md" style={{ background: '#FFCB05' }} type="submit">
            general.ok
          </Button>
        </Flex>
      </form>
    );
  };

  return (
    <Modal
      opened={opened}
      onClose={closeModal}
      title={
        <Flex align="center" gap="sm">
          {isUpdate ? (
            <IconPencil size={18} color="#593B15" />
          ) : (
            <IconPlus size={18} color="#593B15" />
          )}
          <Text>{isUpdate ? 'general.edit' : 'general.add'} user.singular</Text>
        </Flex>
      }
      centered
      closeOnClickOutside={false}
    >
      {ModalComponent()}
    </Modal>
  );
};

export default OpenModal;
