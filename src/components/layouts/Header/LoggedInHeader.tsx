import { FC } from 'react';
import { NoDecorationLink, NoDecorationButton } from 'src/components/elements';
import { useLogOut } from 'src/components/layouts/Header/hooks';
import { CommonHeader } from 'src/components/layouts/Header/CommonHeader';

export const LoggedInHeader: FC = () => {
  const logOut = useLogOut();

  return (
    <CommonHeader>
      <NoDecorationLink href='/dashboard'>ダッシュボード</NoDecorationLink>
      <NoDecorationButton onClick={logOut} mr={20}>
        ログアウト
      </NoDecorationButton>
    </CommonHeader>
  );
};
