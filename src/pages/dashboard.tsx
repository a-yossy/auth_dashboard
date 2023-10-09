import type { NextPage } from 'next';
import { Dashboard } from 'src/features/users';
import { useRequireLogIn } from 'src/hooks/useRequireLogIn';

const DashboardPage: NextPage = () => {
  useRequireLogIn();

  return <Dashboard />;
};

export default DashboardPage;
