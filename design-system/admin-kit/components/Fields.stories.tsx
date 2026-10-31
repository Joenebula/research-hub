import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Fields } from '@/components/ak/forms';
import { TextField, TextareaField } from '@/components/ak/forms';

const meta: Meta<typeof Fields> = {
  title: 'Admin/Fields',
  component: Fields,
};

export default meta;
type Story = StoryObj<typeof meta>;

/** A stack of fields with the kit's spacing. */
export const Default: Story = {
  render: () => (
    <Fields>
      <TextField id="sb-f1" label="Night’s name" required />
      <TextareaField id="sb-f2" label="About the night" />
    </Fields>
  ),
};
