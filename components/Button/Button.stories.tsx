import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button, ButtonProps, ButtonColor } from "./Button";

export default {
  title: "Button",
  component: Button,
  argTypes: {
    children: { table: { category: "Text" } },
    onClick: { table: { category: "Events" } },
  },
};

const Template: ComponentStory<typeof Button> = ({ children, ...args }) => (
  <Button {...args}>{children}</Button>
);

export const Primary = Template.bind({});
Primary.args = {
  children: "Заказать",
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: "Secondary",
  color: ButtonColor.secondary,
  onClick: () => console.log("Письмо отправлено"),
};
