import { FC, useContext } from 'react';
import { LoadingHeader } from 'src/components/layouts/Header/LoadingHeader';
import { LoggedInHeader } from 'src/components/layouts/Header/LoggedInHeader';
import { UnLoggedInHeader } from 'src/components/layouts/Header/UnLoggedInHeader';
import { AuthContext } from 'src/context/AuthContext';

export const Header: FC = () => {
  const { currentUser } = useContext(AuthContext);

  if (currentUser.state === 'loading') return <LoadingHeader />;
  if (currentUser.state === 'log_out') return <UnLoggedInHeader />;

  return <LoggedInHeader />;
};
