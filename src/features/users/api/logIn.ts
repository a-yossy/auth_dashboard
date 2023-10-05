import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useToast } from 'src/hooks/useToast';
import { LogInForm } from 'src/features/users/types';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'src/libs/firebase';
import { isFirebaseError } from 'src/libs/isFirebaseError';
import { AuthErrorCodes } from 'src/features/users/const';

export const useLogIn = () => {
  const toast = useToast();
  const router = useRouter();
  const logIn = useCallback(
    async (params: LogInForm) => {
      try {
        const response = await signInWithEmailAndPassword(
          auth,
          params.email,
          params.password,
        );
        console.log(response);
        await router.push('/dashboard');
        toast('success', 'ログインしました');
      } catch (error: unknown) {
        console.log(error);
        if (isFirebaseError(error)) {
          let errorMessage;
          switch (error.code) {
            case AuthErrorCodes.INVALID_EMAIL:
              errorMessage = 'メールアドレスが不正です';
              break;
            case AuthErrorCodes.INVALID_LOGIN_CREDENTIALS:
              errorMessage = 'メールアドレスまたはパスワードが間違っています';
              break;
            case AuthErrorCodes.USER_DISABLED:
              errorMessage = 'アカウントが無効です';
              break;
            case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
              errorMessage =
                'アカウントが一時的にロックされました。後でもう一度お試しください';
              break;
            default:
              errorMessage = 'エラーが発生しました';
          }

          toast('error', 'アカウント登録に失敗しました', errorMessage);
        }
      }
    },
    [router, toast],
  );

  useEffect(() => {
    void router.prefetch('/dashboard');
  }, [router]);

  return logIn;
};
