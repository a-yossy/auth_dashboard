import { screen, render, waitFor } from '@testing-library/react';
import { useSignUp } from 'src/features/users/api/signUp';
import SignUpPage from 'src/pages/sign_up';
import userEvent from '@testing-library/user-event';
import { SignUpForm } from 'src/features/users/types';

jest.mock('src/features/users/api/signUp', () => ({
  useSignUp: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
}));

describe('新規登録ページ', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('新規登録できること', async () => {
    const mockSignUp = jest.fn();
    (useSignUp as jest.Mock).mockReturnValue((params: SignUpForm) =>
      mockSignUp(params),
    );
    render(<SignUpPage />);
    const user = userEvent.setup();

    await user.type(
      screen.getByLabelText('名前', { selector: 'input' }),
      '山田 太郎',
    );
    await user.type(
      screen.getByLabelText('メールアドレス', { selector: 'input' }),
      'test@example.com',
    );
    await user.type(
      screen.getByLabelText('パスワード', { selector: 'input' }),
      'password',
    );
    await user.type(
      screen.getByLabelText('確認用パスワード', { selector: 'input' }),
      'password',
    );
    await user.click(screen.getByRole('button', { name: '登録' }));

    await waitFor(() => {
      expect(mockSignUp).toBeCalledWith({
        name: '山田 太郎',
        email: 'test@example.com',
        password: 'password',
        password_confirmation: 'password',
      });
    });
  });
});
