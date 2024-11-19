// base64를 ArrayBuffer로 변환
export function convertBase64ToBuffer(base64Text: string) {
  const origin = base64Text.replace(/(data:.+,)/g, "");
  const arraybuffer = Uint8Array.from(atob(origin), (c) => c.charCodeAt(0));
  return arraybuffer;
}

// 파일을 base64로 변환
export function convertFileToBase64(
  file: File,
  callback: (result: string | ArrayBuffer | null) => void
) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    callback(reader.result);
  };
}
