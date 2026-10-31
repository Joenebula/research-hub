import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Outcome } from '@/components/ak/RecordCards';

const meta: Meta<typeof Outcome> = {
  title: 'Admin/Outcome',
  component: Outcome,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Saved: Story = {
  render: () => (
    <Outcome state={{ status: 'saved', message: 'Saved. The change is on the site.' }} />
  ),
};
export const Refused: Story = {
  render: () => (
    <Outcome state={{ status: 'invalid', message: 'Not saved: the name is missing.' }} />
  ),
};
