"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url,
).toString();

export function PdfViewer({ pdfUrl = "" }) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1); // 첫 번째 페이지로 시작

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  useEffect(() => {
    console.log("viwer mounted!");
    if (!pdfUrl) return;

    console.log("detect pdfUrl change");

    setLoading(true);

    const xhr = new XMLHttpRequest();
    xhr.open("GET", `/api/pdf?url=${pdfUrl}`);
    xhr.responseType = "blob";

    xhr.onload = function(this: XMLHttpRequest) {
      setLoading(false);
      console.log("xhr loaded", this.response);

      if (this.status === 200) {
        console.log("success!!");
        setFile(this.response);
      }
    };

    xhr.send();
  }, [pdfUrl]);

  return (
    <div className="max-h-[600px] overflow-y-auto">
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        noData="PDF 파일을 불러오는 중입니다."
        loading="PDF 파일을 불러오는 중입니다."
        className="xl:w-full"
      >
        {
          Array.from(new Array(numPages), (el, index) => (
            <div  key={`page_${index + 1}`}>
              <Page
                _className={"xl:hidden"}
                pageNumber={index + 1}
                className="xl:w-full w-[400px]"
                scale={0.6}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
              <Page
                _className={"xl:inline hidden"}
                pageNumber={index + 1}
                className="xl:w-full w-[400px]"
                scale={1.4}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              /></div>
          )) // 페이지를 렌더링
        }
      </Document>
    </div>
  );
}
