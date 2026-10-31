import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Checkbox } from '@/components/ak/forms';

const meta: Meta<typeof Checkbox> = {
  title: 'Admin/Checkbox',
  component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Checkbox
      id="sb-pub"
      name="pub"
      label="Put it on the site"
      description="Leave unticked to save it as a draft."
    />
  ),
};
export const Checked: Story = {
  render: () => (
    <Checkbox id="sb-feat" name="feat" label="Feature it on the front page" defaultChecked />
  ),
};
export const WithError: Story = {
  render: () => (
    <Checkbox
      id="sb-terms"
      name="terms"
      label="The promoter agreed to the terms"
      error="Tick to confirm"
    />
  ),
};
