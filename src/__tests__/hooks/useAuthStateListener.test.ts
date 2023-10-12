import { renderHook } from '@testing-library/react';
import { useAuthStateListener } from 'src/hooks/useAuthStateListener';
import { onAuthStateChanged } from 'firebase/auth';
import { CURRENT_USER_STATES } from 'src/const';

jest.mock('src/libs/firebase', () => ({
  auth: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  onAuthStateChanged: jest.fn(),
}));

describe('useAuthStateListener', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('ユーザーがログインしている場合は setCurrentUser はログイン状態とユーザーデーターをセットすること。', () => {
    const setCurrentUser = jest.fn();
    const user = {
      displayName: '山田 太郎',
      email: 'test@example.com',
    };
    (onAuthStateChanged as jest.Mock).mockImplementationOnce(
      (_, callback: jest.Mock) => {
        callback(user);

        return jest.fn();
      },
    );

    renderHook(() => useAuthStateListener(setCurrentUser));

    expect(setCurrentUser).toHaveBeenCalledWith({
      state: CURRENT_USER_STATES.LOG_IN,
      data: {
        name: '山田 太郎',
        email: 'test@example.com',
      },
    });
  });

  it('ユーザーがログアウトしている場合は setCurrentUser はログアウト状態をセットすること', () => {
    const setCurrentUser = jest.fn();
    (onAuthStateChanged as jest.Mock).mockImplementationOnce(
      (_, callback: jest.Mock) => {
        callback(null);

        return jest.fn();
      },
    );

    renderHook(() => useAuthStateListener(setCurrentUser));

    expect(setCurrentUser).toHaveBeenCalledWith({
      state: CURRENT_USER_STATES.LOG_OUT,
    });
  });
});
