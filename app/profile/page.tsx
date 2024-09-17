import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import ContentComponent from '@/components/content';
import Profile from './profile';
import { authOptions } from '@/lib/auth';
import { IUser } from '@/lib/auth/interfaces';

export const metadata: Metadata = {
  title: 'Profile',
};

const getProfile = async (): Promise<{ userData: IUser }> => {
  const { userData } = (await getServerSession(authOptions)) || {};
  if (!userData) {
    throw new Error('Unauthorized');
  }
  return { userData };
};

export default async function Page() {
  const { userData: profile } = await getProfile();
  const breadcrumbs = [{ title: 'general.profile-title', href: '/profile' }];
  return (
    <ContentComponent title="general.profile-title" breadcrumbs={breadcrumbs}>
      <Profile initialData={profile} />
    </ContentComponent>
  );
}
