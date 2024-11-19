import TabItem from "./TabItem";

interface TabBarProps {
  tabList: {
    label: string;
    caption?: string;
  }[];
  selectedTab: number;
  onClickTab: (index: React.SetStateAction<number>) => void;
}

export default function TabBar(props: TabBarProps) {
  const { tabList, selectedTab, onClickTab } = props;

  return (
    <div className="relative z-0 overflow-scroll bg-white">
      <div className="flex max-pc:justify-stretch">
        {tabList.map((v, i) => {
          return (
            <TabItem
              key={v.label}
              label={v.label}
              caption={v.caption}
              selected={selectedTab === i}
              onClick={() => onClickTab(i)}
            />
          );
        })}
      </div>
      <hr className="absolute inset-x-0 bottom-0 -z-10 border-surface-300" />
    </div>
  );
}
