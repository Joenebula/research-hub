import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SelectField } from '@/components/ak/forms';

const meta: Meta<typeof SelectField> = {
  title: 'Admin/SelectField',
  component: SelectField,
};

export default meta;
type Story = StoryObj<typeof meta>;
const VENUES = [
  { value: 'a', label: 'The Sample Rooms' },
  { value: 'b', label: 'Example Hall' },
];

export const Default: Story = {
  render: () => (
    <SelectField
      id="sb-venue"
      label="Venue"
      required
      placeholder="Choose a venue"
      options={VENUES}
    />
  ),
};
export const WithError: Story = {
  render: () => (
    <SelectField
      id="sb-venue-err"
      label="Venue"
      required
      placeholder="Choose a venue"
      options={VENUES}
      error="Choose the venue"
    />
  ),
};
