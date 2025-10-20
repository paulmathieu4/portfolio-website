<script lang="ts">
    import GameIconsSkills from '~icons/game-icons/skills'
    import MaterialSymbolsFilterAlt from '~icons/material-symbols/filter-alt'
    import { Progress } from '@skeletonlabs/skeleton-svelte';
    import {
        Chart as ChartJS,
        Title,
        Tooltip,
        Legend,
        PointElement,
        RadialLinearScale,
        LineElement,
        Filler, RadarController,
    } from 'chart.js';
    import {type Skill, SkillArea, skills} from './skills.data';
    import {onMount} from 'svelte';

    ChartJS.register(
        Title,
        Tooltip,
        Legend,
        PointElement,
        RadialLinearScale,
        LineElement,
        Filler,
        RadarController
    );

    let frontendChartData: (number | null)[] = Array.from({length: skills.length}, () => null);
    let backendChartData: (number | null)[] = [...frontendChartData];
    let databaseChartData: (number | null)[] = [...frontendChartData];
    let generalTechChartData: (number | null)[] = [...frontendChartData];
    let chartCanvas: HTMLCanvasElement;

    initializeTechnicalSkillsChartData();

    let sortedSkills = skills.sort((a, b) => b.level - a.level);
    let allSkillFilters = ['All', ...Object.values(SkillArea)];
    let activeSkillFilter = 'All';

    // Data for the radar chart
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
        responsive: true,
        maintainAspectRatio: true,
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

    onMount(() => {
        if (chartCanvas) {
            new ChartJS(chartCanvas, {
                type: 'radar',
                data,
                options: radarChartOptions
            });
        }
    });

</script>

<div>

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
                <div id="filter-button-group" class=" preset-tonal-primary border border-primary-500">
                    {#each allSkillFilters as skillsArea}
                        <button class="{activeSkillFilter === skillsArea ? 'selected-filter preset-filled-primary-500' : ''}">
                            <MaterialSymbolsFilterAlt/>{skillsArea}</button>
                    {/each}
                </div>
            </div>

            {#each sortedSkills as skill}
                <div class="flex items-center space-x-2">
                    <img src={skill.iconUrl} alt="skill icon" class="w-6 h-6 "/>
                    <span class="w-80">{formatSkillName(skill.name)}</span>

                    <Progress value={skill.level} max={10} class="w-full">
                        <Progress.Track>
                            <Progress.Range class="bg-primary-500" />
                        </Progress.Track>
                    </Progress>
                </div>
            {/each}
            <div class="chart-container flex-1" style="height: 800px; width: 800px;">
                <div class="mx-auto" style="position: relative;">
                    <canvas bind:this={chartCanvas}></canvas>
                </div>
            </div>
        </article>
    </div>
</div>

<style>
    .chart-container {
        background: white;
        border-radius: 1rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        padding: 1rem;
    }

    .selected-filter {
        @apply cursor-auto;
    }
</style>