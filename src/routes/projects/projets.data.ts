export interface Project {
    title: string;
    clientName: string;
    clientLogoUrl: string;
    startDate: Date;
    endDate: Date;
    context: string;
    description: string;
    activities: string[];
    roles: ProjectRole[];
    tags: ProjectTag[];
    imageUrls?: string[];
}

export enum ProjectTag {
    Angular = 'Angular',
    Vue = 'Vue',
    React = 'React',
    Node = 'Node.js',
    Nest = 'Nest',
    Express = 'Express',
    Frontend = 'Frontend',
    Backend = 'Backend',
    Java = 'Java',
    PHP = 'PHP',
    MapBox = 'MapBox',
    Scrum = 'Scrum (agile)',
    CouchDB = 'CouchDB',
    NoSQL = 'NoSQL',
    SQL = 'SQL',
    Perl = 'Perl',
    Grails = 'Grails',
    MySQL = 'MySQL',
    LDAP = 'LDAP',
    MIM = 'MIM (Microsoft Identity Manager)',
    PowerShell = 'PowerShell',
    DotNet = '.NET',
    WindowsForms = 'Windows Forms',
}

export enum ProjectRole {
    FullStackDeveloper = 'Full Stack Developer',
    ScrumMaster = 'Scrum Master',
    LeadDeveloper = 'Lead Developer',
    FrontendDeveloper = 'Frontend Developer',
    BackendDeveloper = 'Backend Developer',
}

