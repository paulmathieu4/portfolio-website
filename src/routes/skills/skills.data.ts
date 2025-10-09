export interface Skill {
	name: string | string[] ;
	level: number; // 1 - 10
	areas: SkillArea[];
};

export type SkillArea = "frontend" | "backend" | "technical";

export const skills: Skill[] = [
	{ name: "JavaScript / Typescript", level: 9, areas: ["frontend", "technical"] },
	{ name: "Angular", level: 10, areas: ["frontend", "technical"] },
	{ name: "Vue.js", level: 9, areas: ["frontend", "technical"] },
	{ name: "Svelte", level: 5, areas: ["frontend", "technical"] },
	{ name: "React", level: 6, areas: ["frontend", "technical"] },
	{ name: ["CSS Design Systems", "(Tailwind, Bootstrap, Materialize)"], level: 9, areas: ["frontend", "technical"] },
	{ name: "Responsive / Adaptive Design", level: 9, areas: ["frontend", "technical"] },
];