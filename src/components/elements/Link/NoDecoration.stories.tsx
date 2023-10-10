import type { Meta, StoryObj } from '@storybook/react';
import { NoDecorationLink } from 'src/components/elements/Link/NoDecorationLink';

const meta: Meta<typeof NoDecorationLink> = {
  component: NoDecorationLink,
};
export default meta;

export const Default: StoryObj<typeof NoDecorationLink> = {
  args: {
    children: 'ダッシュボード',
    href: '/dashboard',
  },
};
