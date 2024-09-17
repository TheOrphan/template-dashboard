import { Text, Flex, Button, Center, Popover, Group } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IProduct, IProductColumn } from './interfaces';
import { deleteProduct } from './form/actions';

const renderColumn = ({
  setIsUpdate,
  form,
  open,
  openedPopover,
  setPopover,
  activePopover,
  setActivePopover,
  router,
}: IProductColumn) => {
  const columnMembers = [
    {
      accessor: 'name',
      title: 'product.name',
      render: (record: IProduct) => (
        <Flex gap="xs">
          <Text>{record.name}</Text>
        </Flex>
      ),
    },
    {
      accessor: 'description',
      title: 'product.description',
      render: (record: IProduct) => (
        <Flex gap="xs">
          <Text>{record.description}</Text>
        </Flex>
      ),
    },
    {
      accessor: 'action',
      title: <Center>general.action</Center>,
      width: 160,
      render: (record: IProduct) => (
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
                      const postRegisterMember = deleteProduct.bind(null, record);
                      const responseData = await postRegisterMember();
                      if (!responseData) {
                        throw new Error('Failed to delete product');
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
