import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FileField } from '@/components/ak/forms';

const meta: Meta<typeof FileField> = {
  title: 'Admin/FileField',
  component: FileField,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <FileField id="sb-poster" label="Poster" hint="JPEG, PNG or WebP, up to 5 MB." />,
};
export const WithError: Story = {
  render: () => <FileField id="sb-poster-err" label="Poster" error="That file is over 5 MB" />,
};
