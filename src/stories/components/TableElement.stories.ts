import type { Meta, StoryObj } from '@storybook/react'
import { withActions } from '@storybook/addon-actions/decorator'
import TableElement from '../../components/TableElement'


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/TableElement',
  component: TableElement,
  tags: ['autodocs'],
  argTypes: {
    headers: {
      control: 'object',
      description: 'Overwritten description',
    },
    data: {
      control: 'object',
      description: 'Overwritten description',
    }
  },
  decorators: [withActions],
} satisfies Meta<typeof TableElement>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    headers: ["header 1", "header 2"],
    data: [{ attribute1: "row 1", attribute2: "row 2" }]
  },
}
