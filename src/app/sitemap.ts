import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const defaultUrl = "https://branvip.com";
  const paths = ["/", "/moods", "/pricing", "/trademarks"];

  const sitemaps = paths.map((path) => {
    return {
      url: defaultUrl + path,
      lastModified: new Date(),
    };
  });
  return sitemaps;
}