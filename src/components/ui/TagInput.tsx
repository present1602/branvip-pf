import { Tag } from "./Tag";

interface TagInputProps {
  tagList: string[];
  placeholder?: string;
  maxTagCount?: number;
  onChange: (updatedList: string[]) => void;
}

export function TagInput(props: TagInputProps) {
  const { tagList, placeholder, maxTagCount, onChange } = props;

  const handleRemove = (index: number) => {
    const newTags = tagList.filter((_, i) => index !== i);
    onChange(newTags);
  };
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    // 콤마 입력 시 태그 추가
    if (e.key === ",") {
      const value = e.currentTarget.value;
      const tag = value.substring(0, value.length - 1);
      e.currentTarget.value = "";
      // 정해진 개수 이상 입력 방지
      if (maxTagCount && tagList.length >= maxTagCount) return;
      // 중복 방지
      if (tagList.includes(value)) return;
      // 빈 문자열 방지
      if (tag === "") return;
      onChange([...tagList, tag]);
    }
  };

  return (
    <label htmlFor="editor">
      <div className="flex flex-col">
        <div className="min-h-[150px] rounded-2xl bg-white p-4 text-surface-900 ring-1 ring-inset ring-surface-200">
          <div className="flex flex-wrap gap-2">
            {tagList.map((tag, i) => (
              <Tag key={tag} onRemove={() => handleRemove(i)}>
                {tag}
              </Tag>
            ))}

            <input
              id="editor"
              className="w-min bg-transparent"
              placeholder={tagList.length === 0 ? placeholder : ""}
              type="text"
              onKeyUp={handleKeyUp}
            />
          </div>
        </div>
        {maxTagCount && (
          <div className="mt-2 text-right text-sm text-surface-400">
            {tagList.length} / {maxTagCount}
          </div>
        )}
      </div>
    </label>
  );
}
