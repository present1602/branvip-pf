import useReviewCardIndex from "@/hooks/cardIndex.store";

interface IProps{
  total:number,
  activeIndex:number,
}
const DotPagination = ({ total, activeIndex } : IProps) => {
  const { offset, setOffset } = useReviewCardIndex();

  return (
    <div className="flex space-x-2">
      {Array.from({ length: total }, (_, index) => (
        <button
          key={index}
          className={`h-2 w-2 rounded-full ${index === offset ? 'bg-blue-500' : 'bg-gray-300'}`}
          onClick={() => setOffset(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default DotPagination;