import { Metadata } from 'next';
import ContentComponent from '@/components/content';
import Home from './home';

export const metadata: Metadata = {
  title: 'Home',
};

export default async function Page() {
  const breadcrumbs = [{ title: 'general.home-title', href: '/home' }];
  return (
    <ContentComponent title="general.home-title" breadcrumbs={breadcrumbs}>
      <Home />
    </ContentComponent>
  );
}
