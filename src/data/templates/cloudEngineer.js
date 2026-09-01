// src/data/templates/cloudEngineer.js
export const cloudEngineerTemplate = {
  id: 'template-cloud-engineer',
  name: 'Cloud & DevOps Engineer Roadmap',
  description: 'Master cloud infrastructure: AWS/GCP services, Terraform Infrastructure as Code, Kubernetes orchestration, and CI/CD pipelines.',
  goal: 'Cloud Solutions Architect / DevOps Specialist',
  category: 'Technology',
  difficulty: 'Intermediate to Advanced',
  trackingModel: 'skill-development',
  skillDimensions: [
    { id: 'understanding', name: 'Understanding', maxScore: 5 },
    { id: 'implementation', name: 'Implementation', maxScore: 5 },
    { id: 'debugging', name: 'Debugging', maxScore: 5 },
    { id: 'practice', name: 'Practice', maxScore: 5 },
    { id: 'interview', name: 'Interview Readiness', maxScore: 5 },
  ],
  enableAIDependency: true,
  levels: [
    {
      id: 'L0',
      title: 'Linux, Networking & Containers',
      description: 'Linux systems administration, DNS, VPCs, and Docker container fundamentals.',
      order: 0,
      color: 'slate',
      subjects: [
        {
          id: 'CL-L0-S1',
          title: 'Containerization',
          order: 1,
          topics: [
            { id: 'CL-T1', title: 'Docker Containers & Multi-Stage Builds', description: 'Creating lightweight, secure container images for microservices.', priority: 'core', tags: ['docker', 'linux'] },
          ],
        },
      ],
    },
    {
      id: 'L1',
      title: 'Infrastructure as Code (Terraform)',
      description: 'HCL syntax, state management, modules, and multi-environment orchestration.',
      order: 1,
      color: 'purple',
      subjects: [
        {
          id: 'CL-L1-S1',
          title: 'Terraform Automation',
          order: 1,
          topics: [
            { id: 'CL-T2', title: 'Terraform State & Reusable Modules', description: 'Managing remote state in S3/GCS with DynamoDB locks.', priority: 'core', tags: ['terraform', 'iac'] },
          ],
        },
      ],
    },
    {
      id: 'L2',
      title: 'Kubernetes Container Orchestration',
      description: 'Pods, Deployments, Services, Ingress, Helm charts, and cluster autoscaling.',
      order: 2,
      color: 'blue',
      subjects: [
        {
          id: 'CL-L2-S1',
          title: 'Kubernetes (K8s)',
          order: 1,
          topics: [
            { id: 'CL-T3', title: 'Kubernetes Deployments & Ingress Controllers', description: 'Declarative cluster management, rolling updates, and traffic routing.', priority: 'core', tags: ['k8s', 'kubernetes'] },
          ],
        },
      ],
    },
  ],
  projects: [],
};
