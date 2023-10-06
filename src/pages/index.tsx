import { signOut } from 'firebase/auth';
import type { NextPage } from 'next';
import { CenterTitle, OutlineButton } from 'src/components/elements';
import { auth } from 'src/libs/firebase';

const TopPage: NextPage = () => {
  return <CenterTitle>トップページ</CenterTitle>;
};

export default TopPage;
