export interface Skill {
	name: string | string[] ;
	level: number; // 1 - 10
	areas: SkillArea[];
};

export type SkillArea = "frontend" | "backend" | "technical" | "general" | "database" ;

export const skills: Skill[] = [
	{ name: "JavaScript / Typescript", level: 9, areas: ["frontend", "technical"] },
	{ name: "Angular", level: 10, areas: ["frontend", "technical"] },
	{ name: "Vue.js", level: 9, areas: ["frontend", "technical"] },
	{ name: "Svelte", level: 5, areas: ["frontend", "technical"] },
	{ name: "React", level: 6, areas: ["frontend", "technical"] },
	{ name: ["CSS Design Systems", "(Tailwind, Bootstrap, Materialize)"], level: 9, areas: ["frontend", "technical"] },
	{ name: "Responsive / Adaptive Design", level: 9, areas: ["frontend", "technical"] },
	{ name: "Node.js (NestJS, Express)", level: 9, areas: ["backend", "technical"] },
	{ name: "Java (SprintBoot, JEE, Grails, Android)", level: 8, areas: ["backend", "technical"] },
	{ name: "REST API", level: 9, areas: ["backend", "technical"] },
	{ name: "C# (ASP.NET)", level: 4, areas: ["backend", "technical"] },
	{ name: "SQL (MySQL, PostgreSQL, MSSQL)", level: 9, areas: ["database", "technical"] },
	{ name: "NoSQL (MongoDB, CouchDB)", level: 7, areas: ["database", "technical"] },
	{ name: "LDAP Directories (OpenLDAP, Microsoft Active Directory)", level: 6, areas: ["database", "technical"] },
	{ name: "Software Architecture", level: 9, areas: ["general", "technical"] },
	{ name: "Scripting (Bash, PowerShell, Perl)", level: 5, areas: ["general", "technical"] },
	{ name: "Testing (unit tests, end-to-end)", level: 9, areas: ["general", "technical"] },
	{ name: "Git", level: 9, areas: ["general", "technical"] },
	{ name: "Interactive Map Libraries (MapBox/MapLibre)", level: 8, areas: ["general", "technical"] },
	{ name: "Design (Photoshop, Figma, Gimp)", level: 5, areas: ["general", "technical"] },
	{ name: "Docker", level: 7, areas: ["general", "technical"] },
	{ name: "Application Servers (Tomcat, Firebase, Nginx, WebLogic, IIS)", level: 7, areas: ["general", "technical"] },
];