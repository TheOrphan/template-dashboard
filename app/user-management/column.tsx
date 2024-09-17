import { Text, Flex, Button, Center, Popover, Group } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IUserColumn } from './interfaces';
import { deleteUser } from './form/actions';
import { IUser } from '@/lib/auth/interfaces';

const renderColumn = ({
  setIsUpdate,
  form,
  open,
  openedPopover,
  setPopover,
  activePopover,
  setActivePopover,
  router,
}: IUserColumn) => {
  const columnMembers = [
    {
      accessor: 'name',
      title: 'user.name',
      render: (record: IUser) => (
        <Flex gap="xs">
          <Text>{record.name}</Text>
        </Flex>
      ),
    },
    {
      accessor: 'email',
      title: 'user.email',
      render: (record: IUser) => (
        <Flex gap="xs">
          <Text>{record.email}</Text>
        </Flex>
      ),
    },
    {
      accessor: 'role',
      title: 'user.role',
      render: (record: IUser) => (
        <Flex gap="xs">
          <Text>{record.role}</Text>
        </Flex>
      ),
    },
    {
      accessor: 'action',
      title: <Center>general.action</Center>,
      width: 160,
      render: (record: IUser) => (
        <Center style={{ justifyContent: 'space-around' }}>
          <Button
            variant="outline"
            radius="xl"
            size="xs"
            onClick={() => {
              Object.entries(record).forEach(([key, value]) => {
                form.setFieldValue(key, value);
              });
              setIsUpdate(true);
              open();
            }}
          >
            general.edit
          </Button>
          <Popover
            position="bottom-end"
            withArrow
            shadow="md"
            opened={openedPopover && activePopover === record._id}
          >
            <Popover.Target>
              <Button
                color="red"
                variant="outline"
                radius="xl"
                size="xs"
                onClick={() => {
                  if (record._id) {
                    setActivePopover(record._id);
                    setPopover.open();
                  }
                }}
              >
                general.delete
              </Button>
            </Popover.Target>
            <Popover.Dropdown>
              general.delete-confirmation
              <Group justify="flex-end" mt="sm">
                <Button
                  variant="outline"
                  radius="xl"
                  size="xs"
                  onClick={() => {
                    setActivePopover(null);
                    setPopover.close();
                  }}
                >
                  general.no
                </Button>
                <Button
                  color="red"
                  variant="outline"
                  radius="xl"
                  size="xs"
                  onClick={async () => {
                    try {
                      const postRegisterMember = deleteUser.bind(null, record);
                      const responseData = await postRegisterMember();
                      if (!responseData) {
                        throw new Error('Failed to delete user');
                      }
                      setActivePopover(null);
                      setPopover.close();
                      router.refresh();
                    } catch (error) {
                      notifications.show({
                        message: (error as string).toString(),
                        autoClose: 3000,
                      });
                    }
                  }}
                >
                  general.yes
                </Button>
              </Group>
            </Popover.Dropdown>
          </Popover>
        </Center>
      ),
    },
  ];
  return columnMembers;
};

export default renderColumn;
