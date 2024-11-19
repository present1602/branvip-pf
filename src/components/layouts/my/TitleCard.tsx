
interface IProps {
  title: string
}

export function TitleCard({title}:IProps) {
  
  return (
    <div className={`w-full bg-white border border-2xl border-surface-100 rounded-lg py-6 px-6 b-6 heading1 mb-6`}>
        {title}
    </div>
  );
}
 