import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { UndoCard } from '@/components/ak/RecordCards';

const meta: Meta<typeof UndoCard> = {
  title: 'Admin/UndoCard',
  component: UndoCard,
};

export default meta;
type Story = StoryObj<typeof meta>;
const sample = async (): Promise<{ status: string; message: string }> => ({
  status: 'saved',
  message: 'Sample only — nothing was changed.',
});

/** Samples only: the action saves nothing and says so. */
export const Default: Story = {
  render: () => (
    <UndoCard action={sample} initial={{ status: 'idle', message: '' }} id="sb" auditId="sb" />
  ),
};
