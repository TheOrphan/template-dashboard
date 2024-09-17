'use client';

import { useState } from 'react';
import {
  Paper,
  Title,
  Avatar,
  Text,
  Group,
  Stack,
  PasswordInput,
  Button,
  SimpleGrid,
} from '@mantine/core';
import { IconAt, IconHierarchy2 } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { signOut } from 'next-auth/react';
import classes from './profile.module.css';
import { getInitials } from '@/utils/helpers';
import { IUser } from '@/lib/auth/interfaces';
import { IChangePassword } from './interface';
import { handleSubmit } from './form/handle-submit';
import { initialValues } from './form/initial-values';
import { changePasswordValidation } from './form/validation';

export default function Profile({ initialData }: { initialData: IUser }) {
  const [visible, { toggle }] = useDisclosure(false);
  const { user_id, email, name, role } = initialData || {};
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues,
    validate: zodResolver(changePasswordValidation()),
  });

  return (
    <Paper>
      <Title order={1}>profile.my-profile</Title>
      <SimpleGrid cols={{ md: 1, lg: 2 }}>
        <Paper mt="xl" withBorder p="lg" maw={600} mah={240}>
          <Group wrap="nowrap" align="flex-start" gap="xl">
            <Avatar size={200} radius="md">
              {getInitials(name?.toUpperCase())}
            </Avatar>
            <Paper>
              <Text fz="lg" fw={500} className={classes.name}>
                {name?.toUpperCase() || '-'}
              </Text>
              <Group wrap="nowrap" gap={10} mt={3}>
                <IconHierarchy2 stroke={1.5} size="1rem" className={classes.icon} />
                <Text fz="xs" c="dimmed">
                  {role || '-'}
                </Text>
              </Group>
              <Group wrap="nowrap" gap={10} mt={3}>
                <IconAt stroke={1.5} size="1rem" className={classes.icon} />
                <Text fz="xs" c="dimmed">
                  {email || '-'}
                </Text>
              </Group>
            </Paper>
          </Group>
        </Paper>
        <Paper mt="xl" withBorder py="xs" px="lg" maw={600}>
          <form
            onSubmit={form.onSubmit(async (values: IChangePassword) => {
              if (!user_id) return;
              const isSuccess = await handleSubmit(user_id, values, setLoading);
              if (isSuccess) {
                notifications.show({
                  title: 'general.success',
                  message: 'general.update-password-success',
                });
                signOut();
              }
              form.reset();
            })}
          >
            <Stack>
              <PasswordInput
                label="user.oldPassword"
                visible={visible}
                placeholder="user.placeholder-oldPassword"
                onVisibilityChange={toggle}
                {...form.getInputProps('oldPassword')}
              />
              <PasswordInput
                label="user.newPassword"
                visible={visible}
                placeholder="user.placeholder-newPassword"
                onVisibilityChange={toggle}
                {...form.getInputProps('newPassword')}
              />
              <PasswordInput
                label="user.confirmPassword"
                visible={visible}
                placeholder="user.placeholder-confirmPassword"
                onVisibilityChange={toggle}
                {...form.getInputProps('confirmPassword')}
              />
              <Group justify="flex-end">
                <Button type="submit" loading={loading}>
                  general.update-password
                </Button>
              </Group>
            </Stack>
          </form>
        </Paper>
      </SimpleGrid>
    </Paper>
  );
}
