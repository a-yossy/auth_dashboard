import { FC } from 'react';
import { CenterTitle } from 'src/components/elements';
import { ProfileCard } from '../components/ProfileCard';

export const Dashboard: FC = () => {
  return (
    <>
      <CenterTitle>ダッシュボード</CenterTitle>
      <ProfileCard />
    </>
  );
};
