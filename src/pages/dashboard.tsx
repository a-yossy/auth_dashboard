import type { NextPage } from 'next';
import { Dashboard } from 'src/features/users/routes/Dashboard';
import { useRequireLogin } from 'src/hooks/useRequireLogin';

const DashboardPage: NextPage = () => {
  useRequireLogin();

  return <Dashboard />;
};

export default DashboardPage;
