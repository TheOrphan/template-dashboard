import React from 'react';
import Link from 'next/link';
import { Box, Breadcrumbs, Button, Group, Paper, rem } from '@mantine/core';
import { IconArrowLeft, IconFolderOpen } from '@tabler/icons-react';
import classes from './content.module.css';
import { IContentComponentProps } from './interfaces';

export default function ContentComponent({
  children,
  title,
  breadcrumbs,
  withBackBtn,
  handleBackBtn,
  customActions,
  isLoadingBackBtn = false,
}: IContentComponentProps) {
  return (
    <Box>
      <Group
        className={classes.title}
        justify="space-between"
        gap="xs"
        c="var(--mantine-color-body)"
      >
        <Box className={classes.backGroup}>
          {withBackBtn && (
            <Button
              leftSection={<IconArrowLeft size={20} />}
              loading={isLoadingBackBtn}
              onClick={handleBackBtn}
              loaderProps={{ type: 'bars' }}
            >
              back
            </Button>
          )}
          <Paper fw="bold" bg="transparent" fz={rem(20)} lh={rem(30)}>
            {title}
            {(breadcrumbs ?? []).length > 0 && (
              <Group gap="xs">
                <IconFolderOpen style={{ width: rem(14), height: rem(14) }} />
                <Breadcrumbs fz={rem(14)}>
                  {(breadcrumbs ?? []).map((each) => (
                    <Link key={each.href} href={each.href}>
                      {each.title}
                    </Link>
                  ))}
                </Breadcrumbs>
              </Group>
            )}
          </Paper>
        </Box>
        <Box display="flex" mr="5rem">
          {customActions &&
            customActions.length > 0 &&
            customActions.map((action, index) => (
              <React.Fragment key={index}>{action.component}</React.Fragment>
            ))}
        </Box>
      </Group>
      <div className={classes.content}>{children}</div>
    </Box>
  );
}
