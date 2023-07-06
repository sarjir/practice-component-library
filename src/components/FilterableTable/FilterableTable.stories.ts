import type { Meta, StoryObj } from '@storybook/react';
import FilterableTable from '.';
import employeeData from "../../data";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof FilterableTable> = {
  title: 'Table',
  component: FilterableTable,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FilterableTable>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {  args: {
  data: employeeData,
},};