import type { Meta, StoryObj } from '@storybook/react';
import FilterableTable from '.';
import employeeData from "../../data";

const columns = [
  {
    field: "id",
    displayName: "ID",
  },
  {
    field: "Name",
    displayName: "Employee name",
  },
  {
    field: "Website",
    displayName: "Website",
  },
  {
    field: "Rating",
    displayName: "Rating",
  },
  {
    field: "Email",
    displayName: "Email",
  },
  {
    field: "Phone",
    displayName: "Phone",
  },
  {
    field: "Username",
    displayName: "Username",
  },
  {
    field: "City",
    displayName: "City",
  },
  {
    field: "Country",
    displayName: "Country",
  },
  {
    field: "Company",
    displayName: "Company",
  },
  {
    field: "Position",
    displayName: "Position",
  },
];

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
  rows: employeeData,
  columns: columns
},};