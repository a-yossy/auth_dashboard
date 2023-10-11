import { FC } from 'react';
import { CenterTitle } from 'src/components/elements';
import { ProfileCard } from 'src/features/users/components/ProfileCard';
import { useRequireLogIn } from 'src/hooks/useRequireLogIn';

export const Dashboard: FC = () => {
  useRequireLogIn();

  return (
    <>
      <CenterTitle>ダッシュボード</CenterTitle>
      <ProfileCard />
    </>
  );
};
