import { FC } from 'react';
import { LoadingHeader } from 'src/components/layouts/Header/LoadingHeader';
import { LoggedInHeader } from 'src/components/layouts/Header/LoggedInHeader';
import { UnLoggedInHeader } from 'src/components/layouts/Header/UnLoggedInHeader';
import { useCurrentUser } from 'src/hooks/useCurrentUser';
import { useLogOut } from 'src/components/layouts/Header/hooks/useLogOut';

export const Header: FC = () => {
  const logOut = useLogOut();

  return <HeaderPresenter logOut={logOut} />;
};

type HeaderPresenterProps = {
  logOut: () => Promise<void>;
};

export const HeaderPresenter: FC<HeaderPresenterProps> = ({ logOut }) => {
  const { currentUser } = useCurrentUser();

  if (currentUser.state === 'loading') return <LoadingHeader />;
  if (currentUser.state === 'log_out') return <UnLoggedInHeader />;

  return <LoggedInHeader logOut={logOut} />;
};
