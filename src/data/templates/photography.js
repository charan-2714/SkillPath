// src/data/templates/photography.js
export const photographyTemplate = {
  id: 'template-photography',
  name: 'Mastering Photography',
  description: 'From camera mechanics and the exposure triangle to composition, portrait lighting, and Lightroom color grading.',
  goal: 'Creative Skill Mastery',
  category: 'Creative Arts',
  difficulty: 'Beginner to Intermediate',
  trackingModel: 'custom',
  skillDimensions: [
    { id: 'theory', name: 'Theory & Optics', maxScore: 5 },
    { id: 'technique', name: 'Camera Technique', maxScore: 5 },
    { id: 'composition', name: 'Composition & Eye', maxScore: 5 },
    { id: 'postprocessing', name: 'Post-Processing', maxScore: 5 },
    { id: 'portfolio', name: 'Portfolio Quality', maxScore: 5 },
  ],
  enableAIDependency: false,
  levels: [
    {
      id: 'L0',
      title: 'Camera Mechanics & Exposure Triangle',
      description: 'Master aperture (f-stops), shutter speed, ISO sensitivity, and manual shooting mode.',
      order: 0,
      color: 'amber',
      subjects: [
        {
          id: 'PHOTO-L0-S1',
          title: 'Manual Exposure',
          order: 1,
          topics: [
            {
              id: 'PHOTO-T1',
              title: 'The Exposure Triangle in Practice',
              description: 'Balancing depth of field, motion blur, and sensor noise in changing light.',
              priority: 'core',
              tags: ['aperture', 'shutter', 'iso'],
              learningItems: [
                { id: 'p-1', title: 'Understand depth of field relationships with f/1.4 vs f/8' },
                { id: 'p-2', title: 'Freezing motion vs panning with shutter speed' },
                { id: 'p-3', title: 'Managing dynamic range and histogram readings' },
              ],
              practice: [
                { id: 'prac-p-1', title: 'Golden Hour Portrait Shoot', description: 'Shoot 20 portrait photos in Manual mode during golden hour.', difficulty: 'easy', type: 'hands-on' },
              ],
              assessments: [
                { id: 'a-p-1', question: 'How do you prevent motion blur when shooting handheld in low-light conditions?', difficulty: 'medium', type: 'self-assessment' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'L1',
      title: 'Composition & Visual Storytelling',
      description: 'Rule of thirds, leading lines, framing, negative space, and color theory.',
      order: 1,
      color: 'teal',
      subjects: [
        {
          id: 'PHOTO-L1-S1',
          title: 'Framing & Composition',
          order: 1,
          topics: [
            { id: 'PHOTO-T2', title: 'Leading Lines & Golden Ratio', description: 'Guiding viewer eye through the frame using natural geometry.', priority: 'core', tags: ['composition', 'framing'] },
          ],
        },
      ],
    },
  ],
  projects: [],
};
