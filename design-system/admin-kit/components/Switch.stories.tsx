import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Switch } from '@/components/ak/forms';

const meta: Meta<typeof Switch> = {
  title: 'Admin/Switch',
  component: Switch,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const On: Story = {
  render: () => <Switch id="sb-sw-on" label="Adverts on the site" defaultChecked />,
};
export const Off: Story = { render: () => <Switch id="sb-sw-off" label="Adverts on the site" /> };
