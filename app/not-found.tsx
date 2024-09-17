'use client';

import Image from 'next/image';
import { redirect } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Container, Title, Text, Button, SimpleGrid, Flex } from '@mantine/core';
import image from '@/public/errorpage/not-found.svg';
import classes from './not-found.module.css';

export default function NotFound() {
  const { status } = useSession();
  if (status === 'unauthenticated') {
    redirect('/login');
  }
  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image width={240} height={150} alt="404" src={image.src} className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>An error occurred...</Title>
          <Text c="dimmed" size="lg">
            The page you are looking for was not found. You might have mistyped the address, or the
            page has been moved to another URL. If you think this is an error, contact support.
          </Text>
          <Flex mt="xl">
            <Button mr="sm" type="button" variant="transparent" onClick={() => signOut()}>
              Sign Out
            </Button>
            <Link href="/home">
              <Button variant="outline" size="md" className={classes.control}>
                Back to Home
              </Button>
            </Link>
          </Flex>
        </div>
        <Image
          width={420}
          height={300}
          alt="404"
          src={image.src}
          className={classes.desktopImage}
        />
      </SimpleGrid>
    </Container>
  );
}
