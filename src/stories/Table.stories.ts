import type { Meta, StoryObj } from '@storybook/react';

import Table from '../components/Table';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Table> = {
  title: 'Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {};