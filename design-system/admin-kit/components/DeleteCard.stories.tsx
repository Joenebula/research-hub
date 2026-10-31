import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { DeleteCard } from '@/components/ak/RecordCards';

const meta: Meta<typeof DeleteCard> = {
  title: 'Admin/DeleteCard',
  component: DeleteCard,
};

export default meta;
type Story = StoryObj<typeof meta>;
const sample = async (): Promise<{ status: string; message: string }> => ({
  status: 'saved',
  message: 'Sample only — nothing was changed.',
});

export const Default: Story = {
  render: () => (
    <DeleteCard
      action={sample}
      initial={{ status: 'idle', message: '' }}
      id="sb"
      name="Sample night"
      what="event"
      blocked={null}
      instead="Make it a draft instead"
    />
  ),
};
