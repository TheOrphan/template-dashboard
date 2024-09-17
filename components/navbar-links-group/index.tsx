'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Box, Text, UnstyledButton, rem, Divider, Paper, Tooltip } from '@mantine/core';
import classes from './navbar-links-group.module.css';
import { ILinksGroupProps } from './interfaces';

const DefaultIcon: React.FC = () => <span />;

export function LinksGroup({
  noDivider,
  icon: Icon = DefaultIcon,
  label,
  link,
  links,
  isMinimal = false,
}: ILinksGroupProps) {
  const [isClicked, setIsClicked] = useState<any>({});
  const pathname = usePathname();
  const router = useRouter();
  const hasLinks = Array.isArray(links);

  const items = (hasLinks ? links : []).map((submenu, idx) => {
    const SubmenuLabelIcon = submenu?.icon;
    const { link: linkSub, label: labelSub, extraBtn } = submenu;
    const {
      type: typeBtn,
      args: argsBtn,
      style: styleBtn,
      label: labelBtn,
      icon: iconBtn,
    } = extraBtn || {};
    const ExtraBtnIcon = iconBtn;
    const key = labelSub + idx;
    const navLinkComp = (
      <UnstyledButton
        key={key}
        className={`${classes.control} ${!isMinimal && labelBtn && classes.hasExtraBtn} ${pathname.split('/')[2] === linkSub?.split('/')[1] ? classes.active : classes.menu}`}
      >
        <Link
          href={{
            pathname: `${linkSub}`,
          }}
          key={labelSub}
        >
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: isMinimal ? 'center' : 'start',
            }}
          >
            {SubmenuLabelIcon && <SubmenuLabelIcon style={{ width: rem(30), height: rem(30) }} />}
            {!isMinimal && (
              <Box ml="md" className={classes.label} color="var(--mantine-color-body)">
                {labelSub}
              </Box>
            )}
          </Box>
        </Link>
        {labelBtn && !isMinimal && (
          <Paper
            withBorder
            {...(typeBtn !== 'alert' && {
              onClick: () => {
                if (!isClicked[labelBtn]) {
                  setIsClicked({ [labelBtn]: true });
                  if (typeBtn === 'link') {
                    router.push(argsBtn as string);
                  } else if (typeof argsBtn === 'function') {
                    argsBtn();
                  }
                }
              },
            })}
            style={{
              ...{
                display: 'flex',
                fontSize: rem(12),
                fontWeight: 'normal',
                padding: '5px 8px 5px 8px',
                alignItems: 'center',
                color: 'var(--mantine-color-black)',
              },
              ...styleBtn,
            }}
          >
            {ExtraBtnIcon && (
              <ExtraBtnIcon
                style={{ width: rem(12), height: rem(12), marginRight: 6, marginBottom: 1 }}
              />
            )}
            {labelBtn}
          </Paper>
        )}
      </UnstyledButton>
    );
    return isMinimal ? (
      <Tooltip label={labelSub} position="right" transitionProps={{ duration: 0 }}>
        {navLinkComp}
      </Tooltip>
    ) : (
      navLinkComp
    );
  });

  const MenuElement = () => {
    const navLinkSingleComp = (
      <Box
        key={label}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: isMinimal ? 'center' : 'start',
        }}
      >
        <Icon style={{ width: rem(30), height: rem(30) }} />
        {!isMinimal && (
          <Box ml="md" className={classes.label} color="var(--mantine-color-body)">
            {label}
          </Box>
        )}
      </Box>
    );
    return isMinimal ? (
      <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
        {navLinkSingleComp}
      </Tooltip>
    ) : (
      navLinkSingleComp
    );
  };

  const CategoryElement = (
    <>
      {!noDivider && <Divider mt="sm" />}
      <Box
        key={label}
        pb={3}
        pt="md"
        ml="md"
        className={classes.label}
        color="var(--mantine-color-body)"
        ta={isMinimal ? 'center' : 'start'}
      >
        <Text c="dimmed" size="xs">
          {label.toUpperCase()}
        </Text>
      </Box>
      {items}
    </>
  );
  return (
    <>
      {!hasLinks ? (
        <UnstyledButton
          key={label}
          className={`${classes.control} ${pathname.split('/')[2] === link?.split('/')[1] ? classes.active : classes.menu}`}
        >
          <Link href={link || '/'}>{MenuElement()}</Link>
        </UnstyledButton>
      ) : (
        CategoryElement
      )}
    </>
  );
}
