import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { DataTable } from '@/components/ak/client';
import { Badge } from '@/components/ak/core';

const meta: Meta<typeof DataTable> = {
  title: 'Admin/DataTable',
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof meta>;
const ROWS = [
  ['Friday Night Jazz', 'The Sample Rooms', 'Fri 23 Oct', 'published'],
  ['Dub Session', 'Example Hall', 'Sat 24 Oct', 'draft'],
  ['Open Mic', 'The Sample Rooms', 'Tue 27 Oct', 'cancelled'],
] as const;

export const Default: Story = {
  render: () => (
    <DataTable
      columns={[
        { key: 'name', label: 'Night', sortable: true, primary: true },
        { key: 'venue', label: 'Venue', sortable: true },
        { key: 'when', label: 'When' },
        { key: 'status', label: 'Status' },
      ]}
      filters={[
        {
          key: 'status',
          name: 'Status',
          label: 'All statuses',
          options: [
            { value: 'published', label: 'On the site' },
            { value: 'draft', label: 'Draft' },
            { value: 'cancelled', label: 'Cancelled' },
          ],
        },
      ]}
      searchLabel="Search nights"
      noun={{ one: 'night', many: 'nights' }}
      rows={ROWS.map(([name, venue, when, status], i) => ({
        id: String(i),
        text: `${name} ${venue}`.toLowerCase(),
        sort: { name, venue },
        filters: { status },
        cells: {
          name: <span className="ak-table__primary">{name}</span>,
          venue,
          when,
          status: (
            <Badge
              dot
              tone={
                status === 'published' ? 'success' : status === 'cancelled' ? 'danger' : 'neutral'
              }
            >
              {status === 'published' ? 'On the site' : status === 'draft' ? 'Draft' : 'Cancelled'}
            </Badge>
          ),
        },
      }))}
    />
  ),
};
export const Empty: Story = {
  render: () => (
    <DataTable
      columns={[{ key: 'name', label: 'Night', primary: true }]}
      rows={[]}
      noun={{ one: 'night', many: 'nights' }}
    />
  ),
};
