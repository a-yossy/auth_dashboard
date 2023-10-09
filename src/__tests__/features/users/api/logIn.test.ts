import { renderHook } from '@testing-library/react';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useToast } from 'src/hooks/useToast';
import { useLogIn } from 'src/features/users/api/logIn';
import { AuthErrorCodes } from 'src/features/users/const';
import { FirebaseError } from 'firebase/app';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('src/libs/firebase', () => ({
  auth: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  AuthErrorCodes: { INVALID_EMAIL: 'auth/invalid-email' },
  signInWithEmailAndPassword: jest.fn(),
}));

jest.mock('src/hooks/useToast', () => ({
  useToast: jest.fn(),
}));

describe('useLogIn', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const mockPush = jest.fn();
  const mockToast = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      prefetch: jest.fn(),
    });
    (useToast as jest.Mock).mockReturnValue(mockToast);
  });

  it('ログインに成功した場合はダッシュボード画面に遷移すること', async () => {
    const { result } = renderHook(() => useLogIn());

    await result.current({ email: 'test@example.com', password: 'password' });

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(),
      'test@example.com',
      'password',
    );
    expect(mockPush).toHaveBeenCalledWith('/dashboard');
    expect(mockToast).toHaveBeenCalledWith('success', 'ログインしました');
    expect(mockToast).not.toHaveBeenCalledWith(
      'error',
      'ログインに失敗しました',
      expect.anything(),
    );
  });

  it('ログインに失敗した場合はエラーメッセージが表示されること', async () => {
    const firebaseError = new FirebaseError(
      AuthErrorCodes.INVALID_EMAIL,
      'Firebase: Error (auth/invalid-code).',
    );
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(
      firebaseError,
    );
    const { result } = renderHook(() => useLogIn());

    await result.current({
      email: 'test@example.com',
      password: 'wrong-password',
    });

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(),
      'test@example.com',
      'wrong-password',
    );
    expect(mockPush).not.toHaveBeenCalled();
    expect(mockToast).not.toHaveBeenCalledWith('success', 'ログインしました');
    expect(mockToast).toHaveBeenCalledWith(
      'error',
      'ログインに失敗しました',
      'メールアドレスが不正です',
    );
  });
});
