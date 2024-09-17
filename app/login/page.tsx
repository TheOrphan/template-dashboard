import { Metadata } from 'next';
import LoginForm from './login';
import { authenticatedToHome } from '@/utils/server.helpers';

export const metadata: Metadata = {
  title: 'Login',
};

export default async function LoginPage() {
  await authenticatedToHome();
  return <LoginForm />;
}
