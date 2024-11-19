import { CreateInquiryForm } from "@/app/(app)/inquiry/CreateInquiryForm";

export default async function Inquiry() {

  return (
      <div className="container md:flex md:gap-10">
        <div className="grid gap-6 py-6 md:flex-1 md:gap-8 md:py-10">
          <h1 className="text-2xl font-bold md:text-4xl">문의 하기</h1>
          <div className="h-px w-full bg-surface-100" />
          <CreateInquiryForm/>
        </div>
      </div>
  );

}