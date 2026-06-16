import * as fs from "fs";
import * as path from "path";
import { CoverData } from "../types";
import { generatePDF } from "../utils/pdf-generator";

// Load data
const data: CoverData = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../../cover-input.json"), "utf-8"),
);

// Generate PDF
(async () => {
  await generatePDF({
    data,
    cssPath: path.resolve(__dirname, "../styles/cover-styles.css"),
    templatePath: path.resolve(__dirname, "../templates/cover-template.ejs"),
    companyName: data.company_name,
    jobTitle: data.job_title,
    suffix: "cover",
    margins: { top: "30px", bottom: "30px", left: "30px", right: "30px" },
  });
})();
