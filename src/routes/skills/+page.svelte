<script lang="ts">
    import {Radar} from 'svelte-chartjs';
    import GameIconsSkills from '~icons/game-icons/skills'
    import MaterialSymbolsFilterAlt from '~icons/material-symbols/filter-alt'


    import {
        Chart as ChartJS,
        Title,
        Tooltip,
        Legend,
        PointElement,
        RadialLinearScale,
        LineElement,
        Filler,
    } from 'chart.js';
    import {type Skill, SkillArea, skills} from './skills.data';
    import {ProgressBar} from "@skeletonlabs/skeleton";

    ChartJS.register(
        Title,
        Tooltip,
        Legend,
        PointElement,
        RadialLinearScale,
        LineElement,
        Filler,
    );

    let frontendChartData: (number | null)[] = Array.from({length: skills.length}, () => null);
    let backendChartData: (number | null)[] = [...frontendChartData];
    let databaseChartData: (number | null)[] = [...frontendChartData];
    let generalTechChartData: (number | null)[] = [...frontendChartData];

    initializeTechnicalSkillsChartData();

    let sortedSkills = skills.sort((a, b) => b.level - a.level);
    let allSkillFilters = ['All', ...Object.values(SkillArea)];
    let activeSkillFilter = 'All';

    // Data for the line chart
    const data = {
        labels: skills.map((skill: Skill) => skill.name),
        datasets: [
            {
                label: 'Front-end',
                borderColor: '#ec4899',
                backgroundColor: 'rgba(236,72,153,0.4)',
                data: frontendChartData,
                fill: true,
            },
            {
                label: 'Back-end',
                borderColor: '#32387B',
                backgroundColor: 'rgba(50,56,123,0.4)',
                data: backendChartData,
                fill: true,
            }, {
                label: 'Databases',
                borderColor: '#327b41',
                backgroundColor: 'rgba(50,123,65,0.4)',
                data: databaseChartData,
                fill: true,
            }, {
                label: 'General',
                borderColor: '#7b3232',
                backgroundColor: 'rgba(123,50,50,0.4)',
                data: generalTechChartData,
                fill: true,
            },
        ],
    };

    const radarChartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            r: {
                suggestedMin: 1,
                suggestedMax: 10
            }
        },
        plugins: {
            title: {
                text: 'Technical Skills',
                display: true,
            }
        }
    };

    function initializeTechnicalSkillsChartData() {
        frontendChartData = Array.from({length: skills.length}, () => null);
        backendChartData = [...frontendChartData];
        databaseChartData = [...frontendChartData];
        generalTechChartData = [...frontendChartData];

        for (let i = 0; i < skills.length; i++) {
            const currentSkill = skills[i];
            if (currentSkill.areas.includes('frontend')) {
                frontendChartData[i] = currentSkill.level;
            }
            if (currentSkill.areas.includes('backend')) {
                backendChartData[i] = currentSkill.level;
            }
            if (currentSkill.areas.includes('database')) {
                databaseChartData[i] = currentSkill.level;
            }
            if (currentSkill.areas.includes('general')) {
                generalTechChartData[i] = currentSkill.level;
            }
        }
    }

    function formatSkillName(skill: string | string[]) {
        if (typeof skill === 'string') {
            return skill;
        }
        return [...skill].join(' ');
    }

</script>

<div class="preset-content-width">
    <h1 class="preset-page-title text-center">
        <GameIconsSkills class="inline"/>
        My Skills
    </h1>
    <div
            class="card preset-filled-surface-100-900 border-[1px]  border-surface-200-800 card-hover divide-surface-200-800 block divide-y overflow-hidden"
    >
        <article class="space-y-4 p-4">
            <h2 class="h2 text-center">My technical skills</h2>
            <div class="flex items-center justify-center space-x-4"
            >
                <label for="filter-button-group">
                    Filter by type :</label>
                <div id="filter-button-group" class="btn-group variant-ghost-primary">
                    {#each allSkillFilters as skillsArea}
                        <button class="{activeSkillFilter === skillsArea ? 'selected-filter' : ''}"><MaterialSymbolsFilterAlt/>{skillsArea}</button>
                    {/each}
                </div>
            </div>

            {#each sortedSkills as skill}
                <div class="flex items-center space-x-2">
                    <img src={skill.iconUrl} alt="skill icon" class="w-6 h-6 "/>
                    <span class="w-80">{formatSkillName(skill.name)}</span>
                    <ProgressBar meter="bg-primary-500" value={skill.level} max={10}/>
                </div>
            {/each}
            <div class="chart-container flex-1">
                <Radar {data}
                       height={600}
                       options={radarChartOptions}
                />
            </div>
        </article>
    </div>
</div>


<style>
    .chart-container {
        background: white;
        border-radius: 1rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .selected-filter {
        @apply variant-filled-primary cursor-auto;
    }
</style>