import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useToast } from 'src/hooks/useToast';
import { signOut } from 'firebase/auth';
import { auth } from 'src/libs/firebase';

export const useLogOut = () => {
  const toast = useToast();
  const router = useRouter();
  const logOut = useCallback(async () => {
    await router.push('/');
    await signOut(auth);
    toast('success', 'ログアウトしました');
  }, [router, toast]);

  return logOut;
};