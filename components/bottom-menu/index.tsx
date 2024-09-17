'use client';

import { useSession, signOut } from 'next-auth/react';
import { IconLogout, IconSettings, IconUser, IconUserCircle } from '@tabler/icons-react';
import { ILinksGroupProps, INavbarList } from '../navbar-links-group/interfaces';
import { LinksGroup } from '../navbar-links-group';
import { rbac } from '@/lib/rbac';

export function BottomMenu({ isMinimal }: { isMinimal?: boolean }) {
  const { data: session } = useSession();
  const bottomMenu: INavbarList[] = [
    {
      label: 'control-panel-title',
      links: [],
    },
  ];
  let allowedRoutes: string[] = [];
  if (session?.userData?.role) {
    allowedRoutes = rbac
      .filter(({ rolesAllowed }) =>
        rolesAllowed.includes(session?.userData?.role!.toUpperCase() as string)
      )
      .map(({ path }) => path);
  }
  if (bottomMenu[0].links) {
    if (allowedRoutes.includes('/user-management')) {
      bottomMenu[0].links.push({
        label: 'user-management-title',
        icon: IconUserCircle,
        link: '/user-management',
      });
    }
    if (allowedRoutes.includes('/settings')) {
      bottomMenu[0].links.push({
        label: 'setting',
        icon: IconSettings,
        link: '/settings',
      });
    }
    if (allowedRoutes.includes('/profile')) {
      bottomMenu[0].links.push({
        label: 'profile-title',
        icon: IconUser,
        link: '/profile',
        extraBtn: {
          label: 'logout',
          icon: IconLogout,
          type: 'fn',
          args: () => signOut(),
        },
      });
    }
  }
  return bottomMenu.map((item) => {
    const linksGroupProps: ILinksGroupProps = {
      label: item.label,
      links: item.links?.map((submenu) => ({
        label: submenu.label || '',
        link: submenu.link || '',
        icon: submenu.icon || null,
        extraBtn: submenu.extraBtn
          ? {
              label: submenu.extraBtn.label || '',
              icon: submenu.extraBtn.icon,
              type: submenu.extraBtn.type as 'link' | 'fn' | 'alert',
              args: submenu.extraBtn.args,
            }
          : undefined,
      })),
    };
    return <LinksGroup isMinimal={isMinimal} key={item.label} {...linksGroupProps} noDivider />;
  });
}
