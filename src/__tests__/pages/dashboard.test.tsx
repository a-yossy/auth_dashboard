import { screen, render } from '@testing-library/react';
import DashboardPage from 'src/pages/dashboard';
import { AuthContext } from 'src/context/AuthContext';
import { CURRENT_USER_STATES } from 'src/const';
import '@testing-library/jest-dom';
import { useRequireLogIn } from 'src/hooks/useRequireLogIn';

jest.mock('src/hooks/useRequireLogIn', () => ({
  useRequireLogIn: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
}));

describe('ダッシュボードページ', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('ログイン時にはユーザー名とメールアドレスが表示されていること', () => {
    render(
      <AuthContext.Provider
        value={{
          currentUser: {
            state: CURRENT_USER_STATES.LOG_IN,
            data: { name: '山田 太郎', email: 'test@example.com' },
          },
          setCurrentUser: () => {},
        }}
      >
        <DashboardPage />
      </AuthContext.Provider>,
    );

    expect(useRequireLogIn).toBeCalled();
    expect(screen.getByText('ダッシュボード')).toBeInTheDocument();
    expect(screen.getByText('名前')).toBeInTheDocument();
    expect(screen.getByText('山田 太郎')).toBeInTheDocument();
    expect(screen.getByText('メールアドレス')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('ローディング時には Spinner が表示されていること', () => {
    render(
      <AuthContext.Provider
        value={{
          currentUser: { state: CURRENT_USER_STATES.LOADING },
          setCurrentUser: () => {},
        }}
      >
        <DashboardPage />
      </AuthContext.Provider>,
    );

    expect(useRequireLogIn).toBeCalled();
    expect(screen.getByText('ダッシュボード')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText('名前')).not.toBeInTheDocument();
    expect(screen.queryByText('メールアドレス')).not.toBeInTheDocument();
  });

  it('ログアウト時にはタイトルのみ表示されていること', () => {
    render(
      <AuthContext.Provider
        value={{
          currentUser: { state: CURRENT_USER_STATES.LOG_OUT },
          setCurrentUser: () => {},
        }}
      >
        <DashboardPage />
      </AuthContext.Provider>,
    );

    expect(useRequireLogIn).toBeCalled();
    expect(screen.getByText('ダッシュボード')).toBeInTheDocument();
    expect(screen.queryByText('名前')).not.toBeInTheDocument();
    expect(screen.queryByText('メールアドレス')).not.toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });
});
