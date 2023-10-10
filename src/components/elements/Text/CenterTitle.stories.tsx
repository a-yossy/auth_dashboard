import type { Meta, StoryObj } from '@storybook/react';
import { CenterTitle } from 'src/components/elements/Text/CenterTitle';

const meta: Meta<typeof CenterTitle> = {
  component: CenterTitle,
};
export default meta;

export const Default: StoryObj<typeof CenterTitle> = {
  args: {
    children: 'ログイン',
  },
};
