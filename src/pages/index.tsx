import { signOut } from 'firebase/auth';
import type { NextPage } from 'next';
import { OutlineButton } from 'src/components/elements';
import { auth } from 'src/libs/firebase';

const TopPage: NextPage = () => {
  return (
    <div>
      TopPage
      <OutlineButton onClick={() => signOut(auth)}>ログアウト</OutlineButton>
    </div>
  );
};

export default TopPage;
