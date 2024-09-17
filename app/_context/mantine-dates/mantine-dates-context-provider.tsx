'use client';

import 'dayjs/locale/id';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DatesProvider } from '@mantine/dates';
import dayjs from 'dayjs';
import { useParams } from 'next/navigation';

export default function MantineDatesContextProvider({ children }: { children: React.ReactNode }) {
  const { lang } = useParams();
  dayjs.locale(lang as string);
  dayjs.extend(customParseFormat);

  return <DatesProvider settings={{ locale: lang as string }}>{children}</DatesProvider>;
}
