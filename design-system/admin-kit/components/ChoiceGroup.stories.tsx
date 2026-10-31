import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ChoiceGroup } from '@/components/ak/forms';

const meta: Meta<typeof ChoiceGroup> = {
  title: 'Admin/ChoiceGroup',
  component: ChoiceGroup,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Radio: Story = {
  render: () => (
    <ChoiceGroup
      id="sb-price"
      name="price"
      type="radio"
      label="Entry"
      options={[
        { value: 'free', label: 'Free' },
        { value: 'paid', label: 'Paid' },
        { value: 'door', label: 'Pay on the door' },
      ]}
      defaultValue="paid"
    />
  ),
};
export const CheckboxesStacked: Story = {
  render: () => (
    <ChoiceGroup
      id="sb-shows"
      name="shows"
      type="checkbox"
      label="Show this advert on"
      stack
      options={[
        { value: 'home', label: 'The front page', description: 'Top of the page, on every visit.' },
        { value: 'city', label: 'City pages', description: 'Only in the cities you pick.' },
      ]}
      defaultValue={['home']}
    />
  ),
};
