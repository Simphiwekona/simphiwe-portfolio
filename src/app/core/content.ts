/**
 * Single source of truth for every string and asset reference on the site.
 * Content is drawn from Simphiwe Kona's resume and the v1 portfolio, not invented.
 */

export interface NavItem {
  label: string;
  fragment: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface SkillGroup {
  name: string;
  detail: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  points: string[];
  stack: string[];
  featured?: boolean;
}

export interface Education {
  title: string;
  institution: string;
  period: string;
  note: string;
}

export interface WorkItem {
  title: string;
  kind: 'project' | 'certification';
  context: string;
  blurb: string;
  stack: string[];
  image: string;
  link?: string;
}

export interface Service {
  title: string;
  blurb: string;
  icon: string;
}

export const PROFILE = {
  name: 'Simphiwe Kona',
  firstName: 'Simphiwe',
  role: 'Angular & Full-Stack Java Engineer',
  location: 'Milnerton, Cape Town, South Africa',
  email: 'konaolwethu@gmail.com',
  phone: '063 624 2342',
  phoneIntl: '+27636242342',
  available: 'Open to senior roles',
  headline: {
    lead: 'Enterprise systems,',
    emphasis: 'built to hold',
    tail: 'under real load.',
  },
  intro:
    'Six years building banking, healthcare and government platforms. I own frontend architecture end to end, from design handoff to production, and ship the Spring Boot services behind it.',
  links: {
    github: 'https://github.com/Simphiwekona?tab=repositories',
    linkedin: 'https://linkedin.com/in/simphiwekona34',
    portfolio: 'https://simphiwekona.com',
  },
} as const;

export const NAV: NavItem[] = [
  { label: 'About', fragment: 'about' },
  { label: 'Experience', fragment: 'experience' },
  { label: 'Work', fragment: 'work' },
  { label: 'Contact', fragment: 'contact' },
];

export const METRICS: Metric[] = [
  { value: '6+', label: 'Years shipping production systems' },
  { value: '4', label: 'Enterprise platforms delivered' },
  { value: '12', label: 'Systems in the current stack' },
  { value: '3', label: 'Sectors: banking, health, public' },
];

export const ABOUT_PARAGRAPHS: string[] = [
  'I am a senior Angular and full-stack Java engineer working out of Cape Town. Most of what I build is enterprise software where correctness is not optional: digital finance platforms at KCB Bank, clinical applications at CGM, and the Ethics1st compliance platform for CIPE.',
  'My centre of gravity is frontend architecture. Complex, heavily validated reactive forms, secure JWT integrations, resilience for backend downtime, lazy loading and OnPush change detection tuned until the app stays smooth. I work in the seams between Angular and Spring Boot, and I am usually the one who owns the feature from design through to production.',
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    name: 'Angular',
    detail: '18+, TypeScript, RxJS, reactive forms, route-level lazy loading, OnPush',
  },
  {
    name: 'Java & Spring Boot',
    detail: 'REST APIs, Spring Security, JWT, JPA, validation, service layering',
  },
  {
    name: 'Data',
    detail: 'PostgreSQL, Oracle DB, MySQL, MongoDB',
  },
  {
    name: 'Platform & Delivery',
    detail: 'Docker, Jenkins, GitLab CI, AWS, Keycloak',
  },
  {
    name: 'Frontend Craft',
    detail: 'SCSS, Tailwind, accessibility, Core Web Vitals, responsive systems',
  },
  {
    name: 'Enterprise Platforms',
    detail: 'Liferay 7.3 DXP, JSP, Tomcat, DXP workflow configuration',
  },
];

export const MARQUEE_STACK: string[] = [
  'Angular 18+',
  'TypeScript',
  'RxJS',
  'Java',
  'Spring Boot',
  'Spring Security',
  'PostgreSQL',
  'Oracle DB',
  'Docker',
  'Jenkins',
  'GitLab CI',
  'Keycloak',
  'AWS',
  'SCSS',
  'REST APIs',
  'Liferay 7.3 DXP',
];

