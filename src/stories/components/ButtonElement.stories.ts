import type { Meta, StoryObj } from '@storybook/react'
import { withActions } from '@storybook/addon-actions/decorator'
import { ButtonElement } from '../../components/ButtonElement'


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/ButtonElement',
  component: ButtonElement,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'string',
      description: 'Overwritten description',
    },
    callback: {
      control: 'function',
      description: 'Overwritten description',
    }
  },
  parameters: {
    actions: {
      handles: ['click'],
    },
  },
  decorators: [withActions],
} satisfies Meta<typeof ButtonElement>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    label: "Button",
    callback: () => { }
  },
}
