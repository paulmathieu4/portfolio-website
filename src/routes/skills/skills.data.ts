export interface Skill {
	name: string | string[] ;
	level: number; // 1 - 10
	areas: SkillArea[];
	iconUrl?: string;
}

export enum SkillArea {
	Frontend = "frontend",
	Backend = "backend",
	General = "general",
	Database = "database"
}


export const skills: Skill[] = [
	{ name: "JavaScript / Typescript", level: 9, areas: [SkillArea.Frontend], iconUrl: "https://api.iconify.design/skill-icons:typescript.svg" },
	{ name: "Angular", level: 10, areas: [SkillArea.Frontend], iconUrl: "https://api.iconify.design/devicon/angular.svg" },
	{ name: "Vue.js", level: 9, areas: [SkillArea.Frontend], iconUrl: "https://api.iconify.design/devicon:vuejs.svg" },
	{ name: "Svelte", level: 5, areas: [SkillArea.Frontend], iconUrl: "https://api.iconify.design/skill-icons:svelte.svg" },
	{ name: "React", level: 6, areas: [SkillArea.Frontend], iconUrl: "https://api.iconify.design/devicon:react.svg" },
	{ name: ["CSS Design Systems", "(Tailwind, Bootstrap, Materialize)"], level: 9, areas: [SkillArea.Frontend], iconUrl: "https://api.iconify.design/vscode-icons:file-type-css.svg" },
	{ name: "Responsive / Adaptive Design", level: 9, areas: [SkillArea.Frontend], iconUrl: "https://api.iconify.design/streamline-ultimate:responsive-design.svg" },
	{ name: "Node.js (NestJS, Express)", level: 9, areas: [SkillArea.Backend], iconUrl: "https://api.iconify.design/vscode-icons:file-type-node.svg" },
	{ name: "Java (SprintBoot, JEE, Grails, Android)", level: 8, areas: [SkillArea.Backend], iconUrl: "https://api.iconify.design/skill-icons:java-light.svg" },
	{ name: "REST API", level: 9, areas: [SkillArea.Backend], iconUrl: "https://api.iconify.design/catppuccin:api-blueprint.svg" },
	{ name: "C# (ASP.NET)", level: 4, areas: [SkillArea.Backend], iconUrl: "https://api.iconify.design/devicon:csharp.svg" },
	{ name: "SQL (MySQL, PostgreSQL, MSSQL)", level: 9, areas: [SkillArea.Database], iconUrl: "https://api.iconify.design/vscode-icons:file-type-sql.svg" },
	{ name: "NoSQL (MongoDB, CouchDB)", level: 7, areas: [SkillArea.Database], iconUrl: "https://api.iconify.design/devicon:mongodb.svg" },
	{ name: "LDAP Directories (OpenLDAP, Microsoft Active Directory)", level: 6, areas: [SkillArea.Database], iconUrl: "https://api.iconify.design/devicon:windows11.svg" },
	{ name: "Software Architecture", level: 9, areas: [SkillArea.General], iconUrl: "https://api.iconify.design/carbon:ibm-global-storage-architecture.svg" },
	{ name: "Scripting (Bash, PowerShell, Perl)", level: 5, areas: [SkillArea.General], iconUrl: "https://api.iconify.design/mdi:script.svg" },
	{ name: "Testing (unit tests, end-to-end)", level: 9, areas: [SkillArea.General], iconUrl: "https://api.iconify.design/streamline-kameleon-color:test-tube.svg" },
	{ name: "Git", level: 9, areas: [SkillArea.General], iconUrl: "https://api.iconify.design/material-icon-theme:git.svg" },
	{ name: "Interactive Map Libraries (MapBox/MapLibre)", level: 8, areas: [SkillArea.General], iconUrl: "https://api.iconify.design/logos:mapbox-icon.svg" },
	{ name: "Design (Photoshop, Figma, Gimp)", level: 5, areas: [SkillArea.General], iconUrl: "https://api.iconify.design/devicon:figma.svg" },
	{ name: "Docker", level: 7, areas: [SkillArea.General], iconUrl: "https://api.iconify.design/skill-icons:docker.svg" },
	{ name: "Application Servers (Tomcat, Firebase, Nginx, WebLogic, IIS)", level: 7, areas: [SkillArea.General], iconUrl: "https://api.iconify.design/streamline-kameleon-color:servers.svg" },
];
