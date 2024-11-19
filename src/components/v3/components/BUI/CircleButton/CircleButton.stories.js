import { CircleButton } from "./CircleButton";

export default {
  title: 'CircleButton',
  component: CircleButton,
  argTypes: {
    direction: {
      control: {
        type: 'select',
        options: ['left', 'right']
      }
    }
  },
};

const Template = (args) => <CircleButton {...args} />;

export const Left = Template.bind({});
Left.args = {
  direction: 'left',
};

export const Right = Template.bind({});
Right.args = {
  direction: 'right',
};
