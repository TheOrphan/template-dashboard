'use client';

import { useEffect, useState } from 'react';
import { z } from 'zod';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { getCookie, deleteCookie } from 'cookies-next';
import { IconXboxXFilled } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
  TextInput,
  Button,
  Box,
  Group,
  Title,
  Text,
  Flex,
  em,
  PasswordInput,
  Center,
  Stack,
  Loader,
  Alert,
} from '@mantine/core';
import pack from '@/package.json';
import logo from '@/public/logo.svg';
import classes from './login.module.css';

const version = pack?.version;

const loginValidation = z.object({
  email: z.string().email({ message: 'Email is not valid' }).min(1, { message: 'Email required' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
});

export default function LoginForm() {
  const [isError, setIsError] = useState(false);
  const [loading, { toggle }] = useDisclosure();
  const error = getCookie('login-error');
  const tokenError = getCookie('token-error');
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const form = useForm({
    validate: zodResolver(loginValidation),
    initialValues: {
      email: '',
      password: '',
    },
  });
  useEffect(() => {
    if (error) {
      setIsError(true);
      deleteCookie('login-error');
      Error(error.toString());
    }
  }, [error]);

  useEffect(() => {
    if (tokenError) {
      notifications.show({
        title: 'general.notification-title',
        message: tokenError.toString(),
      });
      deleteCookie('token-error');
      Error(tokenError.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenError]);

  return (
    <>
      <Center>
        <Alert
          w="90%"
          pos="fixed"
          top={20}
          variant="filled"
          color="#FF4967"
          withCloseButton
          opacity={isError ? 1 : 0}
          className={classes.alert}
          title="login.error-title"
          onClose={() => setIsError(false)}
          icon={<IconXboxXFilled />}
        />
      </Center>
      <Flex
        c="var(--mantine-color-body)"
        h="100vh"
        gap={{ base: 'xl', md: 100 }}
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
        bg={isMobile ? 'rgb(12 10 30 / 90%)' : 'transparent'}
        style={{
          alignContent: isMobile ? 'start' : 'center',
        }}
      >
        <Box
          miw={isMobile ? '90%' : 640}
          p="xl"
          pb="md"
          bg={isMobile ? 'transparent' : 'rgb(12 10 30 / 90%)'}
          style={{ borderRadius: 'var(--mantine-radius-xl)' }}
        >
          <Stack align="center" justify="center" gap="md">
            <Image src={logo} alt="logo" width="107" height="64" priority />
            <Title order={2} mb="xs">
              {'general.app-title'.toUpperCase()}
            </Title>
            <Text fz={24} mb="lg">
              login.title
            </Text>
          </Stack>
          <form
            onSubmit={form.onSubmit((values) => {
              toggle();
              signIn('credentials', {
                email: values.email,
                password: values.password,
                callbackUrl: '/home',
              });
            })}
          >
            <TextInput
              variant="unstyled"
              classNames={{ input: classes.input }}
              label="login.email"
              placeholder="login.email-placeholder"
              {...form.getInputProps('email')}
            />
            <PasswordInput
              variant="unstyled"
              classNames={{ input: classes.input }}
              label="login.password"
              placeholder="login.password-placeholder"
              mt="sm"
              {...form.getInputProps('password')}
            />

            <Group justify="flex-end" mt="xl">
              <Button className={classes.btnLogin} fullWidth type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader
                      color="var(--button-hover-color, var(--button-color))"
                      size="xs"
                      mr="xs"
                    />
                    login.button-logging-in
                  </>
                ) : (
                  'login.button'
                )}
              </Button>
            </Group>
          </form>
          <Center mt="xl">
            <Text size="xs" c="dimmed">
              general.version, {version}
            </Text>
          </Center>
        </Box>
        <Box
          pos="absolute"
          top={0}
          left={0}
          w="100vw"
          h="100vh"
          bg={'url("/bg-login.jpg"), var(--mantine-color-gray-9)'}
          bgsz="cover"
          bgp="center"
          bgr="no-repeat"
          style={{
            zIndex: -1,
            WebkitFilter: 'grayscale(80%) blur(2px)',
          }}
        />
      </Flex>
    </>
  );
}
