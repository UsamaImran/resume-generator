import * as fs from "fs";
import * as path from "path";

export function sanitizeFilename(str: string): string {
  return str.replace(/[^a-zA-Z0-9_\-]/g, "_").replace(/_+/g, "_");
}

export function buildFileName(
  company: string,
  jobTitle: string,
  suffix: string,
): string {
  const base = "Usama_imran";
  const parts = [base];

  const cleanCompany =
    company && company.trim() !== "" && company !== "Your Company"
      ? sanitizeFilename(company.trim())
      : null;
  const cleanJob =
    jobTitle && jobTitle.trim() !== ""
      ? sanitizeFilename(jobTitle.trim())
      : null;

  if (cleanCompany) parts.push(cleanCompany);
  if (cleanJob) parts.push(cleanJob);
  parts.push(suffix);

  return parts.join("_") + ".pdf";
}

// NEW: Determines the output folder based on company name
export function getOutputDirectory(company: string): string {
  const cleanCompany =
    company && company.trim() !== "" && company !== "Your Company"
      ? sanitizeFilename(company.trim())
      : null;
  return cleanCompany || "general";
}

export function getUniqueFilePath(fullPath: string): string {
  const dir = path.dirname(fullPath);
  const ext = path.extname(fullPath);
  const baseName = path.basename(fullPath, ext);

  if (!fs.existsSync(fullPath)) {
    return fullPath;
  }

  let counter = 1;
  let newPath = path.join(dir, `${baseName}_${counter}${ext}`);
  while (fs.existsSync(newPath)) {
    counter++;
    newPath = path.join(dir, `${baseName}_${counter}${ext}`);
  }
  return newPath;
}
