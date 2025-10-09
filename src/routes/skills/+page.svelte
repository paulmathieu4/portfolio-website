<script lang="ts">
    import { Radar } from 'svelte-chartjs';

    import {
        Chart as ChartJS,
        Title,
        Tooltip,
        Legend,
        PointElement,
        RadialLinearScale,
        LineElement,
    } from 'chart.js';
    import {type Skill, skills} from './skills.data';

    ChartJS.register(
        Title,
        Tooltip,
        Legend,
        PointElement,
        RadialLinearScale,
        LineElement
    );

    // Data for the line chart
    const data = {
        labels: skills.map((skill: Skill) => skill.name),
        datasets: [
            {
                label: 'Compétences techniques',
                backgroundColor: '#ec4899',
                borderColor: '#ec4899',
                data: skills.map((skill: Skill) => skill.level),
                fill: true,
            }
        ],
    };

</script>

<div class="w-full max-w-2xl mx-auto p-4">
    <Radar {data} options={{ responsive: true, scales: {
        r: {
            suggestedMin: 1,
            suggestedMax: 10
        }
    } }} />
</div>

<style>
    div {
        background: white;
        border-radius: 1rem;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
</style>