import { Meta, StoryObj } from '@storybook/react';
import { CenterTitle } from 'src/components/elements';
import { Layout } from 'src/components/layouts/Layout/Layout';
import { AuthContext } from 'src/context/AuthContext';
import { CURRENT_USER_STATES } from 'src/const';

const meta: Meta<typeof Layout> = {
  component: Layout,
};
export default meta;

export const Default: StoryObj<typeof Layout> = {
  args: {
    children: <CenterTitle mt={5}>トップページ</CenterTitle>,
  },
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
