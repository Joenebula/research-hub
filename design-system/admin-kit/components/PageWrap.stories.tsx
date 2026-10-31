import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PageWrap } from '@/components/ak/core';
import { PageHeader, Page, Card } from '@/components/ak/core';

const meta: Meta<typeof PageWrap> = {
  title: 'Admin/PageWrap',
  component: PageWrap,
};

export default meta;
type Story = StoryObj<typeof meta>;

/** Every admin page: PageWrap → PageHeader → Page → Card(s). */
export const Frame: Story = {
  render: () => (
    <PageWrap>
      <PageHeader eyebrow="Listings" title="Events" description="Every night on the site." />
      <Page>
        <Card title="Basics">
          <p className="ak-text">A card on the page.</p>
        </Card>
      </Page>
    </PageWrap>
  ),
};
