'use client';

import { createTheme, mergeMantineTheme, DEFAULT_THEME } from '@mantine/core';

const themeOverride = createTheme({
  primaryColor: 'grape',
  defaultRadius: 'sm',
});

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);
