import * as fs from "fs";
import * as path from "path";
import { ResumeData } from "../types";
import { generatePDF } from "../utils/pdf-generator";

// Load data
const data: ResumeData = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../../input.json"), "utf-8"),
);

// Generate PDF
(async () => {
  await generatePDF({
    data,
    cssPath: path.resolve(__dirname, "../styles/resume-styles.css"),
    templatePath: path.resolve(__dirname, "../templates/resume-template.ejs"),
    companyName: data.targetCompany,
    jobTitle: data.targetJobTitle,
    suffix: "resume",
    margins: { top: "20px", bottom: "20px", left: "20px", right: "20px" },
  });
})();
