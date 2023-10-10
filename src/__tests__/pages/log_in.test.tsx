import { screen, render, waitFor } from '@testing-library/react';
import LogInPage from 'src/pages/log_in';
import userEvent from '@testing-library/user-event';
import { useLogIn } from 'src/features/users/api/logIn';
import { LogInForm } from 'src/features/users/types';

jest.mock('src/features/users/api/logIn', () => ({
  useLogIn: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
}));

describe('ログインページ', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('ログインできること', () => {
    const mockLogIn = jest.fn();
    (useLogIn as jest.Mock).mockReturnValue((params: LogInForm) =>
      mockLogIn(params),
    );
    render(<LogInPage />);
    const user = userEvent.setup();

    user.type(
      screen.getByLabelText('メールアドレス', { selector: 'input' }),
      'test@example.com',
    );
    user.type(
      screen.getByLabelText('パスワード', { selector: 'input' }),
      'password',
    );
    user.click(screen.getByRole('button', { name: 'ログイン' }));

    waitFor(() => {
      expect(mockLogIn).toBeCalledWith({
        email: 'test@example.com',
        password: 'password',
      });
    });
  });
});
