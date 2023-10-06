import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useToast } from 'src/hooks/useToast';
import { SignUpForm } from 'src/features/users/types';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'src/libs/firebase';
import { isFirebaseError } from 'src/libs/isFirebaseError';
import { AuthErrorCodes } from 'src/features/users/const';
import { updateProfile } from 'firebase/auth';
import { useCurrentUser } from 'src/hooks/useCurrentUser';
import { CURRENT_USER_STATES } from 'src/context/AuthContext';

export const useSignUp = () => {
  const toast = useToast();
  const router = useRouter();
  const { setCurrentUser } = useCurrentUser();
  const signUp = useCallback(
    async (params: SignUpForm) => {
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          params.email,
          params.password,
        );
        const user = response.user;
        // TODO: エラー処理
        await updateProfile(user, {
          displayName: params.name,
        });
        await user.reload();
        setCurrentUser({
          state: CURRENT_USER_STATES.LOG_IN,
          data: {
            name: user.displayName ?? '',
            email: user.email ?? '',
          },
        });
        toast('success', 'アカウント登録しました');
        await router.push('/dashboard');
      } catch (error: unknown) {
        if (isFirebaseError(error)) {
          let errorMessage;
          switch (error.code) {
            case AuthErrorCodes.EMAIL_EXISTS:
              errorMessage = '既に登録されているメールアドレスです';
              break;
            case AuthErrorCodes.INVALID_EMAIL:
              errorMessage = 'メールアドレスが不正です';
              break;
            case AuthErrorCodes.OPERATION_NOT_ALLOWED:
              errorMessage = 'アカウント登録が許可されていません';
              break;
            case AuthErrorCodes.WEAK_PASSWORD:
              errorMessage = 'パスワードが弱すぎます';
              break;
            default:
              errorMessage = 'エラーが発生しました';
          }

          toast('error', 'アカウント登録に失敗しました', errorMessage);
        }
      }
    },
    [router, setCurrentUser, toast],
  );

  useEffect(() => {
    void router.prefetch('/dashboard');
  }, [router]);

  return signUp;
};
