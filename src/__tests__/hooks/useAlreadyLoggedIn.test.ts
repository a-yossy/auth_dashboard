import { renderHook } from '@testing-library/react';
import { CURRENT_USER_STATES } from 'src/const';
import { useRouter } from 'next/router';
import { useCurrentUser } from 'src/hooks/useCurrentUser';
import { useAlreadyLoggedIn } from 'src/hooks/useAlreadyLoggedIn';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
}));
jest.mock('src/hooks/useCurrentUser', () => ({
  useCurrentUser: jest
    .fn()
    .mockReturnValue({ currentUser: { state: 'mockState' } }),
}));

describe('useAlreadyLoggedIn', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const mockPush = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

  it('ログインしている場合は /dashboard にリダイレクトすること', () => {
    (useCurrentUser as jest.Mock).mockReturnValue({
      currentUser: { state: CURRENT_USER_STATES.LOG_IN },
    });
    const { result } = renderHook(() => useAlreadyLoggedIn());

    result.current();

    expect(mockPush).toHaveBeenCalledWith('/dashboard');
  });

  it('ログインしていない場合は何も行わないこと', () => {
    (useCurrentUser as jest.Mock).mockReturnValue({
      currentUser: { state: CURRENT_USER_STATES.LOG_OUT },
    });
    const { result } = renderHook(() => useAlreadyLoggedIn());

    result.current();

    expect(mockPush).not.toHaveBeenCalled();
  });
});