export const EXPERIENCE: Experience[] = [
  {
    company: 'CGM (CompuGroup Medical)',
    role: 'Angular & TypeScript Engineer',
    period: 'Current',
    location: 'Cape Town, ZA',
    summary:
      'Enterprise healthcare software running in clinical and practice environments.',
    points: [
      'Built complex, highly validated reactive forms for patient onboarding and medical workflows.',
      'Integrated Angular applications with Spring Boot services over secure JWT-based authentication.',
      'Implemented error handling and resilience patterns covering backend downtime scenarios.',
      'Optimised performance with lazy loading, RxJS best practices and OnPush change detection.',
      'Worked across backend, QA and product teams in Agile delivery cycles.',
    ],
    stack: ['Angular 18+', 'TypeScript', 'RxJS', 'SCSS', 'GitLab'],
    featured: true,
  },
  {
    company: 'Jumpco Consulting',
    role: 'Full-Stack Java Developer (Intern to Permanent)',
    period: '3 years',
    location: 'Johannesburg, ZA',
    summary:
      'Core contributor to the KCB Bank vehicle and property finance platform serving East African markets.',
    points: [
      'Designed and implemented Angular frontends with secure Spring Boot backend integrations.',
      'Delivered features across authentication, financing workflows, listings and transaction processing.',
      'Contributed to CI/CD pipelines and containerised deployments using Docker and Jenkins.',
      'Ran unit test suites and automation for critical financing logic.',
      'Progressed from intern to a trusted senior contributor with leadership responsibilities.',
    ],
    stack: ['Angular 15+', 'TypeScript', 'Java', 'Spring Boot', 'Oracle DB', 'Docker', 'Jenkins'],
    featured: true,
  },
  {
    company: 'Ethics1st (CIPE)',
    role: 'Frontend / Full-Stack Developer',
    period: 'Contract',
    location: 'Remote',
    summary:
      'Compliance and certification platform operating across African markets.',
    points: [
      'Built and enhanced the platform on Angular 14+.',
      'Implemented secure user and company registration with multi-factor authentication.',
      'Developed role-based dashboards for assessors, trainers and companies.',
      'Integrated notifications, badge systems and customer support workflows.',
      'Supported cloud deployment and performance optimisation.',
    ],
    stack: ['Angular 14+', 'TypeScript', 'Java', 'Spring Boot', 'Keycloak', 'PostgreSQL', 'AWS'],
  },
  {
    company: 'Department of Science & Innovation',
    role: 'System Developer, PIMS Project',
    period: 'Contract',
    location: 'Pretoria, ZA',
    summary:
      'Performance Information Management System delivered on Liferay 7.3 DXP.',
    points: [
      'Configured and customised Liferay 7.3 DXP components for enterprise content and workflow management.',
      'Led testing, debugging and feature implementation across the delivery cycle.',
      'Supported production server setup and optimisation for Liferay-based systems.',
      'Acted as team lead to hold system stability and on-time delivery.',
    ],
    stack: ['Liferay 7.3 DXP', 'Java', 'JSP', 'XML', 'MySQL', 'Tomcat', 'Docker'],
  },
];

export const EDUCATION: Education[] = [
  {
    title: 'Software Development',
    institution: 'ALX Africa',
    period: '2023 to current',
    note: 'Engineering principles for building, testing and deploying applications that solve real-world problems.',
  },
  {
    title: 'Software Development',
    institution: 'SoloLearn',
    period: '2020 to 2023',
    note: 'JavaScript, web development fundamentals, Angular and NestJS.',
  },
  {
    title: 'CompTIA A+',
    institution: 'Damelin, Johannesburg',
    period: '2018 to 2019',
    note: 'Entry-level computing, technical support and IT operations.',
  },
  {
    title: 'Liferay University Certification',
    institution: 'Liferay',
    period: 'Certified',
    note: 'Enterprise portal development on the Liferay DXP platform.',
  },
  {
    title: 'NQF3 Mechanical Engineering',
    institution: 'South West Gauteng College',
    period: 'Completed',
    note: 'Foundation in engineering drawing, materials and mechanical systems.',
  },
];

