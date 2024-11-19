import MainSection from "@/app/(app)/sections/MainSection";
import DifferentiationSection from "@/app/(app)/sections/DifferentiationSection";
import SolutionSection from "@/app/(app)/sections/SolutionSection";
import ProgressSection from "@/app/(app)/sections/ProgressSection";
import FourAdvantagesSection from "@/app/(app)/sections/FourAdvantagesSection";
import ReviewSection from "@/app/(app)/sections/ReviewSection";
import IntroductionSection from "@/app/(app)/sections/IntroductionSection";
import PortfolioSection from "@/app/(app)/sections/PortfolioSection";
import LogoSearchSection from "@/app/(app)/sections/LogoSearchSection";
import CreatorSection from "@/app/(app)/sections/CreatorSection";
import FloatingBtn from "@/app/(app)/FloatingBtn";

export default function Home() {
  return (
    <>
      <MainSection />
      <PortfolioSection />
      <IntroductionSection />
      <DifferentiationSection />
      <SolutionSection />
      <ProgressSection />
      <FourAdvantagesSection />
      <div className="hidden">
        <ReviewSection />
      </div>
      <LogoSearchSection />
      <CreatorSection />
      <FloatingBtn />
    </>
  );
}