export const projects: Project[] = [
    {
        title: 'Redesign of Lost Baggage Management Applications',
        clientName: 'Air France',
        clientLogoUrl: '/client-logos/air france.png',
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-05-01'),
        context: 'Air France had a suite of applications dedicated to lost baggage management that required both functional and technical modernization.',
        description: 'Development of new features as part of a full application redesign.',
        activities: [
            'Built an interactive neighborhood explorer (shops, transport, natural hazards, properties for sale)',
            'Developed an advanced PDF generator/editor with inline editing capabilities'],
        roles: [ProjectRole.FullStackDeveloper, ProjectRole.LeadDeveloper],
        tags: [ProjectTag.Angular, ProjectTag.Java],
    },
    {
        title: 'Development of a Real Estate Estimator and Explorer',
        clientName: 'Septeo PROPTECH (ex Kinaxia)',
        clientLogoUrl: '/client-logos/septeo proptech.png',
        startDate: new Date('2022-07-01'),
        endDate: new Date('2023-12-30'),
        context: 'Providing real estate agents with an application to accurately estimate property values based on location and characteristics. The tool also generated client-ready documents highlighting the property and neighborhood strengths.',
        description: 'Development of a complex application for real estate agents.',
        activities: [
            'Built an interactive neighborhood explorer (shops, transport, natural hazards, properties for sale)',
            'Developed an advanced PDF generator/editor with inline editing capabilities'
        ],
        roles: [ProjectRole.FullStackDeveloper],
        tags: [ProjectTag.Angular, ProjectTag.Vue, ProjectTag.Backend, ProjectTag.Frontend, ProjectTag.PHP, ProjectTag.MapBox, ProjectTag.Scrum],
        imageUrls: ['/project-images/cityscan/cityscan1.jpg', '/project-images/cityscan/cityscan2.jpg', '/project-images/cityscan/cityscan3.jpg']
    },
    {
        title: 'Development of a Real Estate Leads Management Application',
        clientName: 'Septeo PROPTECH (ex Kinaxia)',
        clientLogoUrl: '/client-logos/septeo proptech.png',
        startDate: new Date('2022-01-01'),
        endDate: new Date('2022-06-30'),
        context: 'Leveraging data from an external application to identify potential sellers and resell those leads to real estate agencies.',
        description: 'Independent development of a real estate leads management application.',
        activities: [
            'Designed and implemented a back-end with NestJS from scratch',
            'Developed a front-end Angular application from scratch'
        ],
        roles: [ProjectRole.FullStackDeveloper],
        tags: [ProjectTag.Angular, ProjectTag.Nest, ProjectTag.Node, ProjectTag.Backend, ProjectTag.Frontend],
    },
    {
        title: 'Development of a Technical Documentation Management Application for Helicopters',
        clientName: 'Airbus Helicopters, via consulting firm Alten',
        clientLogoUrl: '/client-logos/airbus helicopter.png',
        startDate: new Date('2021-07-01'),
        endDate: new Date('2021-10-31'),
        context: 'The helicopter documentation management system suffered from performance issues in search and required a redesign.',
        description: 'Redesign of the business application for managing technical documents (user manuals, maintenance, etc.).',
        activities: [
            'Developed the back-end with Node.js (NestJS) and CouchDB',
            'Built a real-time synchronization bot between SQL and NoSQL databases (CRUD propagation and relational-to-document model transformation)'
        ],
        roles: [ProjectRole.LeadDeveloper],
        tags: [ProjectTag.Nest, ProjectTag.Node, ProjectTag.Backend, ProjectTag.CouchDB, ProjectTag.NoSQL],
    },
    {
        title: 'Development of an Internal Vehicle Rental Application',
        clientName: 'Mercedes, via consulting firm Alten',
        clientLogoUrl: '/client-logos/Mercedes_Benz_logo_2011.svg',
        startDate: new Date('2021-03-01'),
        endDate: new Date('2021-05-31'),
        context: 'An internal application developed by an external provider failed to meet deadlines and quality standards.',
        description: 'Stabilization and preparation of the application for production release.',
        activities: [
            'Fixed critical bugs to improve reliability',
            'Performed complete code refactoring to ensure maintainability',
            'Integrated new features'
        ],
        roles: [ProjectRole.FrontendDeveloper],
        tags: [ProjectTag.Angular, ProjectTag.SQL],
    },
    {
        title: 'Development of a Project Management Software',
        clientName: 'Mane, via consulting firm Alten',
        clientLogoUrl: '/client-logos/mane.png',
        startDate: new Date('2020-08-01'),
        endDate: new Date('2020-12-31'),
        context: 'Mane, a fragrance and flavors company, was using an outdated project management tool and required a modern, high-performance solution.',
        description: 'End-to-end development of a custom web-based project management application.',
        activities: [
            'Developed project and task management web pages',
            'Built an interactive Gantt chart',
            'Implemented a dashboard with key indicators',
            'As Scrum Master: facilitated agile ceremonies (retrospectives, demos), supported and unblocked the team'
        ],
        roles: [ProjectRole.FrontendDeveloper, ProjectRole.ScrumMaster],
        tags: [ProjectTag.Angular],
    },
    {
        title: 'Development of an Antivirus Management Interface for Naval Ships',
        clientName: 'NAVAL GROUP, via consulting firm Alten',
        clientLogoUrl: '/client-logos/naval group svg.png',
        startDate: new Date('2020-04-01'),
        endDate: new Date('2020-07-30'),
        context: 'Naval Group required a graphical interface for an antivirus solution on naval vessels, enabling remote cybersecurity procedures.',
        description: 'Development of the user interface of a web application for cybersecurity management and remote execution.',
        activities: [
            'Set up the software architecture',
            'Supervised and supported junior developers',
            'Conducted code reviews and provided technical mentorship',
            'Authored technical specifications'
        ],
        roles: [ProjectRole.LeadDeveloper],
        tags: [ProjectTag.Angular],
    },
    {
        title: 'Development of a Flight Comparison Tool',
        clientName: 'Amadeus, via consulting firm Alten',
        clientLogoUrl: '/client-logos/Amadeus_(CRS)_Logo.svg.png',
        startDate: new Date('2018-05-01'),
        endDate: new Date('2020-03-31'),
        context: 'Amadeus, a global leader in travel solutions, aimed to enhance travel agencies\' user experience with a new flight search and booking module.',
        description: 'Development of an advanced module for flight search, comparison, and booking.',
        activities: [
            'Developed a modern front-end and a new back-end module',
            'Implemented automated testing (unit and end-to-end) for robustness and reliability',
            'Wrote detailed technical specifications',
            'Improved internal processes and tooling to optimize the development workflow'
        ],
        roles: [ProjectRole.FullStackDeveloper],
        tags: [ProjectTag.Angular, ProjectTag.Java],
    },
    {
        title: 'Maintenance and Enhancements of Engie\'s Identity and Access Management Application',
        clientName: 'Engie, via consulting firm Accenture (ex Arismore)',
        clientLogoUrl: '/client-logos/engie.png',
        startDate: new Date('2014-01-01'),
        endDate: new Date('2015-12-31'),
        context: 'Engie used a critical IAM (Identity and Access Management) solution for employees that required maintenance and upgrades.',
        description: 'Application maintenance, support, and functional evolutions of the IAM solution.',
        activities: [
            'Upgraded CA Identity Manager version',
            'Implemented specific functional enhancements',
            'Provided technical support'
        ],
        roles: [ProjectRole.FullStackDeveloper],
        tags: [ProjectTag.Java, ProjectTag.Perl],
    },
    {
        title: 'Development of an Internal Business Process Management Tool',
        clientName: 'Accenture (ex Arismore), en CDI',
        clientLogoUrl: '/client-logos/accenture.png',
        startDate: new Date('2015-07-01'),
        endDate: new Date('2015-09-30'),
        context: 'Application onboarding to the IAM system was tracked manually via Excel and required industrialization.',
        description: 'Development of a web application to streamline process tracking.',
        activities: [
            'Developed a web application with dynamic task lists',
            'Implemented task tracking, history, and reporting features'
        ],
        roles: [ProjectRole.FullStackDeveloper],
        tags: [ProjectTag.Java, ProjectTag.Grails, ProjectTag.MySQL],
    },
    {
        title: 'Développement et intégration d\'un portail de gestion des identités et des accès',
        clientName: 'Crédit Agricole, via ESN Accenture (ex Arismore)',
        clientLogoUrl: '/client-logos/credit agricole.png',
        startDate: new Date('2016-09-01'),
        endDate: new Date('2017-01-31'),
        context: 'Le Crédit Agricole souhaitait raccorder l\'ensemble de ses applications à un système central de gestion des accès.',
        description: 'Mise en place d\'un portail web et d\'exports réguliers pour alimenter le SI.',
        activities: [
            'Migration des données utilisateurs vers LDAP',
            'Développement d\'un portail web centralisé pour la gestion des comptes et autorisations'
        ],
        roles: [ProjectRole.FullStackDeveloper],
        tags: [ProjectTag.Java, ProjectTag.LDAP, ProjectTag.MIM],
    },
    {
        title: 'Migration du système de messagerie interne',
        clientName: 'EDF, via ESN Accenture (ex Arismore)',
        clientLogoUrl: '/client-logos/edf.png',
        startDate: new Date('2016-05-01'),
        endDate: new Date('2016-08-31'),
        context: 'EDF souhaitait migrer son gestionnaire d\'e-mails de Lotus Notes vers Outlook/Exchange.',
        description: 'Migration technique et mise en place d\'une nouvelle infrastructure Exchange.',
        activities: [
            'Maintenance et évolution du moteur de synchronisation des boîtes mails',
            'Configuration du logiciel « Firefront Identity Manager 2010 »',
            'Développement de scripts PowerShell pour automatiser la gestion des comptes',
            'Développement d\'une application web de suivi en temps réel des migrations'
        ],
        roles: [ProjectRole.FullStackDeveloper],
        tags: [ProjectTag.PowerShell, ProjectTag.DotNet, ProjectTag.MIM],
    },
    {
        title: 'Développement d\'un outil de gestion d\'imprimantes',
        clientName: 'Banque de France, via ESN Accenture (ex Arismore)',
        clientLogoUrl: '/client-logos/banque de france.png',
        startDate: new Date('2016-03-01'),
        endDate: new Date('2016-04-30'),
        context: 'La Banque de France souhaitait faciliter la gestion et le paramétrage de son parc d\'imprimantes spécialisées.',
        description: 'Développement d\'une application Windows lourde pour configurer et superviser les imprimantes internes.',
        activities: [
            'Développement des écrans de paramétrage (connectivité, files d\'attente, options spécifiques)',
            'Implémentation de la logique métier et contrôle des configurations',
            'Mise en place de tests unitaires et documentation technique',
            'Collaboration avec Accenture et Banque de France pour la recette et la mise en production'
        ],
        roles: [ProjectRole.BackendDeveloper],
        tags: [ProjectTag.WindowsForms],
    },
];