export const WORK: WorkItem[] = [
  {
    title: 'Ethics1st Compliance Platform',
    kind: 'project',
    context: 'CIPE',
    blurb:
      'Company registration, multi-factor authentication and role-based dashboards for assessors, trainers and companies. Built on Angular 14+ with Keycloak, Spring Boot and PostgreSQL.',
    stack: ['Angular', 'Spring Boot', 'Keycloak', 'PostgreSQL', 'AWS'],
    image: 'work/ethics1st.webp',
    link: 'https://www.ethics1st.cipe.org/',
  },
  {
    title: 'KCB Bank Finance Platform',
    kind: 'project',
    context: 'Jumpco Consulting',
    blurb:
      'Vehicle and property finance platform serving East African markets. Authentication, financing workflows, listings and transaction processing on Angular and Spring Boot.',
    stack: ['Angular', 'Spring Boot', 'Oracle DB', 'Docker', 'Jenkins'],
    image: 'work/kcb-platform.webp',
  },
  {
    title: 'PIMS, Department of Science & Innovation',
    kind: 'project',
    context: 'DSI',
    blurb:
      'Performance Information Management System delivered on Liferay 7.3 DXP, covering enterprise content and workflow management with a tuned production server setup.',
    stack: ['Liferay 7.3 DXP', 'Java', 'JSP', 'MySQL', 'Tomcat'],
    image: 'work/pims-platform.webp',
  },
  {
    title: 'Clinical Practice Applications',
    kind: 'project',
    context: 'CGM',
    blurb:
      'Healthcare applications used in clinical and practice environments, with heavily validated patient onboarding forms and resilience patterns for backend downtime.',
    stack: ['Angular 18+', 'TypeScript', 'RxJS', 'Spring Boot'],
    image: 'work/cgm-clinical.webp',
  },
  {
    title: 'Git and GitHub Essentials',
    kind: 'certification',
    context: 'Certification',
    blurb:
      'Version control fundamentals across branching strategy, pull request review and collaborative delivery workflows.',
    stack: ['Git', 'GitHub'],
    image: 'work/cert-git.webp',
  },
  {
    title: 'AngularJS & NestJS',
    kind: 'certification',
    context: 'Certification',
    blurb:
      'Component-driven frontend architecture paired with structured server-side application design.',
    stack: ['AngularJS', 'NestJS'],
    image: 'work/cert-angular-nest.webp',
  },
  {
    title: 'JavaScript',
    kind: 'certification',
    context: 'Certification',
    blurb:
      'Language fundamentals through to asynchronous patterns, the DOM and modern ES syntax.',
    stack: ['JavaScript'],
    image: 'work/cert-javascript.webp',
  },
  {
    title: 'Web Development Fundamentals',
    kind: 'certification',
    context: 'Certification',
    blurb:
      'Semantic markup, layout systems and responsive web foundations.',
    stack: ['HTML', 'CSS', 'Web'],
    image: 'work/cert-web-fundamentals.webp',
  },
];

export const SERVICES: Service[] = [
  {
    title: 'Frontend architecture',
    blurb:
      'Angular applications structured to stay maintainable at scale. Lazy loading, OnPush, typed forms and a component boundary you can reason about.',
    icon: 'phosphorCodeLight',
  },
  {
    title: 'Backend development',
    blurb:
      'Spring Boot services with real validation, secure JWT authentication and APIs shaped around the domain rather than around the database.',
    icon: 'phosphorDatabaseLight',
  },
  {
    title: 'Integrations',
    blurb:
      'Connecting Angular to Spring Boot, Keycloak, notification providers and third-party systems without leaking infrastructure into the UI.',
    icon: 'phosphorStackLight',
  },
  {
    title: 'Delivery & performance',
    blurb:
      'Docker and Jenkins pipelines, production deploys, plus the performance work that gets Core Web Vitals and clinical-grade responsiveness where they need to be.',
    icon: 'phosphorGearLight',
  },
];
