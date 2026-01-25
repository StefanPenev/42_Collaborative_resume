import path from 'path';
import fs from 'fs';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function generateResumeFromTemplate(resumeData, outputFileName) {
  const templatePath = path.join(__dirname, '../../public/resume.docx');
  const outputPath = path.join(__dirname, '../../public', outputFileName);

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Resume template not found at: ${templatePath}`);
  }

  const content = fs.readFileSync(templatePath, 'binary');
  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    delimiters: {
      start: '[[',
      end: ']]',
    },
  });
  doc.setData(resumeData);

  try {
    doc.render();
  } catch (error) {
    console.error('Error rendering DOCX:', error);

    if (error.properties && Array.isArray(error.properties.errors)) {
      error.properties.errors.forEach((e, idx) => {
        console.error(`Template error #${idx + 1}:`, {
          id: e.id,
          explanation: e.properties && e.properties.explanation,
          name: e.name,
          message: e.message,
        });
      });
    }
    throw error;
  }

  const buf = doc.getZip().generate({ type: 'nodebuffer' });
  fs.writeFileSync(outputPath, buf);

  return outputPath;
}
