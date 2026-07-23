import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
  signal,
  computed,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

interface Project {
  title: string;
  name: string;
  type: string;
  clientOrOwner: string;
  role: string;
  employer: string;
  functions: string;
  tags: string[];
  link: string;
  imageUrl: string;
  category: string;
}

interface ResearchPaper {
  title: string;
  publication: string;
  date: string;
  link: string;
  abstract: string;
}

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
}

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: string;
}

interface AcademyItem {
  degree: string;
  institution: string;
  period: string;
  description: string;
}

interface CertificationItem {
  name: string;
  issuer: string;
  date: string;
}

interface SkillGroup {
  name: string;
  skills: string[];
}

interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  id: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);

  // Profile fields matching user payload
  name = 'SAI CHARAN KODATI';
  title = 'Tech Lead';
  subTitle = 'System Design | Solution Architecture';
  bio1 = 'Designing resilient, enterprise‑grade architectures that align business goals with engineering execution.';
  bio2 = '11+ years specializing in scalable, secure, and cost‑effective systems, with a focus on microservices, event-driven patterns, and agentic AI solutions.';
  bio3 = 'Guiding technical strategy, elevating code craftsmanship, and fostering high‑performance engineering cultures.';
  bio4 = 'To architect world-class systems that unite cutting-edge technology with tangible enterprise value, while cultivating collaborative environments that empower teams to innovate and grow.';

  // Layout Signals
  mobileMenuOpen = signal(false);
  activeSection = signal('home');
  darkMode = signal(true); // Dark mode by default

  toggleDarkMode() {
    this.darkMode.update(v => {
      const next = !v;
      if (this.isBrowser) {
        localStorage.setItem('portfolio_theme', next ? 'dark' : 'light');
        if (next) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      return next;
    });
  }

  // Typewriter Signals
  typingText = signal('');
  private typeRoles = [
    'Technical Lead',
    'Architecture Strategist',
    'Full-Stack Specialist',
    'Agentic AI Developer'
  ];
  private currentRoleIndex = 0;
  private currentChars = '';
  private isDeleting = false;
  private typingTimer: ReturnType<typeof setTimeout> | null = null;

  // Contact Form Signal & Group
  contactSubmitting = signal(false);
  contactSuccess = signal(false);
  submittedMessages = signal<ContactMessage[]>([]);

  contactForm = new FormGroup({
    name: new FormControl('', { validators: [Validators.required, Validators.minLength(2)], nonNullable: true }),
    email: new FormControl('', { validators: [Validators.required, Validators.email], nonNullable: true }),
    subject: new FormControl('', { validators: [Validators.required, Validators.minLength(4)], nonNullable: true }),
    message: new FormControl('', { validators: [Validators.required, Validators.minLength(10)], nonNullable: true }),
  });

  // Work filtering signals
  currentWorkFilter = signal<'all' | 'gov' | 'health' | 'enterprise'>('all');

  // Mock auto-reply message
  mockAutoReply = signal<string | null>(null);

  // User Core Skills
  coreSkills: SkillGroup[] = [
    {
      name: 'Agentic AI Systems',
      skills: ['Multi-Agent Orchestration', 'Retrieval-Augmented Generation (RAG)', 'LLMOps', 'Intelligent Workflow Automation', 'Anomaly Detection']
    },
    {
      name: 'Blockchain Technologies',
      skills: ['Ethereum', 'Smart Contracts', 'dApps', 'Hyperledger Fabric', 'Solana']
    },
    {
      name: 'Cloud & Infrastructure',
      skills: ['Microsoft Azure Cloud', 'Serverless Architecture', 'DevOps', 'Kubernetes', 'Docker', 'Hypervisor', 'Service Mesh (Istio)', 'IoT Hub Systems', 'Cloud Cost Optimization']
    },
    {
      name: 'Software Architectures',
      skills: ['Clean Architecture', 'Event-Driven Systems Architecture', 'Microfrontends Architecture', 'Microservices Architecture', 'Client-Server Architecture', 'Monolithic Architecture', 'C4 Architectural Modeling']
    },
    {
      name: 'Design Patterns',
      skills: ['Command and Query Responsibility Segregation (CQRS)', 'Event Sourcing', 'Mediator', 'Observer', 'Factory', 'Abstract Factory', 'Adapter', 'Builder', 'Bridge', 'Decorator', 'Façade', 'Iterator', 'Singleton']
    },
    {
      name: 'Design Approaches',
      skills: ['Domain-Driven Design (DDD)', 'API-First Design', 'Data-Driven Design', 'User Interface (UI) Driven Design']
    },
    {
      name: 'Development Methodologies',
      skills: ['Continuous Integration & Continuous Delivery/Deployment(CI/CD)', 'Test-Driven Development (TDD)', 'Behavior-Driven Development (BDD)', 'Continuous Discovery']
    },
    {
      name: 'Identity & Security',
      skills: ['Microsoft Entra ID', 'OAuth 2.0 & OpenID Connect', 'Microsoft Graph API']
    },
    {
      name: 'Enterprise Messaging',
      skills: ['Apache Kafka', 'RabbitMQ', 'Azure Service Bus']
    }
  ];

  // User Foundational Skills
  foundationalSkills: SkillGroup[] = [
    {
      name: 'Programming Languages',
      skills: ['C#', 'Python', 'Java', 'C++', 'C', 'TypeScript', 'JavaScript', 'Solidity']
    },
    {
      name: 'Databases & Storage',
      skills: ['MS SQL Server', 'Mongo DB', 'Cosmos DB', 'MySQL', 'Oracle', 'SQLite', 'PostgreSQL', 'Indexed DB', 'Snowflake', 'Databricks']
    },
    {
      name: 'Object Relational Mappings',
      skills: ['Entity Framework', 'Dapper', 'SQLAlchemy', 'Hibernate', 'TypeORM', 'Prisma']
    },
    {
      name: 'Backend Frameworks',
      skills: ['ASP.Net Core - Minimal/Web API', 'ASP.Net - MVC/ MVVM', 'Django - Fast/Web API', ' Spring Boot - Web API', 'NestJS', 'Node.js', 'Firebase', 'Suppabase', 'Silverlight']
    },
    {
      name: 'Frontend Frameworks',
      skills: ['Angular', 'Blazor', 'React', 'JQuery']
    },
    {
      name: 'Cross Platform Application Development',
      skills: ['Progressive Web Apps (PWA)', 'MAUI', 'Flutter', 'React Native', 'Xamarin']
    },
    {
      name: 'UI & Design Systems',
      skills: ['Angular Material', 'Bootstrap', 'Tailwind', 'Telerik UI', 'Material UI', 'Fluent UI', 'Kendo UI']
    },
    {
      name: 'Integrations',
      skills: ['Stripe', 'Salesforce', 'Pipedrive', 'Zapier', 'Gmail', 'Office 365', 'Twilio', 'Intercom', 'Dev Express', 'Hang-fire', 'Seri-log']
    },
    {
      name: 'Developer Tools',
      skills: ['Git', 'GitHub', 'GitLab', 'Source Tree', 'Bitbucket', 'Visual Studio Code', 'Visual Studio IDE', 'JetBrains Rider', 'Postman', 'Fiddler', 'Swagger UI']
    },
    {
      name: 'Business Intelligence',
      skills: ['Power BI', 'Tableau', 'DevExpress Reporting', 'DevExpress Dashboards']
    }
  ];

  // Interactive Skill Tree state signals
  skillSearchQuery = signal<string>('');
  skillTreeViewMode = signal<'interactive' | 'matrix'>('interactive');
  activePillar = signal<'core' | 'foundational'>('core');
  selectedGroupFolder = signal<string | null>('Agentic AI Systems');
  expandedNodes = signal<Record<string, boolean>>({
    'root': true,
    'core-branch': true,
    'foundational-branch': true
  });
  selectedSkillNode = signal<string | null>('Multi-Agent Orchestration');
  expandedGroups = signal<Record<string, boolean>>({});

  floatingBadges = [
    {
      name: 'Microsoft Certified Professional',
      label: 'MSFT',
      sub: 'Microsoft Certified Expert',
      imageUrl: 'https://learn.microsoft.com/en-us/media/learn/certification/badges/microsoft-certified-expert-badge.svg',
      style: 'from-blue-500/10 via-indigo-500/10 to-violet-500/10 text-blue-500 border-blue-500/20 shadow-blue-500/10',
      posClass: 'top-[5%] left-[45%]',
      animClass: 'animate-float-3'
    },
    {
      name: 'Microsoft Azure',
      label: 'Azure',
      sub: 'Cloud Services & Solutions',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg',
      style: 'from-cyan-500/10 via-sky-500/10 to-blue-500/10 text-cyan-500 border-cyan-500/20 shadow-cyan-500/10',
      posClass: 'top-[18%] left-[22%]',
      animClass: 'animate-float-2'
    },
    {
      name: 'Kubernetes',
      label: 'K8s',
      sub: 'Orchestration & Containers',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg',
      style: 'from-cyan-500/10 via-sky-500/10 to-blue-500/10 text-cyan-500 border-cyan-500/20 shadow-cyan-500/10',
      posClass: 'bottom-[22%] left-[24%]',
      animClass: 'animate-float-2'
    },
    {
      name: 'BITS Pilani Hyderabad',
      label: 'BITS',
      sub: 'M.Tech Software Systems',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d3/BITS_Pilani-Logo.svg',
      style: 'from-amber-500/10 via-orange-500/10 to-red-500/10 text-orange-500 border-orange-500/20 shadow-orange-500/10',
      posClass: 'top-[4%] left-[6%]',
      animClass: 'animate-float-1'
    },
    {
      name: 'Artificial Intelligence',
      label: 'AI',
      sub: 'AI Assisted & Agentic AI Solutions',
      imageUrl: 'https://antigravity.google/assets/image/brand/antigravity-icon__full-color.png',
      style: 'from-purple-500/10 via-fuchsia-500/10 to-pink-500/10 text-purple-500 border-purple-500/20 shadow-purple-500/10',
      posClass: 'bottom-[18%] right-[4%]',
      animClass: 'animate-float-3'
    },
    {
      name: 'Angular Specialist',
      label: 'NG',
      sub: 'Frontend Architecture',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Angular_gradient_logo.png',
      style: 'from-rose-500/10 via-red-500/10 to-orange-500/10 text-rose-500 border-rose-500/20 shadow-rose-500/10',
      posClass: 'top-[36%] left-[4%]',
      animClass: 'animate-float-3'
    },
    {
      name: '.NET Core Specialist',
      label: '.NET',
      sub: 'Enterprise App Architecture',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Microsoft_.NET_logo.svg',
      style: 'from-purple-500/10 via-violet-500/10 to-indigo-500/10 text-purple-500 border-purple-500/20 shadow-purple-500/10',
      posClass: 'bottom-[36%] right-[24%]',
      animClass: 'animate-float-1'
    },
    {
      name: 'SQL Database Expert',
      label: 'SQL',
      sub: 'Relational & Distributed DBs',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Microsoft_SQL_Server_2025_icon.svg',
      style: 'from-cyan-500/10 via-teal-500/10 to-emerald-500/10 text-teal-500 border-teal-500/20 shadow-teal-500/10',
      posClass: 'top-[42%] right-[5%]',
      animClass: 'animate-float-2'
    },
    {
      name: 'MongoDB Specialist',
      label: 'Mongo',
      sub: 'NoSQL Document Store',
      imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
      style: 'from-emerald-500/10 via-green-500/10 to-teal-500/10 text-emerald-600 border-emerald-500/20 shadow-emerald-500/10',
      posClass: 'bottom-[4%] right-[10%]',
      animClass: 'animate-float-3'
    },
    {
      name: 'JNTU Hyderabad',
      label: 'JNTU',
      sub: 'B.Tech Computer Science',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/e/ea/JNTU_Hyderabad_logo.png',
      style: 'from-emerald-500/10 via-teal-500/10 to-cyan-500/10 text-emerald-500 border-emerald-500/20 shadow-emerald-500/10',
      posClass: 'bottom-[4%] left-[10%]',
      animClass: 'animate-float-2'
    }
  ];

  getCategoryIconClass(name: string): string {
    const map: Record<string, string> = {
      'Agentic AI Systems': 'text-emerald-500 dark:text-emerald-400',
      'Blockchain Technologies': 'text-sky-500 dark:text-sky-400',
      'Cloud & Infrastructure': 'text-indigo-500 dark:text-indigo-400',
      'Software Architectures': 'text-amber-500 dark:text-amber-400',
      'Design Patterns': 'text-purple-500 dark:text-purple-400',
      'Design Approaches': 'text-teal-500 dark:text-teal-400',
      'Development Methodologies': 'text-rose-500 dark:text-rose-400',
      'Identity & Security': 'text-cyan-500 dark:text-cyan-400',
      'Enterprise Messaging': 'text-emerald-500 dark:text-emerald-400',
      'Programming Languages': 'text-sky-500 dark:text-sky-400',
      'Databases & Storage': 'text-amber-600 dark:text-amber-400',
      'Object Relational Mappings': 'text-indigo-500 dark:text-indigo-400',
      'Backend Frameworks': 'text-rose-500 dark:text-rose-400',
      'Frontend Frameworks': 'text-pink-500 dark:text-pink-400',
      'Cross Platform Application Development': 'text-emerald-500 dark:text-emerald-400',
      'UI & Design Systems': 'text-fuchsia-500 dark:text-fuchsia-400',
      'Integrations': 'text-sky-500 dark:text-sky-400',
      'Developer Tools': 'text-amber-600 dark:text-amber-400',
      'Business Intelligence': 'text-indigo-500 dark:text-indigo-400'
    };
    return map[name] || 'text-sky-500 dark:text-sky-400';
  }

  getCategoryBorderClass(name: string): string {
    const map: Record<string, string> = {
      'Agentic AI Systems': 'border-l-4 border-l-emerald-500',
      'Blockchain Technologies': 'border-l-4 border-l-sky-500',
      'Cloud & Infrastructure': 'border-l-4 border-l-indigo-500',
      'Software Architectures': 'border-l-4 border-l-amber-500',
      'Design Patterns': 'border-l-4 border-l-purple-500',
      'Design Approaches': 'border-l-4 border-l-teal-500',
      'Development Methodologies': 'border-l-4 border-l-rose-500',
      'Identity & Security': 'border-l-4 border-l-cyan-500',
      'Enterprise Messaging': 'border-l-4 border-l-emerald-500',
      'Programming Languages': 'border-l-4 border-l-sky-500',
      'Databases & Storage': 'border-l-4 border-l-amber-500',
      'Object Relational Mappings': 'border-l-4 border-l-indigo-500',
      'Backend Frameworks': 'border-l-4 border-l-rose-500',
      'Frontend Frameworks': 'border-l-4 border-l-pink-500',
      'Cross Platform Application Development': 'border-l-4 border-l-emerald-500',
      'UI & Design Systems': 'border-l-4 border-l-fuchsia-500',
      'Integrations': 'border-l-4 border-l-sky-500',
      'Developer Tools': 'border-l-4 border-l-amber-500',
      'Business Intelligence': 'border-l-4 border-l-indigo-500'
    };
    return map[name] || 'border-l-4 border-l-sky-500';
  }

  isGroupExpanded(groupName: string): boolean {
    const state = this.expandedGroups();
    if (state[groupName] === undefined) {
      // Expand all by default so it's friendly and visible initially
      return true;
    }
    return state[groupName];
  }

  toggleGroup(groupName: string): void {
    const current = this.isGroupExpanded(groupName);
    this.expandedGroups.update(prev => ({
      ...prev,
      [groupName]: !current
    }));
  }

  expandAllGroups(expand = true): void {
    const nextState: Record<string, boolean> = {};
    const groups = [...this.coreSkills, ...this.foundationalSkills];
    for (const g of groups) {
      nextState[g.name] = expand;
    }
    this.expandedGroups.set(nextState);
  }

  activePillarGroups = computed(() => {
    return this.activePillar() === 'core' ? this.filteredCoreSkills() : this.filteredFoundationalSkills();
  });

  activeGroupSkills = computed(() => {
    const folder = this.selectedGroupFolder();
    if (!folder) return [];
    const list = this.activePillarGroups();
    const matched = list.find(g => g.name === folder);
    return matched ? matched.skills : [];
  });

  // Computed properties to filter core and foundational skills dynamically based on the search query
  filteredCoreSkills = computed(() => {
    const query = this.skillSearchQuery().toLowerCase().trim();
    if (!query) {
      return this.coreSkills;
    }
    return this.coreSkills
      .map(group => {
        const matchingSkills = group.skills.filter(s => s.toLowerCase().includes(query));
        const groupMatches = group.name.toLowerCase().includes(query);
        if (groupMatches || matchingSkills.length > 0) {
          return {
            ...group,
            skills: groupMatches ? group.skills : matchingSkills,
            isMatched: true
          };
        }
        return null;
      })
      .filter((g): g is NonNullable<typeof g> => g !== null);
  });

  filteredFoundationalSkills = computed(() => {
    const query = this.skillSearchQuery().toLowerCase().trim();
    if (!query) {
      return this.foundationalSkills;
    }
    return this.foundationalSkills
      .map(group => {
        const matchingSkills = group.skills.filter(s => s.toLowerCase().includes(query));
        const groupMatches = group.name.toLowerCase().includes(query);
        if (groupMatches || matchingSkills.length > 0) {
          return {
            ...group,
            skills: groupMatches ? group.skills : matchingSkills,
            isMatched: true
          };
        }
        return null;
      })
      .filter((g): g is NonNullable<typeof g> => g !== null);
  });

  // Check if either branch has any matched elements
  hasCoreMatches = computed(() => this.filteredCoreSkills().length > 0);
  hasFoundationalMatches = computed(() => this.filteredFoundationalSkills().length > 0);

  // Skill tree helper actions
  toggleNode(nodeId: string) {
    this.expandedNodes.update(state => ({
      ...state,
      [nodeId]: !state[nodeId]
    }));
  }

  isNodeExpanded(nodeId: string): boolean {
    if (this.skillSearchQuery().trim() !== '') {
      return true; // Auto expand all nodes during search to locate skills easily
    }
    const val = this.expandedNodes()[nodeId];
    return val !== false; // Default to true if not defined
  }

  expandAllNodes() {
    const allStates: Record<string, boolean> = {
      'root': true,
      'core-branch': true,
      'foundational-branch': true
    };
    this.coreSkills.forEach(g => {
      allStates['group-' + g.name] = true;
    });
    this.foundationalSkills.forEach(g => {
      allStates['group-' + g.name] = true;
    });
    this.expandedNodes.set(allStates);
  }

  collapseAllNodes() {
    this.expandedNodes.set({
      'root': false,
      'core-branch': false,
      'foundational-branch': false
    });
  }

  selectSkill(skill: string | null) {
    this.selectedSkillNode.set(skill);
  }

  selectPillar(pillar: 'core' | 'foundational') {
    this.activePillar.set(pillar);
    const groups = pillar === 'core' ? this.coreSkills : this.foundationalSkills;
    const firstGroup = groups[0];
    if (firstGroup) {
      this.selectedGroupFolder.set(firstGroup.name);
      if (firstGroup.skills.length > 0) {
        this.selectedSkillNode.set(firstGroup.skills[0]);
      }
    }
  }

  selectGroupFolder(folderName: string) {
    this.selectedGroupFolder.set(folderName);
    const groups = this.activePillar() === 'core' ? this.coreSkills : this.foundationalSkills;
    const matched = groups.find(g => g.name === folderName);
    if (matched && matched.skills.length > 0) {
      this.selectedSkillNode.set(matched.skills[0]);
    }
  }

  // Dynamic detail computed signal based on the selected skill node
  selectedSkillDetails = computed(() => {
    const skill = this.selectedSkillNode();
    if (!skill) return null;

    // We map specific detailed overviews for important skills or generate high-quality commentary
    let description = '';
    let category = 'Enterprise Architecture Integration';
    let applicationPattern = 'High scalability & resilience orchestration patterns';
    const mastery = 'Expert Design Practice';

    const normalized = skill.toLowerCase();
    if (normalized.includes('multi‑agent') || normalized.includes('orchestration')) {
      description = 'Designing decoupled AI worker hives using advanced orchestrator systems. Focuses on safe concurrent executions, event-driven state transitions, and stateful memory retention pipelines.';
      category = 'Agentic AI Systems';
      applicationPattern = 'Autonomous Workflow Automation & Anomaly Detection';
    } else if (normalized.includes('kubernetes') || normalized.includes('service mesh')) {
      description = 'Orchestrating microservices at scale using container management engines and Linkerd/Istio meshes. Enables secure mutual TLS communication, distributed tracing, and fault-tolerant routing.';
      category = 'Cloud Infrastructure & Scaling';
      applicationPattern = 'Highly-Available Multi-Region Kubernetes Clusters';
    } else if (normalized.includes('azure')) {
      description = 'Architecting secure serverless microservices and enterprise application integrations. Leverages API Management for secure proxying, Service Bus for decoupling, and Redis for distributed caching.';
      category = 'Cloud Platform Integration';
      applicationPattern = 'Azure Enterprise Integration Suite';
    } else if (normalized.includes('data mesh') || normalized.includes('event‑mesh')) {
      description = 'Establishing decentralized domain data ownership and low-latency global event routing systems across hybrid clouds. Empowers scalable, domain-driven analytics capabilities.';
      category = 'Modern Architectural Approaches';
      applicationPattern = 'Enterprise Event Streaming & Decentralized Analytics';
    } else if (normalized.includes('microfrontends') || normalized.includes('microservices')) {
      description = 'Deconstructing large systems into manageable, independent-deployable services and decoupled shell applications. Enhances developer velocity and limits blast-radii.';
      category = 'Architectural Patterns';
      applicationPattern = 'Distributed Single-Spa shell with independent Angular micro-frontends';
    } else if (normalized.includes('cqrs') || normalized.includes('event sourcing')) {
      description = 'Segregating command and query responsibilities to optimize database performances independently, combined with complete state-change auditing.';
      category = 'High-Performance Design Patterns';
      applicationPattern = 'Audit-safe Financial Transaction Ledgers';
    } else if (normalized.includes('react') || normalized.includes('angular') || normalized.includes('vue')) {
      description = 'Developing modular, highly-performant, single-page application interfaces with strong reactive state management using signals and efficient lifecycles.';
      category = 'Frontend Engineering';
      applicationPattern = 'Zoneless Reactive Single-Page Portals';
    } else if (normalized.includes('typescript') || normalized.includes('rust') || normalized.includes('go')) {
      description = 'Utilizing modern, type-safe programming languages to write robust, maintainable, and memory-safe system code with exceptional execution speeds.';
      category = 'Backend & Systems Development';
      applicationPattern = 'High-Throughput Concurrent Data-Processors';
    } else {
      // General dynamic description
      description = `Demonstrated expertise in applying ${skill} principles to solve real-world enterprise constraints, ensuring robust code quality, minimal technical debt, and maximum maintainability.`;
      category = 'Enterprise Solution Core';
      applicationPattern = 'Scalable Solution Component & Best Practices';
    }

    return {
      name: skill,
      description,
      category,
      applicationPattern,
      mastery
    };
  });

  // Aligned skills mapper to bridge Core Architectures and Foundational Tech
  alignedSkills = computed(() => {
    const skill = this.selectedSkillNode();
    if (!skill) return null;

    const normalized = skill.toLowerCase();
    let title = '';
    let items: string[] = [];
    let explanation = '';

    if (this.activePillar() === 'core') {
      title = 'Matching Foundational Technologies';
      if (normalized.includes('multi‑agent') || normalized.includes('orchestration') || normalized.includes('workflow') || normalized.includes('rag') || normalized.includes('ops')) {
        items = ['LangChain', 'AutoGen', 'Google AI Studio', 'Python', 'NestJS'];
        explanation = 'Agentic orchestration and RAG pipelines are realized using modern AI frameworks, Python, and robust web APIs.';
      } else if (normalized.includes('kubernetes') || normalized.includes('service mesh') || normalized.includes('docker')) {
        items = ['Docker', 'Go', 'Rust', 'PostgreSQL'];
        explanation = 'High-scale deployments are packaged with Docker/Kubernetes and monitored using lightweight, high-performance backends.';
      } else if (normalized.includes('azure') || normalized.includes('hypervisor') || normalized.includes('iot')) {
        items = ['ASP .Net (Web API, Core, MVC)', 'Cosmos DB', 'Azure Service Bus', 'C#'];
        explanation = 'Cloud implementations are built on Microsoft stacks, utilizing Web APIs, Service Bus, and distributed caches.';
      } else if (normalized.includes('data mesh') || normalized.includes('event‑mesh') || normalized.includes('event streaming') || normalized.includes('clean architecture') || normalized.includes('c4')) {
        items = ['Kafka', 'TypeScript', 'PostgreSQL', 'NestJS', 'Kafka Connect'];
        explanation = 'Modern decoupled data architectures utilize enterprise event streams like Kafka combined with clean, type-safe Node/Nest services.';
      } else if (normalized.includes('microfrontends') || normalized.includes('microservices') || normalized.includes('event‑driven') || normalized.includes('serverless') || normalized.includes('offline‑first') || normalized.includes('client‑server') || normalized.includes('hexagonal') || normalized.includes('onion') || normalized.includes('monolithic')) {
        items = ['Angular', 'React', 'TypeScript', 'NestJS', 'ASP .Net (Web API, Core, MVC)', 'IndexedDB'];
        explanation = 'Architectural boundaries are maintained using independent React/Angular frontends and stateless NestJS/Web API endpoints.';
      } else if (normalized.includes('cqrs') || normalized.includes('mediator') || normalized.includes('event sourcing') || normalized.includes('observer') || normalized.includes('factory') || normalized.includes('abstract') || normalized.includes('adapter') || normalized.includes('builder') || normalized.includes('bridge') || normalized.includes('decorator') || normalized.includes('façade') || normalized.includes('iterator') || normalized.includes('singleton')) {
        items = ['TypeScript', 'C#', 'Java', 'Entity Framework', 'Dapper', 'NestJS'];
        explanation = 'Structural and creational design patterns are modeled using strongly-typed OOP/FP languages and industry-grade ORMs.';
      } else if (normalized.includes('ai‑driven') || normalized.includes('domain‑driven') || normalized.includes('api‑driven') || normalized.includes('data‑driven') || normalized.includes('ui‑driven')) {
        items = ['TypeScript', 'Python', 'Angular Material', 'PostgreSQL', 'BigQuery'];
        explanation = 'Strategic software delivery paradigms utilize scalable SQL databases, clean API contracts, and consistent UI libraries.';
      } else if (normalized.includes('ci/cd') || normalized.includes('continuous') || normalized.includes('bdd') || normalized.includes('tdd') || normalized.includes('fdd')) {
        items = ['GitHub Copilot', 'TypeScript', 'C#', 'Python', 'NestJS'];
        explanation = 'Continuous iteration and development methodologies are accelerated with modern AI tools and automated test-runners.';
      } else if (normalized.includes('entra') || normalized.includes('graph') || normalized.includes('oauth') || normalized.includes('openid')) {
        items = ['ASP .Net (Web API, Core, MVC)', 'Office 365', 'TypeScript', 'NestJS', 'Firebase'];
        explanation = 'Identity federations and secure access models are established using OAuth/OIDC wrappers in Angular, C#, or Node.';
      } else if (normalized.includes('rabbitmq') || normalized.includes('kafka') || normalized.includes('service bus')) {
        items = ['NestJS', 'ASP .Net (Web API, Core, MVC)', 'Spring Boot', 'Kafka Connect'];
        explanation = 'High-reliability messaging is managed using persistent queues and consumed across backend frameworks.';
      } else if (normalized.includes('ethereum') || normalized.includes('smart') || normalized.includes('hyperledger') || normalized.includes('solana')) {
        items = ['Solidity', 'Go', 'Rust', 'TypeScript', 'IndexedDB'];
        explanation = 'Distributed smart contracts are written in Solidity/Rust and bound to the client UI with JavaScript/TypeScript.';
      } else {
        items = ['TypeScript', 'Python', 'PostgreSQL', 'Docker'];
        explanation = 'Enterprise architectural practices are fully supported by standard production languages, containers, and data backends.';
      }
    } else {
      title = 'Matching Core Architectures & Patterns';
      if (normalized.includes('langchain') || normalized.includes('autogen') || normalized.includes('studio') || normalized.includes('copilot') || normalized.includes('cursor') || normalized.includes('codex')) {
        items = ['Agentic AI Systems', 'AI‑Driven Design', 'Development Methodologies'];
        explanation = 'AI-assisted tools accelerate multi-agent workflows, autonomous RAG pattern integrations, and AI-driven prototyping.';
      } else if (normalized.includes('rust') || normalized.includes('go') || normalized.includes('python') || normalized.includes('java') || normalized.includes('c#') || normalized.includes('solidity') || normalized.includes('c++') || normalized.includes('c')) {
        items = ['Clean Architecture', 'Microservices', 'Serverless', 'Hexagonal', 'Design Patterns'];
        explanation = 'Robust languages provide compile-time safety and high performance required for secure microservices and clean hexagonal codebases.';
      } else if (normalized.includes('snowflake') || normalized.includes('bigquery') || normalized.includes('neo4j') || normalized.includes('postgres') || normalized.includes('mongo') || normalized.includes('cosmos') || normalized.includes('sql') || normalized.includes('sqlite') || normalized.includes('indexeddb') || normalized.includes('oracle') || normalized.includes('mysql')) {
        items = ['Data Mesh', 'CQRS', 'Event Sourcing', 'Data‑Driven', 'Offline‑First'];
        explanation = 'Data stores back state auditing, command-query separation, real-time message meshes, and local client cache schemas.';
      } else if (normalized.includes('spring boot') || normalized.includes('nestjs') || normalized.includes('asp .net') || normalized.includes('firebase') || normalized.includes('silverlight') || normalized.includes('ado')) {
        items = ['Microservices', 'Event‑Driven', 'Serverless', 'Clean Architecture', 'Architectural Patterns'];
        explanation = 'Backend framework stacks serve as the runtime foundation for resilient distributed event-driven systems and microservices.';
      } else if (normalized.includes('entity framework') || normalized.includes('dapper')) {
        items = ['Design Patterns', 'Data‑Driven', 'Architectural Patterns'];
        explanation = 'Object-relational mapping patterns isolate low-level database details from high-level enterprise business domains.';
      } else if (normalized.includes('react') || normalized.includes('angular') || normalized.includes('vue') || normalized.includes('svelte') || normalized.includes('jquery') || normalized.includes('blazor')) {
        items = ['Microfrontends', 'UI‑Driven', 'Client‑Server', 'Offline‑First'];
        explanation = 'Component architectures represent the building blocks for decoupled client shells and rich responsive microfrontends.';
      } else if (normalized.includes('typescript') || normalized.includes('javascript') || normalized.includes('html') || normalized.includes('css')) {
        items = ['Microfrontends', 'UI‑Driven', 'API‑Driven', 'Development Methodologies'];
        explanation = 'Web standards form the bedrock of browser architectures, responsive visual designs, and front-to-back contract contracts.';
      } else if (normalized.includes('material ui') || normalized.includes('angular material') || normalized.includes('bootstrap') || normalized.includes('telerik') || normalized.includes('fluent') || normalized.includes('kendo')) {
        items = ['UI‑Driven', 'Client‑Server', 'Design Approaches'];
        explanation = 'Enterprise visual libraries guarantee rigid compliance with strict visual guidelines and responsive UX best practices.';
      } else if (normalized.includes('flutter') || normalized.includes('react native') || normalized.includes('pwa') || normalized.includes('maui') || normalized.includes('xamarin')) {
        items = ['Offline‑First', 'Client‑Server', 'Architectural Patterns'];
        explanation = 'Hybrid mobile systems center around local-first data persistence, remote state synchronization, and native interfaces.';
      } else if (normalized.includes('kafka connect') || normalized.includes('salesforce') || normalized.includes('stripe') || normalized.includes('pipedrive') || normalized.includes('twilio') || normalized.includes('zapier')) {
        items = ['Event‑Mesh', 'Event Streaming', 'Event‑Driven', 'API‑Driven'];
        explanation = 'Integration connectors trigger and stream events, connecting third-party systems to internal event meshes asynchronously.';
      } else {
        items = ['Clean Architecture', 'API‑Driven', 'Design Patterns'];
        explanation = 'All client-facing libraries map directly to modern Clean Architecture patterns and decoupled API structures.';
      }
    }

    return {
      title,
      items,
      explanation
    };
  });

  navigateToSkill(skill: string) {
    let foundPillar: 'core' | 'foundational' | null = null;
    let foundGroup: string | null = null;

    // Check Core Skills
    for (const group of this.coreSkills) {
      if (group.skills.includes(skill)) {
        foundPillar = 'core';
        foundGroup = group.name;
        break;
      }
    }

    // Check Foundational Skills
    if (!foundPillar) {
      for (const group of this.foundationalSkills) {
        if (group.skills.includes(skill)) {
          foundPillar = 'foundational';
          foundGroup = group.name;
          break;
        }
      }
    }

    if (foundPillar && foundGroup) {
      this.activePillar.set(foundPillar);
      this.selectedGroupFolder.set(foundGroup);
      this.selectedSkillNode.set(skill);
      this.skillSearchQuery.set('');
    }
  }

  // Quick helper to check if a specific skill is currently selected
  isSkillSelected(skill: string): boolean {
    return this.selectedSkillNode() === skill;
  }

  updateSearchQuery(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input) {
      this.skillSearchQuery.set(input.value);
    }
  }

  // Let's generate a clear unified timeline based on the career journey
  timelineItems: TimelineItem[] = [
    {
      year: '2025 – Present',
      title: 'Technical Lead',
      description: 'Lead the technical execution of enterprise solutions by defining system architecture, coordinating cross-functional engineering teams, driving technology decisions, and ensuring scalable, secure, and maintainable software delivery.',
      icon: 'workspace_premium',
    },
    {
      year: '2023',
      title: 'Lead Software Engineer',
      description: 'Led the technical implementation of enterprise projects by driving solution design, reviewing system architecture, mentoring development teams, and delivering high-quality, scalable software solutions.',
      icon: 'workspace_premium',
    },
    {
      year: '2020',
      title: 'Senior Software Engineer',
      description: 'Designed and developed enterprise-grade software solutions, mentored engineers, improved application architecture, and contributed to system integration, performance optimization, and software quality.',
      icon: 'workspace_premium',
    },
    {
      year: '2018',
      title: 'Software Engineer',
      description: 'Designed and developed scalable full-stack enterprise applications, collaborated across cross-functional teams, and delivered reliable software using modern technologies, design patterns, and engineering best practices.',
      icon: 'workspace_premium',
    },
    {
      year: '2016',
      title: 'Junior Software Engineer',
      description: 'Contributed to the development and maintenance of enterprise applications by implementing frontend and backend components, integrating databases, and delivering reliable software solutions within agile teams.',
      icon: 'workspace_premium',
    },
    {
      year: '2015',
      title: 'Trainee Software Engineer',
      description: 'Started my professional journey by building a strong foundation in enterprise application development, programming, database systems, and software engineering best practices.',
      icon: 'workspace_premium',
    }
  ];

  experienceItems: ExperienceItem[] = [
    {
      company: 'Right Angle Solutions, Inc',
      role: 'TECHNICAL LEAD',
      period: 'Sep 2021 - PRESENT',
      description: 'Steered technical strategy and full-stack systems design for high-concurrency enterprise products, designing modular cloud-native architectures, implementing server-side components, and mentoring high-performance engineering teams.'
    },
    {
      company: 'Computer Generated Solutions, Inc',
      role: 'SENIOR SOFTWARE ENGINEER',
      period: 'Mar 2020 - Sep 2021',
      description: 'Led full-stack optimization initiatives, refactoring legacy codebases into modern single-page applications, architecting performant database queries, and streamlining development lifecycle with automated CI/CD pipelines.'
    },
    {
      company: 'Appvirality Technologies, Inc',
      role: 'SOFTWARE ENGINEER',
      period: 'Jun 2018 - Mar 2020',
      description: 'Owned end-to-end full-stack feature delivery, optimizing front-end bundle delivery, engineering real-time data synchronization mechanisms, and integrating secure third-party payment and SaaS platforms.'
    },
    {
      company: 'Kensium Solutions, LLC',
      role: 'JUNIOR SOFTWARE ENGINEER',
      period: 'Jun 2015 - Jun 2018',
      description: 'Began professional career in full-stack engineering, building interactive responsive client interfaces and designing robust relational database schemas and scalable RESTful web APIs.'
    }
  ];

  academicItems: AcademyItem[] = [
    {
      degree: 'Master of Technology in Software Systems (Specialized in Internet of Things)',
      institution: 'BITS Pilani - Hyderabad',
      period: '2023 - 2025',
      description: 'Advanced specialization in edge computing, IoT architectures and distributed cloud systems.'
    },
    {
      degree: 'Bachelor of Technology in Computer Science',
      institution: 'JNTU - Hyderabad',
      period: '2010 - 2014',
      description: 'Acquired core computer science foundations, covering data structures, algorithm design, operating systems, databases, and software engineering methodologies.'
    },
    {
      degree: 'Board of Intermediate Education',
      institution: 'Narayana Junior College',
      period: '2008 - 2010',
      description: 'Focused on Mathematics, Physics, and Chemistry, establishing strong analytical foundations and quantitative problem-solving skills.'
    },
    {
      degree: 'Board of Secondary Education',
      institution: 'Shantiniketan High School',
      period: '2008',
      description: 'Completed secondary education with  a strong baseline focus on mathematics, science, and logical reasoning.'
    }
  ];

  researchPapers: ResearchPaper[] = [
    {
      title: 'Agentic AI Platform for Context-Aware Project Management',
      publication: 'M.Tech Dissertation | BITS Pilani - Hyderabad',
      date: '2025',
      link: '#',
      abstract: 'Architected and developed an Agentic AI platform that transforms conventional project management into an autonomous, context-aware collaboration system. The solution leverages conversational AI to understand natural language requests, proactively coordinate project activities, intelligently assign tasks using a trust-weighted decision model, and monitor project progress in real time.'
    },
    {
      title: 'Enhancing Software Quality Using Cleanroom Software Engineering Techniques',
      publication: 'Independent Research | IIIT - Hyderabad',
      date: '2019',
      link: '#',
      abstract: 'Conducted a research study on the practical application of Cleanroom Software Engineering techniques for improving software quality in enterprise applications. The research evaluated methodologies including Box Structure Specification, Formal Design, Correctness Verification, and Code Inspection to reduce software defects, strengthen architectural quality, and improve maintainability without adopting the complete Cleanroom development lifecycle.'
    },
    {
      title: 'Risk-Aware Secure Routing Framework for Mobile Ad Hoc Networks (MANETs)',
      publication: 'B.Tech Major Project | JNTU - Hyderabad',
      date: '2014',
      link: '#',
      abstract: 'Implemented a security-oriented routing framework for Mobile Ad Hoc Networks (MANETs) to detect and mitigate routing attacks in decentralized wireless environments. The project introduced a risk-aware routing strategy capable of identifying malicious nodes, protecting communication integrity, and improving packet delivery reliability while adapting to dynamically changing network topologies.'
    },
    {
      title: 'Unified Database Interface for Heterogeneous Database Systems',
      publication: 'B.Tech Minor Project | JNTU - Hyderabad',
      date: '2013',
      link: '#',
      abstract: 'Developed a reusable database abstraction framework that provides a unified interface for interacting with multiple relational database management systems. The framework encapsulates database-specific implementations behind a common access layer, simplifying application development, improving maintainability, promoting portability, and enabling seamless integration across heterogeneous database platforms.'
    }
  ];

  certifications: CertificationItem[] = [
    {
      name: 'Microsoft Certified Azure Developer Associate',
      issuer: 'Microsoft Corporation',
      date: '2026'
    },
    {
      name: 'Microsoft Certified DevOps Engineer Expert',
      issuer: 'Microsoft Corporation',
      date: '2026'
    },
    {
      name: 'Microsoft Certified Azure Solutions Architect Expert',
      issuer: 'Microsoft Corporation',
      date: '2026'
    },
    {
      name: 'Microsoft Certified Azure AI Engineer Associate',
      issuer: 'Microsoft Corporation',
      date: '2026'
    },
    {
      name: 'Microsoft Certified Agentic AI Business Solutions Architect',
      issuer: 'Microsoft Corporation',
      date: '2026'
    }
  ];

  // Match the user's provided project objects precisely
  projects: Project[] = [
    {
      title: 'Identity & Access Management Solution',
      name: 'PresTrust Operations Portal',
      type: 'Project',
      clientOrOwner: 'Morris County Preservation Trust Fund',
      role: 'Technical Lead',
      employer: 'Right Angle Solutions, Inc',
      functions: 'Identity & Access Control Module: Architected and executed secure federated authentication, user migrations from Identity Server 4 to Microsoft Entra ID, token claims customization, and background directory synchronization workflows for internal and external constituents.',
      tags: ['Microsoft Azure', 'Service Principal', 'Token Configuration', 'User Groups', 'Angular', '.NET', 'Graph API'],
      link: '#',
      imageUrl: './images/iam_security.jpg',
      category: 'gov'
    },
    {
      title: 'Operations Workflow Automation System',
      name: 'PresTrust Operations Portal',
      type: 'Project',
      clientOrOwner: 'Morris County Preservation Trust Fund',
      role: 'Lead Software Engineer',
      employer: 'Right Angle Solutions, Inc',
      functions: 'Fund Management & Process Automation Module: Engineered automated capital preservation workflows, dynamic notification services, CQRS-based financial state machines, and highly performant data-orchestration layers for public trust funds.',
      tags: ['Angular', '.NET API Microservices', 'Mediator', 'CQRS', 'SQL Server', 'Azure Functions', 'Blob Storage'],
      link: '#',
      imageUrl: './images/workflow_automation.jpg',
      category: 'gov'
    },
    {
      title: 'Healthcare Analytics Tool',
      name: 'VI - Strategy Tool',
      type: 'Project',
      clientOrOwner: 'Vital Incite, Inc',
      role: 'Senior Software Engineer',
      employer: 'Right Angle Solutions, Inc',
      functions: 'Population Health Intelligence Engine: Delivered data-driven clinical strategy visualization tools, population wellness profiling systems, and complex statistical calculation engines to identify and mitigate employer healthcare risks.',
      tags: ['.NET Framework', 'MVC', 'Repository Pattern', 'SQL Server'],
      link: '#',
      imageUrl: './images/healthcare_analytics.jpg',
      category: 'health'
    },
    {
      title: 'Healthcare Configuration Application',
      name: 'VI - Navigator',
      type: 'Project',
      clientOrOwner: 'Vital Incite, Inc',
      role: 'Senior Software Engineer',
      employer: 'Right Angle Solutions, Inc',
      functions: 'Data Pipeline & Orchestration Portal: Designed reusable configuration modules, rule engines, and ETL metadata management structures for ingesting, transforming, and validating diverse healthcare claim sets.',
      tags: ['.NET Framework', 'MVC', 'Repository Pattern', 'SQL Server'],
      link: '#',
      imageUrl: './images/healthcare_config.jpg',
      category: 'health'
    },
    {
      title: 'Product Lifecycle Management System',
      name: 'Blue Cherry Next',
      type: 'Product',
      clientOrOwner: 'Computer Generated Solutions, Inc',
      role: 'Senior Software Engineer',
      employer: 'Computer Generated Solutions, Inc',
      functions: 'Textile Lifecycle & Supply Chain Suite: Programmed modular supply chain, style planning, dynamic product specification, and manufacturing logistics modules, modernizing legacy enterprise systems into responsive web applications.',
      tags: ['Angular', '.NET Framework', 'MVVM', 'SQL Server', 'Silverlight Migration'],
      link: '#',
      imageUrl: './images/product_lifecycle.jpg',
      category: 'enterprise'
    },
    {
      title: 'Sales Engagement Platform',
      name: 'Outplay',
      type: 'Product',
      clientOrOwner: 'Appvirality Technologies, Inc',
      role: 'Software Engineer',
      employer: 'Appvirality Technologies, Inc',
      functions: 'Omnichannel Outreach & Telephony Engine: Built multi-channel sequencing modules (Email, SMS, Voice, LinkedIn actions), integrated email/calendar sync with open/reply tracking, Twilio-based telephony services, and secure billing platforms.',
      tags: ['Angular', '.NET API', 'Gmail', 'Microsoft 365', 'Twilio', 'Salesforce', 'Stripe'],
      link: '#',
      imageUrl: './images/sales_engagement.jpg',
      category: 'enterprise'
    },
    {
      title: 'Payroll Management Application',
      name: 'SafeChoice Payroll',
      type: 'Project',
      clientOrOwner: 'SafeChoice, Inc',
      role: 'Junior Software Engineer',
      employer: 'Kensium Solutions, LLC',
      functions: 'Compensation & Tax Processing Portal: Designed high-precision calculation modules for payroll run execution, direct deposit processing, tax withholding calculations, and employee-employer benefit allocations.',
      tags: ['Angular', '.NET API'],
      link: '#',
      imageUrl: './images/payroll_mgmt.jpg',
      category: 'enterprise'
    },
    {
      title: 'Human Resource Management System',
      name: 'Satellite HR',
      type: 'Product',
      clientOrOwner: 'Kensium Solutions, LLC',
      role: 'Junior Software Engineer',
      employer: 'Kensium Solutions, LLC',
      functions: 'Enterprise HRMS Core Suite: Authored end-to-end recruitment pipelines, attendance/leave tracking engines, performance appraisal systems, dynamic organization chart builders, multi-tenant automated workflows, and template-driven notifications.',
      tags: ['.NET Framework', 'MVC', 'MySQL'],
      link: '#',
      imageUrl: './images/hr_mgmt.jpg',
      category: 'enterprise'
    }
  ];

  filteredProjects = computed(() => {
    const filter = this.currentWorkFilter();
    if (filter === 'all') {
      return this.projects;
    }
    return this.projects.filter((p) => p.category === filter);
  });

  private observer: IntersectionObserver | null = null;

  ngOnInit() {
    if (this.isBrowser) {
      this.startTypingEffect();
      this.setupScrollSpy();
      this.loadSavedMessages();

      // Initialize theme from saved preference (default to dark mode)
      try {
        const savedTheme = localStorage.getItem('portfolio_theme');
        let isDark = true;
        if (savedTheme) {
          isDark = savedTheme === 'dark';
        }
        this.darkMode.set(isDark);
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (e) {
        console.warn('Failed to load saved theme:', e);
      }
    }
  }

  ngOnDestroy() {
    if (this.typingTimer) {
      clearTimeout(this.typingTimer);
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  // Typewriter effect loop
  private startTypingEffect() {
    const run = () => {
      const fullText = this.typeRoles[this.currentRoleIndex];

      if (this.isDeleting) {
        // Erasing
        this.currentChars = fullText.substring(0, this.currentChars.length - 1);
        this.typingText.set(this.currentChars);

        if (this.currentChars === '') {
          this.isDeleting = false;
          this.currentRoleIndex = (this.currentRoleIndex + 1) % this.typeRoles.length;
          this.typingTimer = setTimeout(run, 500); // Wait before typing next
        } else {
          this.typingTimer = setTimeout(run, 40); // Erasing speed
        }
      } else {
        // Typing
        this.currentChars = fullText.substring(0, this.currentChars.length + 1);
        this.typingText.set(this.currentChars);

        if (this.currentChars === fullText) {
          this.isDeleting = true;
          this.typingTimer = setTimeout(run, 1800); // Pause on fully typed word
        } else {
          this.typingTimer = setTimeout(run, 80); // Typing speed
        }
      }
    };
    run();
  }

  // Scrollspy via IntersectionObserver
  private setupScrollSpy() {
    const sections = ['home', 'skills', 'timeline', 'experience', 'work', 'academics', 'research', 'certifications', 'contact'];

    const options = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Trigger when section occupies the sweet spot of viewport
      threshold: 0,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) {
            this.activeSection.set(id);
          }
        }
      });
    }, options);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el && this.observer) {
        this.observer.observe(el);
      }
    });
  }

  // Local Storage support for mock messages
  private loadSavedMessages() {
    try {
      const saved = localStorage.getItem('portfolio_messages');
      if (saved) {
        this.submittedMessages.set(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Failed to load local messages:', e);
    }
  }

  private saveMessage(msg: ContactMessage) {
    try {
      const list = [...this.submittedMessages(), msg];
      this.submittedMessages.set(list);
      localStorage.setItem('portfolio_messages', JSON.stringify(list));
    } catch (e) {
      console.warn('Failed to save message:', e);
    }
  }

  // Smooth scroll
  scrollToSection(id: string) {
    this.mobileMenuOpen.set(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.activeSection.set(id);
    }
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update((v) => !v);
  }

  setWorkFilter(filter: 'all' | 'gov' | 'health' | 'enterprise') {
    this.currentWorkFilter.set(filter);
  }

  // Contact form submission
  submitContactForm() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.contactSubmitting.set(true);
    this.mockAutoReply.set(null);

    // Simulate server side delays
    setTimeout(() => {
      const val = this.contactForm.getRawValue();
      const newMessage = {
        ...val,
        date: new Date().toISOString(),
        id: Math.random().toString(36).substring(2, 9)
      };

      this.saveMessage(newMessage);
      this.contactSubmitting.set(false);
      this.contactSuccess.set(true);
      this.contactForm.reset();

      // Trigger automatic reply in 2 seconds to showcase active responsiveness
      setTimeout(() => {
        this.mockAutoReply.set(
          `Hi ${newMessage.name}! I have successfully received your inquiry about "${newMessage.subject}". A automated clone has saved your message in this device's storage. I'll get back to you at ${newMessage.email} shortly!`
        );
      }, 1500);

    }, 1200);
  }

  dismissSuccess() {
    this.contactSuccess.set(false);
    this.mockAutoReply.set(null);
  }
}
