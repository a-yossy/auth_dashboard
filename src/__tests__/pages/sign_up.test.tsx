import { screen, render } from '@testing-library/react';
import SignUpPage from 'src/pages/sign_up';

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

describe('新規登録ページ', () => {
  it('ページが表示されていること', () => {
    render(<SignUpPage />);

    expect(screen.getByRole('button', { name: '登録' })).toBeInTheDocument();
  });
});
