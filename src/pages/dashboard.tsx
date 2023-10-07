import type { NextPage } from 'next';
import { Dashboard } from 'src/features/users/routes/Dashboard';
import { useRequireLogIn } from 'src/hooks/useRequireLogIn';

const DashboardPage: NextPage = () => {
  useRequireLogIn();

  return <Dashboard />;
};

export default DashboardPage;
