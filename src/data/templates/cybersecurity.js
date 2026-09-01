// src/data/templates/cybersecurity.js
export const cybersecurityTemplate = {
  id: 'template-cybersecurity',
  name: 'Cybersecurity Engineer Roadmap',
  description: 'From computer networking and Linux internals to penetration testing, threat modeling, SIEM, and defensive operations.',
  goal: 'Security Specialist / Pen Tester',
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
      title: 'Networking & Operating Systems Security',
      description: 'TCP/IP protocols, DNS, OSI model, packet analysis with Wireshark, and Linux hardening.',
      order: 0,
      color: 'slate',
      subjects: [
        {
          id: 'CS-L0-S1',
          title: 'Network Protocols & Packet Analysis',
          order: 1,
          topics: [
            { id: 'CS-T1', title: 'Wireshark & Traffic Capture', description: 'Inspecting TCP handshakes, TLS negotiation, and identifying malicious payloads.', priority: 'core', tags: ['networking', 'wireshark'] },
          ],
        },
      ],
    },
    {
      id: 'L1',
      title: 'Ethical Hacking & Web App Security',
      description: 'OWASP Top 10 (SQLi, XSS, CSRF, SSRF), Burp Suite, and vulnerability assessments.',
      order: 1,
      color: 'red',
      subjects: [
        {
          id: 'CS-L1-S1',
          title: 'Web Application Pentesting',
          order: 1,
          topics: [
            { id: 'CS-T2', title: 'OWASP Top 10 Exploits & Mitigations', description: 'Testing for and fixing SQL injection, XSS, and broken access controls.', priority: 'core', tags: ['pentest', 'owasp'] },
          ],
        },
      ],
    },
    {
      id: 'L2',
      title: 'Defensive Security & SOC Operations',
      description: 'SIEM platforms (Splunk, Elastic), incident response, firewall configuration, and endpoint detection.',
      order: 2,
      color: 'blue',
      subjects: [
        {
          id: 'CS-L2-S1',
          title: 'Blue Team Operations',
          order: 1,
          topics: [
            { id: 'CS-T3', title: 'SIEM Monitoring & Incident Response', description: 'Log correlation, writing detection rules, and incident containment.', priority: 'core', tags: ['soc', 'siem'] },
          ],
        },
      ],
    },
  ],
  projects: [],
};
