import { screen, render } from '@testing-library/react';
import LogInPage from 'src/pages/log_in';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      prefetch: jest.fn(),
    };
  },
}));

jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
  getAuth: jest.fn(),
}));

afterEach(() => {
  jest.resetAllMocks();
});

describe('ログインページ', () => {
  it('ページが表示されていること', () => {
    render(<LogInPage />);

    expect(
      screen.getByRole('button', { name: 'ログイン' }),
    ).toBeInTheDocument();
  });
});
