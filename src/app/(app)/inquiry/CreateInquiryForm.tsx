"use client";

import React, { useState, useTransition } from "react";
import { Button, Label, TextArea, TextInput } from "@/components/ui";
import { toast } from "@/components/ui/use-toast";
import { createInquiry } from "@/actions/createInquiry.action";
import { CheckboxLite } from "@/components/ui/CheckboxLite";
import { CheckboxInquiry } from "@/components/ui/CheckboxInquiry";
import { useRouter } from "next/navigation";
import { sendEmailInquiry } from "@/utils/send-email";
import { IMailData } from "@/pages/api/send-email";

type InquiryType =
  | "상표 출원"
  | "디자인 출원"
  | "디자인 의뢰"
  | "네이밍 의뢰"
  | "기타 문의";

interface CheckboxOption {
  value: InquiryType;
  label: string;
}

const checkboxOptions: CheckboxOption[] = [
  { value: "상표 출원", label: "상표 출원" },
  { value: "디자인 출원", label: "디자인 출원" },
  { value: "디자인 의뢰", label: "디자인 의뢰" },
  { value: "네이밍 의뢰", label: "네이밍 의뢰" },
  { value: "기타 문의", label: "기타 문의" },
];
export function CreateInquiryForm() {
  const router = useRouter();

  const [creating, startCreating] = useTransition();
  const [inquiry, setInquiry] = useState({
    type: "",
    title: "",
    name: "",
    email: "",
    content: "",
    agree: false,
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    field: keyof typeof inquiry
  ) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    setInquiry((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = () => {
    setInquiry((prev) => ({ ...prev, agree: !prev.agree }));
  };

  const handleClick = async () => {
    if (!inquiry.agree || Object.values(inquiry).some((v) => v === "")) {
      toast({
        title: "모든 필드를 채우고 개인정보 처리방침에 동의해주세요.",
        variant: "destructive",
      });
      return;
    }

    startCreating(async () => {
      try {
        const newInquiry = await createInquiry(inquiry);
        if (newInquiry) {
          const emailData: IMailData = {
            cc: undefined,
            to: inquiry.email,
            subject: inquiry.title,
            text: inquiry.content,
            name: inquiry.name,
            type: inquiry.type,
          };
          try {
            const mailResult = await sendEmailInquiry(emailData);
            console.log(mailResult);
          } catch (err) {
            console.error(err);
          }

          toast({
            title: "문의가 성공적으로 등록되었습니다.",
            variant: "success",
          });
        }

        router.push("/");
      } catch (error) {
        toast({
          title: "문의 등록에 실패했습니다.",
          variant: "destructive",
        });
      }
    });

    if (creating) return;
  };

  return (
    <div>
      <div className="grid gap-6 md:gap-8">
        <Label label="문의유형">
          <div className="grid w-80 grid-cols-3 grid-rows-2 gap-3 pc:flex pc:w-auto">
            {checkboxOptions.map((option) => (
              <CheckboxInquiry
                key={option.value}
                value={option.value}
                checked={inquiry.type === option.value}
                onClick={(e) => handleChange(e, "type")}
              />
            ))}
          </div>
        </Label>

        <Label label="문의제목">
          <TextInput
            placeholder="문의드립니다"
            onChange={(e) => handleChange(e, "title")}
          />
        </Label>

        <Label label="이름/닉네임">
          <TextInput
            placeholder="홍길동"
            onChange={(e) => handleChange(e, "name")}
          />
        </Label>

        <Label label="이메일">
          <TextInput
            id="email"
            name="email"
            autoComplete="email"
            placeholder="branvip@branvip.com"
            type="email"
            required
            onChange={(e) => handleChange(e, "email")}
          />
        </Label>

        <Label label="문의내용">
          <TextArea
            placeholder="글자 제한 300자"
            maxLength={300}
            onChange={(e) => handleChange(e, "content")}
          />
          <div className="flex justify-end">
            <span className="text-gray-400">{inquiry.content.length}/300</span>
          </div>
        </Label>
      </div>

      <div className="mt-10 grid gap-2">
        <h2 className="text-lg font-bold text-surface-900 md:text-2xl">
          개인정보이용동의
        </h2>
        <p className="font-medium text-surface-500 pc:text-lg">
          수집하는 개인정보 항목: 이메일 주소 개인정보는 문의 접수, 고객 불편
          사항 확인 및 처리 결과 회신에 이용되며 전자상거래법 등 관련 법령에
          따라 3년간 보관됩니다. 이용자는 본 동의를 거부할 수 있으나, 미동의 시
          문의 접수가 불가능합니다.
        </p>
        <div className="flex gap-2">
          <CheckboxLite
            // className="checked:bg-primary-200 checked:ring-0 hover:bg-primary-50 checked:hover:bg-primary-600"
            onChange={handleCheckboxChange}
          />
          <p className="font-medium text-surface-500 md:text-lg">동의합니다.</p>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <Button onClick={handleClick} size="md">
          {creating ? "문의 중..." : "확인"}
        </Button>
      </div>
    </div>
  );
}
