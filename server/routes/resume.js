import { generateResumeFromTemplate } from '../utils/generateResumeFromTemplate.js';
import { resumeSchema } from '../schemas/resume.schema.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function (fastify, opts) {
  fastify.post('/api/resume', { schema: resumeSchema }, async (request, reply) => {
    const data = request.body;

    const resumeData = {
      fullName: data.fullName,
      email: data.email,
      location: data.location,
      title: data.title,
      summary: data.summary || '',
      education: data.education || '',
      experience: data.experience || '',
      frontend: data.frontend || '',
      backend: data.backend || '',
      tools: data.tools || '',
      projects: data.projects || '',
      availability: data.availability || '',
      remoteExperience: data.remoteExperience || '',
      github: data.github || '',
      linkedin: data.linkedin || '',
      softSkills: data.softSkills || '',
    };

    const fileName = `resume-${Date.now()}.docx`;

    try {
      const outputPath = generateResumeFromTemplate(resumeData, fileName);

      const publicUrl = `/public/${path.basename(outputPath)}`;
      return reply.send({ url: publicUrl });
    } catch (err) {
      request.log.error(err);
      return reply.code(500).send({
        statusCode: 500,
        error: 'Internal Server Error',
        message: err.message || 'Failed to generate resume',
      });
    }
  });
}
