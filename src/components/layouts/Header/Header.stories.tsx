import { Meta, StoryObj } from '@storybook/react';
import { Header } from 'src/components/layouts/Header/Header';
import { CURRENT_USER_STATES } from 'src/const';
import { AuthContext } from 'src/context/AuthContext';

const meta: Meta<typeof Header> = {
  component: Header,
};
export default meta;

export const Loading: StoryObj<typeof Header> = {
  decorators: [
    (Story) => (
      <AuthContext.Provider
        value={{
          currentUser: { state: CURRENT_USER_STATES.LOADING },
          setCurrentUser: () => {},
        }}
      >
        <Story />
      </AuthContext.Provider>
    ),
  ],
};

export const LogIn: StoryObj<typeof Header> = {
  decorators: [
    (Story) => (
      <AuthContext.Provider
        value={{
          currentUser: {
            state: CURRENT_USER_STATES.LOG_IN,
            data: { name: '山田 太郎', email: 'test@example.com' },
          },
          setCurrentUser: () => {},
        }}
      >
        <Story />
      </AuthContext.Provider>
    ),
  ],
};

export const LogOut: StoryObj<typeof Header> = {
  decorators: [
    (Story) => (
      <AuthContext.Provider
        value={{
          currentUser: { state: CURRENT_USER_STATES.LOG_OUT },
          setCurrentUser: () => {},
        }}
      >
        <Story />
      </AuthContext.Provider>
    ),
  ],
};
