import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ErrorSummary } from '@/components/ak/client';
import { TextField } from '@/components/ak/forms';

const meta: Meta<typeof ErrorSummary> = {
  title: 'Admin/ErrorSummary',
  component: ErrorSummary,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const OneProblem: Story = {
  render: () => <ErrorSummary errors={[{ id: 'sb-es-1', message: 'Enter the night’s name' }]} />,
};
/** Each link moves focus to its field, so the fields are on the page too. */
export const SeveralProblems: Story = {
  render: () => (
    <div className="ak-stack">
      <ErrorSummary
        errors={[
          { id: 'sb-es-a', message: 'Enter the night’s name' },
          { id: 'sb-es-b', message: 'Enter the date and time' },
        ]}
      />
      <TextField id="sb-es-a" label="Night’s name" required error="Enter the night’s name" />
      <TextField
        id="sb-es-b"
        label="Date and time"
        type="datetime-local"
        required
        error="Enter the date and time"
      />
    </div>
  ),
};
