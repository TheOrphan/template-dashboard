import { Metadata } from 'next';
import Users from './users';
import { IUsersProps } from './interfaces';
import { optionsAppJson } from '@/utils/server.helpers';
import ContentComponent from '@/components/content';
import { IUser } from '@/lib/auth/interfaces';

export const metadata: Metadata = {
  title: 'User List',
};

const getUsers = async (): Promise<IUser[]> => {
  let data: IUser[] = [];
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/users`, {
      headers: (await optionsAppJson()).headers,
    });

    if (!res.ok) {
      throw new Error('Network response was not ok');
    }

    data = await res.json();
  } catch (error) {
    throw new Error((error as string).toString());
  }
  return data;
};

export default async function Page() {
  const data = await getUsers();
  const usersData: IUsersProps = {
    rows: data,
    totalData: data.length,
  };
  const breadcrumbs = [{ title: 'general.user-management-title', href: '/users' }];
  return (
    <ContentComponent title="general.user-management-title" breadcrumbs={breadcrumbs}>
      <Users {...usersData} />
    </ContentComponent>
  );
}
