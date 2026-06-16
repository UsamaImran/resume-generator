Resume Generator

TypeScript Node.js tool that converts AI-generated JSON into beautifully formatted, ATS-safe Resume and Cover Letter PDFs.

Automatically organizes outputs by company name and prevents file overwrites with smart naming.

Features

- AI-First Workflow: Perfect for feeding JSON from ChatGPT, Claude, or any other LLM
- Beautiful, professional and ATS-friendly PDFs
- Automatic company-based folder organization (e.g. Google/, Meta/, Amazon/)
- Smart file naming that avoids overwriting existing files
- Built-in Cover Letter generator
- Customizable EJS templates and CSS styling
- High-quality PDF output using Puppeteer

Quick Start

1.  Clone the repositorygit clone [https://github.com/UsamaImran/resume-generator.git](https://github.com/UsamaImran/resume-generator.git)cd resume-generator
2.  Install dependenciesnpm install
3.  Then edit input.json and cover-input.json with your information.
4.  Generate documentsnpm run resume → Generate only resumenpm run cover → Generate only cover letternpm run both → Generate both resume and cover letter

Project Structureresume-generator/├── src/│ ├── generators/│ ├── templates/│ ├── styles/│ ├── types/│ └── utils/├── input.example.json├── cover-input.example.json├── package.json└── tsconfig.json

Input Format

- Use input.json for resume data
- Use cover-input.json for cover letter data
- Full structure and examples are provided in the .example files

Tech Stack

- TypeScript
- Node.js
- EJS (templating)
- Puppeteer (PDF generation)

CustomizationEdit the templates in src/templates/ and styles in src/styles/ to match your preferred design.

ContributingContributions are welcome! Feel free to improve templates, add new sections, or enhance features.

LicenseMIT License

Made with ❤️ to help you land more interviews faster.
