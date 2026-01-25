export const resumeSchema = {
  body: {
    type: 'object',
    required: ['fullName', 'email', 'title'],
    properties: {
      fullName: { type: 'string' },
      email: { type: 'string' },
      location: { type: 'string' },
      title: { type: 'string' },
      summary: { type: 'string' },

      education: { type: 'string' },
      experience: { type: 'string' },

      frontend: { type: 'string' },
      backend: { type: 'string' },
      tools: { type: 'string' },

      projects: { type: 'string' },

      availability: { type: 'string' },
      remoteExperience: { type: 'string' },

      github: { type: 'string' },
      linkedin: { type: 'string' },

      softSkills: { type: 'string' }
    }
  }
}
