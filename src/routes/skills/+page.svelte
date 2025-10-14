<script lang="ts">
    import {Radar} from 'svelte-chartjs';

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
    import {type Skill, skills} from './skills.data';

    ChartJS.register(
        Title,
        Tooltip,
        Legend,
        PointElement,
        RadialLinearScale,
        LineElement,
        Filler,
    );

    let frontendData: (number | null)[] = Array.from({length: skills.length}, () => null);
    let backendData: (number | null)[] = [...frontendData];
    let databaseData: (number | null)[] = [...frontendData];
    let generalTechData: (number | null)[] = [...frontendData];

    initializeTechnicalSkillsChartData();

    // Data for the line chart
    const data = {
        labels: skills.map((skill: Skill) => skill.name),
        datasets: [
            {
                label: 'Front-end',
                borderColor: '#ec4899',
                backgroundColor: 'rgba(236,72,153,0.4)',
                data: frontendData,
                fill: true,
            },
            {
                label: 'Back-end',
                borderColor: '#32387B',
                backgroundColor: 'rgba(50,56,123,0.4)',
                data: backendData,
                fill: true,
            }, {
                label: 'Databases',
                borderColor: '#327b41',
                backgroundColor: 'rgba(50,123,65,0.4)',
                data: databaseData,
                fill: true,
            }, {
                label: 'General',
                borderColor: '#7b3232',
                backgroundColor: 'rgba(123,50,50,0.4)',
                data: generalTechData,
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
        frontendData = Array.from({length: skills.length}, () => null);
        backendData = [...frontendData];
        databaseData = [...frontendData];
        generalTechData = [...frontendData];

        for (let i = 0; i < skills.length; i++) {
            const currentSkill = skills[i];
            if (currentSkill.areas.includes('frontend')) {
                frontendData[i] = currentSkill.level;
            }
            if (currentSkill.areas.includes('backend')) {
                backendData[i] = currentSkill.level;
            }
            if (currentSkill.areas.includes('database')) {
                databaseData[i] = currentSkill.level;
            }
            if (currentSkill.areas.includes('general')) {
                generalTechData[i] = currentSkill.level;
            }
        }
    }

</script>

<div class="preset-content-width">
    <Radar {data}
           options={radarChartOptions}
           width={400}
           height={660}
    />
</div>

<style>
    div {
        background: white;
        border-radius: 1rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
</style>