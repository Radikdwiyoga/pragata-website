import fs from "fs";
import path from "path";
import { siteContent as defaultContent, type SiteContent } from "../content/site";

const DATA_FILE = path.join(process.cwd(), "src", "data", "site-content.json");

export function getSiteContent(): SiteContent {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      // Ensure merged with default structure in case new fields were added
      return {
        ...defaultContent,
        ...parsed,
        hero: {
          ...defaultContent.hero,
          ...(parsed.hero || {}),
          partners: parsed.hero?.partners || defaultContent.hero.partners || [],
        },
        services: { ...defaultContent.services, ...(parsed.services || {}) },
        projects: { ...defaultContent.projects, ...(parsed.projects || {}) },
        whyUs: { ...defaultContent.whyUs, ...(parsed.whyUs || {}) },
        news: { ...defaultContent.news, ...(parsed.news || {}) },
        contact: { ...defaultContent.contact, ...(parsed.contact || {}) },
        footer: { ...defaultContent.footer, ...(parsed.footer || {}) },
      };
    }
  } catch (error) {
    console.error("Error reading site-content.json, using default content:", error);
  }
  return defaultContent;
}

export function saveSiteContent(content: SiteContent): void {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(content, null, 2), "utf-8");
}

export function resetSiteContent(): SiteContent {
  saveSiteContent(defaultContent);
  return defaultContent;
}
