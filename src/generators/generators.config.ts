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

const DEFAULT_TEMPLATE = 1;

function getTemplateNumber(): number {
  const templateArgumentIndex = process.argv.findIndex((argument) =>
    /^--template(?:=|$)/.test(argument),
  );

  if (templateArgumentIndex === -1) {
    return DEFAULT_TEMPLATE;
  }

  const templateArgument = process.argv[templateArgumentIndex];
  const value = templateArgument.includes("=")
    ? templateArgument.split("=", 2)[1]
    : process.argv[templateArgumentIndex + 1];

  const templateNumber = Number(value);

  if (!Number.isInteger(templateNumber) || ![1, 2].includes(templateNumber)) {
    throw new Error("Invalid template. Use --template=1 or --template=2.");
  }

  return templateNumber;
}

const template = getTemplateNumber();
const templateDirectory = `template-${template}`;

export const GENERATOR_CONFIG = {
  RESUME: {
    data: resumeData,
    cssPath: path.resolve(
      __dirname,
      `../styles/${templateDirectory}/resume-styles.css`,
    ),
    templatePath: path.resolve(
      __dirname,
      `../templates/${templateDirectory}/resume-template.ejs`,
    ),
    companyName: resumeData.targetCompany,
    jobTitle: resumeData.targetJobTitle,
    suffix: "resume",
    margins: { top: "20px", bottom: "20px", left: "20px", right: "20px" },
  },
  COVER_LETTER: {
    data: coverData,
    cssPath: path.resolve(
      __dirname,
      `../styles/${templateDirectory}/cover-letter-styles.css`,
    ),
    templatePath: path.resolve(
      __dirname,
      `../templates/${templateDirectory}/cover-template.ejs`,
    ),
    companyName: coverData.company_name,
    jobTitle: coverData.job_title,
    suffix: "cover",
    margins: { top: "30px", bottom: "30px", left: "30px", right: "30px" },
  },
} satisfies Record<string, PDFOptions>;
