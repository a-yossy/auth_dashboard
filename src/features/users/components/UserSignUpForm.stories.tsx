import type { Meta, StoryObj } from '@storybook/react';
import { UserSignUpFormPresenter } from 'src/features/users/components/UserSignUpForm';

const meta: Meta<typeof UserSignUpFormPresenter> = {
  component: UserSignUpFormPresenter,
};
export default meta;

export const Default: StoryObj<typeof UserSignUpFormPresenter> = {
  args: {
    signUp: async ({ name, email, password, password_confirmation }) => {
      console.log({ name, email, password, password_confirmation });

      return Promise.resolve();
    },
  },
};
