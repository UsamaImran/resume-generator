# resume-generator

A TypeScript/Node.js tool that converts AI-generated JSON into beautifully formatted, ATS-safe **Resume** and **Cover Letter** PDFs. Outputs are organized by target company and existing files are never overwritten.

## What it does

You provide a single JSON file describing your profile — contact info, target role, skills, experience, education — and the tool renders it through an EJS/CSS template, then uses Puppeteer (headless Chrome) to export a clean, print-ready PDF. A second, matching generator does the same for cover letters.

The JSON is designed to be produced (or tailored per job posting) by an LLM: fields like `targetCompany`, `targetJobTitle`, and per-skill `highlight` flags make it easy to re-emphasize different parts of your background for different applications without hand-editing a template each time.

**Key features**

- ATS-safe PDF output (clean semantic structure, no fancy graphics that trip up parsers)
- Per-skill highlighting and inline `<strong>` bolding in experience bullets, for tailoring emphasis to a specific job
- Outputs organized by company, with overwrite protection
- Separate, symmetric generators for resumes and cover letters

## Tech stack

- **TypeScript** + `ts-node` — no build step required to run
- **EJS** — HTML templating
- **CSS** — styling for the rendered templates
- **Puppeteer** — renders the HTML template to PDF via headless Chromium

## Requirements

- Node.js (v18+ recommended)
- npm

## Installation

```bash
git clone https://github.com/UsamaImran/resume-generator.git
cd resume-generator
npm install
```

## Usage

### 1. Prepare your input data

Copy the example files and fill in your own details:

```bash
cp input.example.json input.json
cp cover-input.example.json cover-input.json
```

**`input.json`** (resume data) includes:

| Field                                          | Description                                                                                                             |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `name`, `email`, `phone`, `location`           | Contact details                                                                                                         |
| `linkedin`, `portfolio`, `github`, `npm`       | Profile links                                                                                                           |
| `targetCompany`, `targetJobTitle`, `targeting` | The role you're tailoring this resume for                                                                               |
| `headline`, `summary`                          | Top-of-resume positioning                                                                                               |
| `skills`                                       | Array of `{ category, items: [{ name, highlight }] }` — set `highlight: true` to emphasize a skill                      |
| `experience`                                   | Array of `{ title, company, location, date, bullets }` — bullets support inline `<strong>` for bolding key metrics/tech |
| `education`                                    | Free-text education line                                                                                                |
| `npmPackages`                                  | List of published packages to showcase                                                                                  |

**`cover-input.json`** follows a parallel structure tailored for cover letter content — see `cover-input.example.json` for the exact shape.

### 2. Generate your documents

```bash
npm run resume   # generates the resume PDF only
npm run cover    # generates the cover letter PDF only
npm run both     # generates both in one go
```

Each script reads the corresponding JSON input, renders it against its EJS/CSS template, and exports a PDF via Puppeteer. Output files are organized into a folder per `targetCompany`, and the tool won't overwrite an existing file — so you can safely regenerate for a new role without losing previous versions.

## Project structure

```
resume-generator/
├── src/
│   └── generators/
│       ├── resume-generator.ts   # resume generation logic
│       └── cover-generator.ts    # cover letter generation logic
├── input.example.json            # sample resume input schema
├── cover-input.example.json      # sample cover letter input schema
├── tsconfig.json
└── package.json
```

## Tip: pairing with an LLM

Because the input is plain JSON, a natural workflow is to feed a job description plus your master profile to an LLM, have it return a tailored `input.json` (adjusting `summary`, `highlight` flags, and bullet emphasis for that specific posting), then run `npm run both` to get a matched resume + cover letter for that application.
