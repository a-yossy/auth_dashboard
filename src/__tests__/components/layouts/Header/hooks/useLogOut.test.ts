import { renderHook } from '@testing-library/react';
import { useRouter } from 'next/router';
import { signOut } from 'firebase/auth';
import { useToast } from 'src/hooks/useToast';
import { useLogOut } from 'src/components/layouts/Header/hooks/useLogOut';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('src/libs/firebase', () => ({
  auth: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  signOut: jest.fn(),
}));

jest.mock('src/hooks/useToast', () => ({
  useToast: jest.fn(),
}));

describe('useLogOut', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const mockPush = jest.fn();
  const mockToast = jest.fn();

  (useRouter as jest.Mock).mockReturnValue({
    push: mockPush,
  });
  (useToast as jest.Mock).mockReturnValue(mockToast);

  it('ログアウトに成功した場合はホーム画面に遷移すること', async () => {
    const { result } = renderHook(() => useLogOut());

    await result.current();

    expect(mockPush).toHaveBeenCalledWith('/');
    expect(signOut).toHaveBeenCalled();
    expect(mockToast).toHaveBeenCalledWith('success', 'ログアウトしました');
  });
});
