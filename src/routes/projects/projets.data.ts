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
    Node = 'Node',
    Nest = 'Nest',
    Express = 'Express',
    Frontend = 'Frontend',
    Backend = 'Backend',
    Java = 'Java',
    CSharp = 'CSharp',
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
        imageUrls: ['/client-logos/air france.png'],
    },
];