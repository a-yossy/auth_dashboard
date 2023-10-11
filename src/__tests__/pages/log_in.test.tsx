import { screen, render, waitFor } from '@testing-library/react';
import LogInPage from 'src/pages/log_in';
import userEvent from '@testing-library/user-event';
import { useLogIn } from 'src/features/users/api/logIn';
import { LogInForm } from 'src/features/users/types';
import { useAlreadyLoggedIn } from 'src/hooks/useAlreadyLoggedIn';

jest.mock('src/features/users/api/logIn', () => ({
  useLogIn: jest.fn(),
}));

jest.mock('src/hooks/useAlreadyLoggedIn', () => ({
  useAlreadyLoggedIn: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
}));

describe('ログインページ', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('ログインできること', async () => {
    const alreadyLoggedIn = jest.fn();
    (useAlreadyLoggedIn as jest.Mock).mockReturnValue(alreadyLoggedIn);
    const mockLogIn = jest.fn<Promise<void>, [LogInForm]>();
    (useLogIn as jest.Mock).mockReturnValue((params: LogInForm) =>
      mockLogIn(params),
    );
    render(<LogInPage />);
    const user = userEvent.setup();

    expect(alreadyLoggedIn).toBeCalled();
    await user.type(
      screen.getByLabelText('メールアドレス', { selector: 'input' }),
      'test@example.com',
    );
    await user.type(
      screen.getByLabelText('パスワード', { selector: 'input' }),
      'password',
    );
    await user.click(screen.getByRole('button', { name: 'ログイン' }));

    await waitFor(() => {
      expect(mockLogIn).toBeCalledWith({
        email: 'test@example.com',
        password: 'password',
      });
    });
  });
});
