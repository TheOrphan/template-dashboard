'use client';

import AppShellComponent from '@/components/app-shell';

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <AppShellComponent>{children}</AppShellComponent>;
}
