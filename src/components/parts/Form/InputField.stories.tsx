import { Meta, StoryObj } from '@storybook/react';
import { InputField } from 'src/components/parts/Form/InputField';

const meta: Meta<typeof InputField> = {
  component: InputField,
};
export default meta;

export const Default: StoryObj<typeof InputField> = {
  args: {
    error: undefined,
    id: 'name',
    formLabel: '名前',
    type: 'text',
    placeholder: '太郎',
    width: 400,
  },
};
