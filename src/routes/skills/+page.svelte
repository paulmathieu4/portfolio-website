<script lang="ts">
    import GameIconsSkills from '~icons/game-icons/skills'
    import MaterialSymbolsFilterAlt from '~icons/material-symbols/filter-alt'
    import {Progress} from '@skeletonlabs/skeleton-svelte';
    import {
        Chart as ChartJS,
        Filler,
        Legend,
        LineElement,
        PointElement,
        RadarController,
        RadialLinearScale,
        Title,
        Tooltip,
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

    let skillsSortedByArea = [...skills].sort((a, b) => a.area.localeCompare(b.area));
    initializeTechnicalSkillsChartData();

    let sortedSkillsByLevel = skills.sort((a, b) => b.level - a.level);
    let allSkillFilters = ['All', ...Object.values(SkillArea)];
    let activeSkillFilter = 'All';

    // Data for the radar chart
    const data = {
        labels: skillsSortedByArea.map((skill: Skill) => skill.name),
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
        maintainAspectRatio: false,
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
            },
        }
    };

    function initializeTechnicalSkillsChartData() {
        for (let i = 0; i < skillsSortedByArea.length; i++) {
            const currentSkill = skillsSortedByArea[i];
            if (currentSkill.area === SkillArea.Frontend) {
                frontendChartData[i] = currentSkill.level;
            }
            if (currentSkill.area === SkillArea.Backend) {
                backendChartData[i] = currentSkill.level;
            }
            if (currentSkill.area === SkillArea.Database) {
                databaseChartData[i] = currentSkill.level;
            }
            if (currentSkill.area === SkillArea.General) {
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

    function filterByArea(area: string) {
        activeSkillFilter = area;

        if (area === 'All') {
            sortedSkillsByLevel = [...skills].sort((a, b) => b.level - a.level);
        } else {
            sortedSkillsByLevel = [...skills]
                .filter(skill => skill.area.toLowerCase() === area.toLowerCase())
                .sort((a, b) => b.level - a.level);
        }
    }
</script>

<div class="preset-content-width">
    <h1 class="preset-page-title text-center">
        <GameIconsSkills class="inline"/>
        My Skills
    </h1>
    <div
            class="card preset-filled-surface-100-900 border-[1px]  border-surface-200-800 divide-surface-200-800 block divide-y overflow-hidden"
    >
        <article class="space-y-4 p-4">
            <h2 class="h2 text-center">My technical skills</h2>
            <div class="flex items-center justify-center space-x-4"
            >
                <label for="filter-button-group">
                    Filter by type :</label>
                <nav id="filter-button-group" class="btn-group preset-outlined-surface-200-800 flex-col p-2 md:flex-row">
                    {#each allSkillFilters as skillsArea}
                        <button on:click={() => filterByArea(skillsArea)} type="button" class="btn {activeSkillFilter === skillsArea ? 'preset-filled-primary-500 selected-filter' : 'hover:preset-tonal'}">
                            <MaterialSymbolsFilterAlt/>{skillsArea}</button>
                    {/each}
                </nav>
            </div>
            {#each sortedSkillsByLevel as skill}
                <div class="flex items-center space-x-2">
                    <!-- svelte-ignore hydration_attribute_changed -->
                    <img src={skill.iconUrl} alt="skill icon" class="w-6 h-6 "/>
                    <span class="w-80">{formatSkillName(skill.name)}</span>

                    <Progress value={skill.level} max={10} class="w-full">
                        <Progress.Track>
                            <Progress.Range class="bg-primary-500"/>
                        </Progress.Track>
                    </Progress>
                </div>
            {/each}
            <div class="chart-container flex-1 mx-auto">
                <div>
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
        width: 100%;
        max-width: 600px;
        height: 600px;
        position: relative;

        canvas {
            width: 100%;
            height: 100%;
        }
    }

    .selected-filter {
        @apply cursor-auto;
    }
</style>