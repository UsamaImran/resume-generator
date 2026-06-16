import puppeteer from "puppeteer";
import * as fs from "fs";
import * as path from "path";
import ejs from "ejs";
import { ResumeData } from "../types";
import {
  buildFileName,
  getOutputDirectory,
  getUniqueFilePath,
} from "../utils/file-helpers";

// Load data
const data: ResumeData = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../../input.json"), "utf-8"),
);

// Load CSS: SHARED + RESUME-SPECIFIC
const sharedStyles = fs.readFileSync(
  path.resolve(__dirname, "../styles/shared-styles.css"),
  "utf-8",
);
const specificStyles = fs.readFileSync(
  path.resolve(__dirname, "../styles/resume-styles.css"),
  "utf-8",
);
const styles = sharedStyles + "\n" + specificStyles;

// Load and render EJS template
const templatePath = path.resolve(
  __dirname,
  "../templates/resume-template.ejs",
);
const template = fs.readFileSync(templatePath, "utf-8");

// Pass data + styles to EJS, WITH filename for include resolution
const context = { ...data, styles };
const html = ejs.render(template, context, { filename: templatePath });

// Generate PDF
(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  await page.setContent(html, {
    waitUntil: "domcontentloaded",
    timeout: 0,
  });

  // Determine the output directory (company name or 'general')
  const outputDirName = getOutputDirectory(data.targetCompany);
  const outputDir = path.resolve(__dirname, "../../", outputDirName);

  // Create the directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Build the filename and full path
  const fileName = buildFileName(
    data.targetCompany,
    data.targetJobTitle,
    "resume",
  );
  let outputPath = path.resolve(outputDir, fileName);
  outputPath = getUniqueFilePath(outputPath);

  await page.pdf({
    path: outputPath,
    format: "A4",
    margin: { top: "20px", bottom: "20px", left: "20px", right: "20px" },
    printBackground: true,
  });

  await browser.close();
  console.log(
    `✅ ${path.basename(outputPath)} generated successfully in ${outputDirName}/`,
  );
})();
