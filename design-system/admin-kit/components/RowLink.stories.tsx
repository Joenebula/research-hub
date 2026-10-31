import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RowLink } from '@/components/ak/client';

const meta: Meta<typeof RowLink> = {
  title: 'Admin/RowLink',
  component: RowLink,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ul className="ak-rows__list" aria-label="Events">
      <li className="ak-rows__item">
        <RowLink href="/admin/events/1">Friday Night Jazz</RowLink>
      </li>
      <li className="ak-rows__item">
        <RowLink href="/admin/events/2">Dub Session</RowLink>
      </li>
    </ul>
  ),
};
