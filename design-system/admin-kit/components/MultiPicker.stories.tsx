import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MultiPicker } from '@/components/ak/MultiPicker';

const meta: Meta<typeof MultiPicker> = {
  title: 'Admin/MultiPicker',
  component: MultiPicker,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <MultiPicker
      id="sb-picker"
      name="sb-picker"
      label="Genres"
      hint="Type to search; each pick shows as a chip."
      options={[
        { value: 'house', label: 'House' },
        { value: 'techno', label: 'Techno' },
        { value: 'disco', label: 'Disco' },
      ]}
      defaultValue={['house']}
      noun={{ one: 'genre', many: 'genres' }}
    />
  ),
};
export const WithError: Story = {
  render: () => (
    <MultiPicker
      id="sb-picker-err"
      name="sb-picker-err"
      label="Genres"
      error="Pick at least one genre"
      options={[{ value: 'house', label: 'House' }]}
    />
  ),
};
