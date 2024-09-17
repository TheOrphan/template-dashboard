import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/carousel/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '@mantine/dropzone/styles.css';
import 'mantine-datatable/styles.layer.css';
import '@/styles/global.css';

import { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { getServerSession } from 'next-auth/next';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import ClientContextProvider from '@/app/_context/session';
import RecoilContextProvider from '@/app/_context/recoil/recoil-context-provider';
import MantineDatesContextProvider from '@/app/_context/mantine-dates/mantine-dates-context-provider';
import { authOptions } from '@/lib/auth';
import { theme } from '@/lib/theme';
import ClientProvider from './_context/client-provider';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Warranty Claim Dashboard',
    default: 'Warranty Claim Dashboard',
  },
  applicationName: 'Warranty Claim Dashboard',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/icon.ico',
    apple: '/apple-icon.ico',
  },
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang={locale}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={montserrat.className}>
        <ClientContextProvider session={session}>
          <RecoilContextProvider>
            <MantineProvider defaultColorScheme="light" theme={theme}>
              <MantineDatesContextProvider>
                <ClientProvider>{children}</ClientProvider>
              </MantineDatesContextProvider>
            </MantineProvider>
          </RecoilContextProvider>
        </ClientContextProvider>
      </body>
    </html>
  );
}
