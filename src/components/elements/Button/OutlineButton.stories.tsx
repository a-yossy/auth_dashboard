import type { Meta, StoryObj } from '@storybook/react';
import { OutlineButton } from 'src/components/elements/Button/OutlineButton'

const meta: Meta<typeof OutlineButton> = {
  component: OutlineButton,
};
export default meta;

export const Default: StoryObj<typeof OutlineButton> = {
  args: {
    children: '作成',
    colorScheme:'cyan'
  },
};
