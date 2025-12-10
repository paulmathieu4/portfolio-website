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
    import SoftSkillRing from "./components/SoftSkillRing.svelte";
    import SkillsCard from "./components/SkillsCard.svelte";

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
    const chartData = {
        labels: skillsSortedByArea.map((skill: Skill) => skill.name),
        datasets: [
            {
                label: SkillArea.Frontend,
                borderColor: '#ec4899',
                backgroundColor: 'rgba(236,72,153,0.4)',
                data: frontendChartData,
                fill: true,
            },
            {
                label: SkillArea.Backend,
                borderColor: '#32387B',
                backgroundColor: 'rgba(50,56,123,0.4)',
                data: backendChartData,
                fill: true,
            }, {
                label: SkillArea.Database,
                borderColor: '#327b41',
                backgroundColor: 'rgba(50,123,65,0.4)',
                data: databaseChartData,
                fill: true,
            }, {
                label: SkillArea.General,
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
                legend: {
                onClick: () => {} // This disables the native filtering on legend click to prevent conflict with our filtering
            }

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

    let chart: ChartJS;

    onMount(() => {
        if (chartCanvas) {
            chart = new ChartJS(chartCanvas, {
                type: 'radar',
                data: chartData,
                options: radarChartOptions
            });
                    }
                });
                
    // Update the filterByArea function to handle the chart
    function filterByArea(area: string) {
        activeSkillFilter = area;
        
        if (area === 'All') {
            sortedSkillsByLevel = [...skills].sort((a, b) => b.level - a.level);
            // Show all datasets
            if (chart) {
                chart.data.datasets.forEach(dataset => {
                    dataset.hidden = false;
                });
            }
        } else {
            sortedSkillsByLevel = [...skills]
                .filter(skill => skill.area.toLowerCase() === area.toLowerCase())
                .sort((a, b) => b.level - a.level);
        
        // Hide all datasets except the selected one
            if (chart) {
                chart.data.datasets.forEach(dataset => {
                    const datasetLabel = dataset.label?.toLowerCase() || '';
                    dataset.hidden = !datasetLabel.includes(area.toLowerCase());
                });
            }
        }
        
        // Update the chart
        chart?.update();
    }
</script>

<div class="preset-content-width">
    <h1 class="preset-page-title text-center">
        <GameIconsSkills class="inline"/>
        My Skills
    </h1>
    <SkillsCard title="My technical skills">
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
            <div class="flex flex-wrap items-center gap-2">
                <img src={skill.iconUrl} alt="skill icon" class="w-6 h-6 "/>
                <span>{formatSkillName(skill.name)}</span>

                <Progress value={skill.level} max={10}>
                    <Progress.Track>
                        <Progress.Range class="bg-primary-500"/>
                    </Progress.Track>
                </Progress>
            </div>
        {/each}
        <div class="hidden md:block chart-container flex-1 mx-auto">
            <div>
                <canvas bind:this={chartCanvas}></canvas>
            </div>
        </div>
    </SkillsCard>


    <SkillsCard title="My soft skills" class="mt-8">
        <SoftSkillRing/>
    </SkillsCard>
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