import { useRouter } from "next/navigation";
import { Header } from "./Header";
import { Icon } from "./Icon";

interface AppBarProps {
  title: string;
}

export function AppBar(props: AppBarProps) {
  const { title } = props;
  const router = useRouter();

  return (
    <Header
      className="pc:hidden"
      title={title}
      leading={
        <button onClick={() => router.back()}>
          <Icon name="ArrowLeftIcon" size="lg" className="text-surface-800" />
        </button>
      }
    />
  );
}
