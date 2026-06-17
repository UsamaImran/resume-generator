import { generatePDF } from "../utils/pdf-generator";
import { GENERATOR_CONFIG } from "./generators.config";

(async () => {
  await generatePDF(GENERATOR_CONFIG.RESUME);
})();
