import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FieldRow } from '@/components/ak/forms';
import { TextField } from '@/components/ak/forms';

const meta: Meta<typeof FieldRow> = {
  title: 'Admin/FieldRow',
  component: FieldRow,
};

export default meta;
type Story = StoryObj<typeof meta>;

/** Two fields side by side; they stack on a phone. */
export const Default: Story = {
  render: () => (
    <FieldRow>
      <TextField id="sb-r1" label="Doors" type="time" />
      <TextField id="sb-r2" label="Last entry" type="time" />
    </FieldRow>
  ),
};
