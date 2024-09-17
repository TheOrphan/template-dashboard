'use client';

import React from 'react';
import { useDisclosure, useElementSize, useMediaQuery } from '@mantine/hooks';
import { AppShell, Group, Code, ScrollArea, Text, ActionIcon, Burger, Flex } from '@mantine/core';
import {
  IconChevronsLeft,
  IconChevronsRight,
  IconLayout,
  IconClipboardCopy,
  IconX,
  IconPackage,
} from '@tabler/icons-react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { BottomMenu } from '@/components/bottom-menu';
import { LinksGroup } from '@/components/navbar-links-group';
import pack from '@/package.json';
import logo from '@/public/logo.svg';
import { ILinksGroupProps, INavbarList } from '@/components/navbar-links-group/interfaces';
import { rbac } from '@/lib/rbac';
import { includesAny } from '@/utils/helpers';

const version = pack?.version;

export default function AppShellComponent({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [opened, { toggle }] = useDisclosure();
  const [minimized, { toggle: toggleMinimized }] = useDisclosure();
  const { ref, height } = useElementSize();
  const matchesSm = useMediaQuery('(max-width: 47.99em)');
  const matchesMd = useMediaQuery('(min-width: 48em) and (max-width: 75em)');
  const navbarWidth = minimized ? 150 : 275;
  const navbarList: INavbarList[] = [];
  let allowedRoutes: string[] = [];
  if (session?.userData?.role) {
    allowedRoutes = rbac
      .filter(({ rolesAllowed }) =>
        rolesAllowed.includes(session?.userData?.role?.toUpperCase() as string)
      )
      .map(({ path }) => path);
  }
  if (allowedRoutes.includes('/home')) {
    navbarList.push({
      label: 'home-title',
      icon: IconLayout,
      link: '/home',
    });
  }
  if (includesAny(allowedRoutes, ['/products', '/warranty-claims'])) {
    const links = [];
    if (allowedRoutes.includes('/products')) {
      links.push({
        label: 'products-title',
        icon: IconPackage,
        link: '/products',
      });
    }
    if (allowedRoutes.includes('/warranty-claims')) {
      links.push({
        label: 'warranty-claims-title',
        icon: IconClipboardCopy,
        link: '/warranty-claims',
      });
    }
    navbarList.push({
      label: 'management-title',
      links,
    });
  }

  const links = navbarList.map((item) => {
    const linksGroupProps: ILinksGroupProps = {
      label: item.label,
      link: item.link || '',
      icon: item.icon,
      links: item.links?.map((submenu) => ({
        label: submenu.label || '',
        link: submenu.link || '',
        icon: submenu.icon || null,
        extraBtn: submenu.extraBtn
          ? {
              label: submenu.extraBtn.label,
              icon: submenu.extraBtn.icon,
              type: 'link',
              args: submenu.extraBtn.args,
              style: submenu.extraBtn.style,
            }
          : undefined,
      })),
    };
    return <LinksGroup isMinimal={minimized} {...linksGroupProps} key={item.label} />;
  });

  return (
    <AppShell
      navbar={{ width: navbarWidth, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
      withBorder={false}
    >
      <AppShell.Header
        ml={matchesMd ? navbarWidth : 0}
        px="md"
        bg="url(/header-texture.png), #000000"
        bgp="left"
        bgsz="cover"
        bgr="no-repeat"
        c="var(--mantine-color-body)"
      >
        <Flex align="center" justify={matchesSm ? 'space-between' : 'flex-end'}>
          <Burger
            color="var(--mantine-color-body)"
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
          />
          <Group justify="flex-end">
            <Text fw="bold" my="lg" fz={matchesMd ? 22 : 16}>
              {'app-title'.toUpperCase()}
            </Text>
            <Code fz={10} fw={100}>
              v{version}
            </Code>
          </Group>
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar p="md" bg="#F5F5F5">
        <AppShell.Section>
          <Group justify="space-between">
            <Image
              src={logo}
              alt="logo ASL RI guest book"
              width={minimized ? 32 : 64}
              height={minimized ? 19 : 38}
              priority
            />
            <ActionIcon
              variant="subtle"
              color="grey"
              aria-label="Burger"
              onClick={toggle}
              size="xl"
              hiddenFrom="sm"
            >
              <IconX />
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              color="grey"
              aria-label="Burger"
              onClick={toggleMinimized}
              size="sm"
              visibleFrom="sm"
            >
              {minimized ? <IconChevronsRight /> : <IconChevronsLeft />}
            </ActionIcon>
          </Group>
        </AppShell.Section>

        <AppShell.Section ref={ref} grow pt="xl">
          <ScrollArea h={height}>{links}</ScrollArea>
        </AppShell.Section>

        <AppShell.Section grow>
          <BottomMenu isMinimal={minimized} />
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
