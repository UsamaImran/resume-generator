import puppeteer from "puppeteer";
import * as fs from "fs";
import * as path from "path";
import ejs from "ejs";
import {
  buildFileName,
  getOutputDirectory,
  getUniqueFilePath,
} from "./file-helpers";

export interface PDFOptions {
  /** Input JSON data (ResumeData or CoverData) */
  data: any;
  /** Path to the CSS file (resume-styles.css or cover-styles.css) */
  cssPath: string;
  /** Path to the EJS template file */
  templatePath: string;
  /** Company name for folder naming */
  companyName: string;
  /** Job title for filename */
  jobTitle: string;
  /** Suffix: 'resume' or 'cover' */
  suffix: "resume" | "cover";
  /** Page margins (default: resume margins) */
  margins?: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
}

export async function generatePDF(options: PDFOptions): Promise<string> {
  const {
    data,
    cssPath,
    templatePath,
    companyName,
    jobTitle,
    suffix,
    margins = { top: "20px", bottom: "20px", left: "20px", right: "20px" },
  } = options;

  // 1. Load shared CSS
  const sharedStylesPath = path.resolve(
    __dirname,
    "../styles/shared-styles.css",
  );
  const sharedStyles = fs.readFileSync(sharedStylesPath, "utf-8");

  // 2. Load specific CSS
  const specificStyles = fs.readFileSync(cssPath, "utf-8");
  const styles = sharedStyles + "\n" + specificStyles;

  // 3. Load and render EJS template
  const template = fs.readFileSync(templatePath, "utf-8");
  const context = { ...data, styles };
  const html = ejs.render(template, context, { filename: templatePath });

  // 4. Launch Puppeteer
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  // 5. Set content
  await page.setContent(html, {
    waitUntil: "domcontentloaded",
    timeout: 0,
  });

  // 6. Determine output directory and build full path
  const outputDirName = getOutputDirectory(companyName);
  const outputDir = path.resolve(__dirname, "../../", outputDirName);

  // 7. Create directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 8. Build filename and ensure uniqueness
  const fileName = buildFileName(companyName, jobTitle, suffix);
  let outputPath = path.resolve(outputDir, fileName);
  outputPath = getUniqueFilePath(outputPath);

  // 9. Generate PDF
  await page.pdf({
    path: outputPath,
    format: "A4",
    margin: {
      top: margins.top || "20px",
      bottom: margins.bottom || "20px",
      left: margins.left || "20px",
      right: margins.right || "20px",
    },
    printBackground: true,
  });

  // 10. Clean up
  await browser.close();

  console.log(
    `✅ ${path.basename(outputPath)} generated successfully in ${outputDirName}/`,
  );
  return outputPath;
}
