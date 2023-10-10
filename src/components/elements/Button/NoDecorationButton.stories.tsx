import type { Meta, StoryObj } from '@storybook/react';
import { NoDecorationButton } from 'src/components/elements/Button/NoDecorationButton'

const meta: Meta<typeof NoDecorationButton> = {
  component: NoDecorationButton,
};
export default meta;

export const Default: StoryObj<typeof NoDecorationButton> = {
  args: {
    children: 'ログアウト',

  },
};
