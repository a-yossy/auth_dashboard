import { renderHook } from '@testing-library/react';
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useToast } from 'src/hooks/useToast';
import { AuthErrorCodes } from 'src/features/users/const';
import { FirebaseError } from 'firebase/app';
import { useSignUp } from 'src/features/users/api/signUp';
import { useCurrentUser } from 'src/hooks/useCurrentUser';
import { CURRENT_USER_STATES } from 'src/const';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('src/libs/firebase', () => ({
  auth: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  AuthErrorCodes: { INVALID_EMAIL: 'auth/invalid-email' },
  createUserWithEmailAndPassword: jest.fn(),
  updateProfile: jest.fn(),
}));

jest.mock('src/hooks/useToast', () => ({
  useToast: jest.fn(),
}));

jest.mock('src/hooks/useCurrentUser', () => ({
  useCurrentUser: jest.fn(),
}));

describe('useSignUp', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const mockPush = jest.fn();
  const mockToast = jest.fn();
  const mockSetCurrentUser = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      prefetch: jest.fn(),
    });
    (useToast as jest.Mock).mockReturnValue(mockToast);
    (useCurrentUser as jest.Mock).mockReturnValue({
      setCurrentUser: mockSetCurrentUser,
    });
  });

  it('新規登録に成功した場合はダッシュボード画面に遷移すること', async () => {
    const mockReload = jest.fn();
    const mockUser = {
      displayName: '山田太郎',
      email: 'test@example.com',
      reload: mockReload,
    };
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: mockUser,
    });
    const { result } = renderHook(() => useSignUp());

    await result.current({
      name: '山田太郎',
      email: 'test@example.com',
      password: 'password',
      password_confirmation: 'password',
    });

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(),
      'test@example.com',
      'password',
    );
    expect(updateProfile).toHaveBeenCalledWith(mockUser, {
      displayName: '山田太郎',
    });
    expect(mockReload).toHaveBeenCalled();
    expect(mockSetCurrentUser).toHaveBeenCalledWith({
      state: CURRENT_USER_STATES.LOG_IN,
      data: {
        name: '山田太郎',
        email: 'test@example.com',
      },
    });
    expect(mockToast).toHaveBeenCalledWith('success', 'アカウント登録しました');
    expect(mockPush).toHaveBeenCalledWith('/dashboard');
    expect(mockToast).not.toHaveBeenCalledWith(
      'error',
      'アカウント登録に失敗しました',
      expect.anything(),
    );
  });

  it('新規登録に失敗した場合はエラーメッセージが表示されること', async () => {
    const firebaseError = new FirebaseError(
      AuthErrorCodes.INVALID_EMAIL,
      'Firebase: Error (auth/invalid-code).',
    );
    (createUserWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(
      firebaseError,
    );
    const { result } = renderHook(() => useSignUp());

    await result.current({
      name: '山田太郎',
      email: 'invalid-email',
      password: 'password',
      password_confirmation: 'password',
    });

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(),
      'invalid-email',
      'password',
    );
    expect(updateProfile).not.toHaveBeenCalled();
    expect(mockSetCurrentUser).not.toHaveBeenCalled();
    expect(mockToast).not.toHaveBeenCalledWith(
      'success',
      'アカウント登録しました',
    );
    expect(mockPush).not.toHaveBeenCalled();
    expect(mockToast).toHaveBeenCalledWith(
      'error',
      'アカウント登録に失敗しました',
      'メールアドレスが不正です',
    );
  });
});
