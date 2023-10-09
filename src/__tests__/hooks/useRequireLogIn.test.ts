import { renderHook } from '@testing-library/react';
import { useRequireLogIn } from 'src/hooks/useRequireLogIn';
import { useToast } from 'src/hooks/useToast';
import { CURRENT_USER_STATES } from 'src/const';
import { useRouter } from 'next/router';
import { useCurrentUser } from 'src/hooks/useCurrentUser';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
}));
jest.mock('src/hooks/useToast');
jest.mock('src/hooks/useCurrentUser', () => ({
  useCurrentUser: jest
    .fn()
    .mockReturnValue({ currentUser: { state: 'mockState' } }),
}));

describe('useRequireLogIn', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const mockPush = jest.fn();
  const mockToast = jest.fn();

  (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  (useToast as jest.Mock).mockReturnValue(mockToast);

  it('ログインしていない場合は /login にリダイレクトすること', () => {
    (useCurrentUser as jest.Mock).mockReturnValue({
      currentUser: { state: CURRENT_USER_STATES.LOG_OUT },
    });
    renderHook(() => useRequireLogIn());

    expect(mockPush).toHaveBeenCalledWith('/log_in');
    expect(mockToast).toHaveBeenCalledWith('error', 'ログインが必要です');
  });

  it('ログインしている場合は何も行わないこと', () => {
    (useCurrentUser as jest.Mock).mockReturnValue({
      currentUser: { state: CURRENT_USER_STATES.LOG_IN },
    });
    renderHook(() => useRequireLogIn());

    expect(mockPush).not.toHaveBeenCalled();
    expect(mockToast).not.toHaveBeenCalled();
  });
});
