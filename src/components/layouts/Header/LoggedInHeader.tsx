import { FC } from 'react';
import { NoDecorationLink, NoDecorationButton } from 'src/components/elements';
import { CommonHeader } from 'src/components/layouts/Header/CommonHeader';

type LoggedInHeaderProps = {
  logOut: () => Promise<void>;
};

export const LoggedInHeader: FC<LoggedInHeaderProps> = ({ logOut }) => (
  <CommonHeader>
    <NoDecorationLink href='/dashboard'>ダッシュボード</NoDecorationLink>
    <NoDecorationButton onClick={logOut} mr={20}>
      ログアウト
    </NoDecorationButton>
  </CommonHeader>
);
