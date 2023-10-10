import type { Meta, StoryObj } from '@storybook/react';
import { UserLogInFormPresenter } from 'src/features/users/components/UserLogInForm';

const meta: Meta<typeof UserLogInFormPresenter> = {
  component: UserLogInFormPresenter,
};
export default meta;

export const Default: StoryObj<typeof UserLogInFormPresenter> = {
  args: {
    logIn: async ({ email, password }) => {
      console.log({ email, password });

      return Promise.resolve();
    },
  },
};
