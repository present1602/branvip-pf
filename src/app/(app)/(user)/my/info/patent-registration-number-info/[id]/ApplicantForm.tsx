"use client";

import { Label, RadioButton, TextInput } from "@/components/ui";
import { useApplicantStore } from "@/hooks/applicant.store";
import { UserApplicant } from "@prisma/client";
import React from "react";
import { FileUploader } from "./FileUploader";
import { PostCodeSearchButton } from "./PostCodeSearchButton";

interface IProps {
  applicant?: UserApplicant;
}

export function ApplicantForm(props: IProps) {
  const { applicant, isEditing, setApplicant, setIsEditing } =
    useApplicantStore();

  const isCompany = applicant?.type === "COMPANY";

  React.useEffect(() => {
    if (props.applicant) {
      setApplicant(props.applicant);
    } else {
      setIsEditing(true);
    }
  }, [props.applicant, setApplicant, setIsEditing]);

  return (
    <fieldset
      disabled={!isEditing}
      className="grid gap-6 rounded-md p-4"
    >
      <Label label="등록 특허 고객번호 수정">
        <div className="flex gap-6">
          <label
            htmlFor="type_i"
            className="flex items-center gap-2 text-sm text-surface-900"
          >
            <span>개인</span>
            <RadioButton
              id="type_i"
              name="type"
              value="INDIVIDUAL"
              onChange={() =>
                setApplicant({ ...applicant, type: "INDIVIDUAL" })
              }
              checked={applicant?.type === "INDIVIDUAL"}
            />
          </label>

          <label
            htmlFor="type_c"
            className="flex items-center gap-2 text-sm text-surface-900"
          >
            <span>법인</span>
            <RadioButton
              id="type_c"
              name="type"
              value="COMPANY"
              onChange={() => setApplicant({ ...applicant, type: "COMPANY" })}
              checked={applicant?.type === "COMPANY"}
            />
          </label>
        </div>
      </Label>

      <Label
        label="특허고객번호"
      >
        <TextInput
          placeholder="숫자만 입력해주세요."
          maxLength={20}
          value={applicant?.applicantNumber || ""}
          onChange={(e) =>
            setApplicant({ ...applicant, applicantNumber: e.target.value })
          }
        />
      </Label>

      <Label
        label={isCompany ? "회사명" : "이름"}
      >
        <div className="grid grid-cols-2 gap-2">
          <TextInput
            placeholder={isCompany ? "주식회사 브랜빕" : "홍길동"}
            value={applicant?.name || ""}
            onChange={(e) =>
              setApplicant({ ...applicant, name: e.target.value })
            }
          />
          <TextInput
            placeholder={isCompany ? "Branvip Corp." : "HONG, Gil Dong"}
            value={applicant?.nameEn || ""}
            onChange={(e) =>
              setApplicant({ ...applicant, nameEn: e.target.value })
            }
          />
        </div>
      </Label>

      <Label
        label={isCompany ? "사업자등록번호, 법인등록번호" : "주민등록번호"}
      >
        <TextInput
          placeholder={
            isCompany ? "000-00-00000, 230101-1234567" : "230101-1234567"
          }
          maxLength={15}
          value={applicant?.registerNumber || ""}
          onChange={(e) =>
            setApplicant({ ...applicant, registerNumber: e.target.value })
          }
        />
      </Label>

      <Label label="이메일">
        <TextInput
          placeholder="name@company.com"
          value={applicant?.email || ''}
          onChange={(e) =>
            setApplicant({ ...applicant, email: e.target.value })
          }
        />
      </Label>

      <Label label="전화번호">
        <TextInput
          placeholder="010-1234-5678"
          value={applicant?.phoneNumber || ''}
          onChange={(e) =>
            setApplicant({ ...applicant, phoneNumber: e.target.value })
          }
        />
      </Label>

      <Label label={isCompany ? "등기부상 주소" : "주민등록상 주소"}>
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <TextInput
              placeholder="우편번호"
              groupClassName="flex-1"
              value={applicant?.addressPostCode || ""}
              disabled
            />
            <PostCodeSearchButton />
          </div>

          <TextInput
            placeholder="서울특별시 강남구 테헤란로 427"
            value={applicant?.address || ""}
            disabled
          />

          {applicant?.addressPostCode && (
            <TextInput
              placeholder="상세 주소를 입력해주세요."
              value={applicant?.addressDetail || ""}
              onChange={(e) =>
                setApplicant({ ...applicant, addressDetail: e.target.value })
              }
            />
          )}
        </div>
      </Label>

      <Label label="서명 또는 인감 이미지">
        <FileUploader />
      </Label>
    </fieldset>
  );
}
