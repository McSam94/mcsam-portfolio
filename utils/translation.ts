import path from "path";
import fs from "fs";

export const getTranslationContent = (
  locale: string
): Map<string, string> | null => {
  if (!locale) return null;
  const dir = path.join(process.cwd(), "public", "static");
  const filePath = `${dir}/${locale}.json`;
  const buffer = fs.readFileSync(filePath);
  return JSON.parse(buffer.toString());
};
