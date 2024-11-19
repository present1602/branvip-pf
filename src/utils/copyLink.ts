type CopyLinkType = {
  title?: string;
  description?: string;
  callback?: () => void;
};
export function copyLink(url: string, options?: CopyLinkType) {
  const { title, description } = options || {};

  if (navigator.share) {
    navigator
      .share({
        title: title,
        text: description,
        url: url,
      })
      .catch((error) => console.log("Error sharing", error));
  } else {
    navigator.clipboard.writeText(url).then(() => {
      alert("링크가 복사되었어요!");
    });
  }
}
