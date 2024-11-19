import StatChip from "./StatChip";


export default {
  title: 'Stat Chip',
  component: StatChip,
  argTypes: {
    size: {
      options: ['l','m'],
      control:{
        type: 'radio',
      }
    },
    stat: {
      options: ['등록', '공고', '출원', '기타', '거절'], // 버튼 타입 옵션
      control: {
        type: 'radio',
      },
    },
  },
};

const Template = (args) => <StatChip {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: 'l', // M 사이즈로 설정
  stat: '등록', // default 타입으로 설정
};