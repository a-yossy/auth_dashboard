import type { NextPage } from 'next';
import { useState } from 'react';
import { auth } from 'src/libs/firebase';

const DashboardPage: NextPage = () => {
  const [user, setUser] = useState({
    displayName: '',
    email: '',
  });
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      setUser({
        displayName: user.displayName ?? '',
        email: user.email ?? '',
      });
    } else {
      console.log('no user');
    }
  });

  return (
    <div>
      name: {user?.displayName}
      email: {user?.email}
    </div>
  );
};

export default DashboardPage;
