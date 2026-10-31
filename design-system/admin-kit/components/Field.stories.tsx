import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Field } from '@/components/ak/forms';

const meta: Meta<typeof Field> = {
  title: 'Admin/Field',
  component: Field,
};

export default meta;
type Story = StoryObj<typeof meta>;

/** Field wraps a control you bring yourself. */
export const Default: Story = {
  render: () => (
    <Field id="sb-custom" label="A field around your own control" hint="Field wraps anything.">
      <input id="sb-custom" className="ak-input" defaultValue="Any control" />
    </Field>
  ),
};
export const WithError: Story = {
  render: () => (
    <Field
      id="sb-custom-err"
      label="Ticket link"
      required
      error="Enter a link that starts with https://"
    >
      <input
        id="sb-custom-err"
        className="ak-input"
        defaultValue="tickets.example"
        aria-invalid="true"
      />
    </Field>
  ),
};
