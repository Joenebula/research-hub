import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Toast } from '@/components/ak/client';

const meta: Meta<typeof Toast> = {
  title: 'Admin/Toast',
  component: Toast,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = { render: () => <Toast message="Event saved." /> };
export const Danger: Story = {
  render: () => <Toast message="That did not save. Try again." tone="danger" />,
};
