import { Button } from "../../../../../../stories/Button";

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    size: {
      options: ['L','M','S'],
      control:{
        type: 'radio',
      }
    },
    type: {
      options: ['default', 'green', 'white', 'readonly', 'ai'], // 버튼 타입 옵션
      control: {
        type: 'radio',
      },
    },
    fix: {
      options: ['true,false'], // 버튼 타입 옵션
      control: {
        type: 'boolean', // fix prop을 boolean으로 설정
      },
    },
  },
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  fix: true, // fix prop을 true로 설정
  size: 'L', // M 사이즈로 설정
  type: 'green', // default 타입으로 설정
};