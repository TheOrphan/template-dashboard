'use client';

import AppShellComponent from '@/components/app-shell';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return <AppShellComponent>{children}</AppShellComponent>;
}
