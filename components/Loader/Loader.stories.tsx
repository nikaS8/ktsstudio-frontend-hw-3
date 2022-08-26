import React from "react";

import { ComponentStory } from "@storybook/react";

import { Loader, LoaderSize } from "./Loader";

export default {
  title: "Loader",
  component: Loader,
};

const Template: ComponentStory<typeof Loader> = (...args) => (
  <Loader size={LoaderSize.s} {...args}></Loader>
);

// export const Small = Template.bind({});
// Small.args = {
//     size: 's',
// };
