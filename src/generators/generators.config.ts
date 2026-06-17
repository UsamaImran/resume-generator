import * as fs from "fs";
import * as path from "path";
import { CoverData, ResumeData } from "../types";
import { PDFOptions } from "../utils/pdf-generator";

const resumeData: ResumeData = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../../input.json"), "utf-8"),
);

const coverData: CoverData = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../../cover-input.json"), "utf-8"),
);

export const GENERATOR_CONFIG = {
  RESUME: {
    data: resumeData,
    cssPath: path.resolve(__dirname, "../styles/resume-styles.css"),
    templatePath: path.resolve(__dirname, "../templates/resume-template.ejs"),
    companyName: resumeData.targetCompany,
    jobTitle: resumeData.targetJobTitle,
    suffix: "resume",
    margins: { top: "20px", bottom: "20px", left: "20px", right: "20px" },
  },
  COVER_LETTER: {
    data: coverData,
    cssPath: path.resolve(__dirname, "../styles/cover-styles.css"),
    templatePath: path.resolve(__dirname, "../templates/cover-template.ejs"),
    companyName: coverData.company_name,
    jobTitle: coverData.job_title,
    suffix: "cover",
    margins: { top: "30px", bottom: "30px", left: "30px", right: "30px" },
  },
} satisfies Record<string, PDFOptions>;
