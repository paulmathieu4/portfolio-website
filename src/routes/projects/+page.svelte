
<script lang="ts">
    import StreamlineUltimateCodingAppsWebsiteAppsBrowserBold
        from '~icons/streamline-ultimate/coding-apps-website-apps-browser-bold';
    import { onMount } from 'svelte';

    // Import all logos
    const logoImages = import.meta.glob('/src/lib/assets/client-logos/*', {
        eager: true,
        import: 'default'
    });

    const logos = Object.values(logoImages);

    let sphere: HTMLDivElement;
    let animationPaused = false;

    // Calculate positions for each logo on the sphere
    function calculatePositions(total: number) {
        const positions = [];
        const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle in radians

        for (let i = 0; i < total; i++) {
            const y = 1 - (i / (total - 1)) * 2; // y goes from 1 to -1
            const radius = Math.sqrt(1 - y * y); // radius at y
            const theta = phi * i; // golden angle increment

            const x = Math.cos(theta) * radius;
            const z = Math.sin(theta) * radius;

            positions.push({ x, y, z });
        }

        return positions;
    }

    onMount(() => {
        const positions = calculatePositions(logos.length);
        let angle = 0;

        function animate() {
            if (!animationPaused) {
                angle += 0.002;
                const cosAngle = Math.cos(angle);
                const sinAngle = Math.sin(angle);

                const logoElements = sphere.children;
                for (let i = 0; i < logoElements.length; i++) {
                    const pos = positions[i];
                    const element = logoElements[i] as HTMLElement;

                    // Rotate positions around a diagonal axis (combining X, Y, and Z rotations)
                    // First rotation (around Y)
                    const y1 = pos.y * cosAngle - pos.z * sinAngle;
                    const z1 = pos.y * sinAngle + pos.z * cosAngle;

                    // Second rotation (around X)
                    const x2 = pos.x * cosAngle - z1 * sinAngle;
                    const z2 = pos.x * sinAngle + z1 * cosAngle;

                    // Final positions
                    const finalX = x2;
                    const finalY = y1;
                    const finalZ = z2;

                    // Convert 3D position to 2D with perspective
                    const scale = (finalZ + 2) / 3; // Scale based on z-position
                    const x = finalX * 150; // Adjust multiplier to change sphere size
                    const y = finalY * 150;

                    element.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
                    element.style.zIndex = Math.floor(scale * 1000).toString();
                    element.style.opacity = scale.toString();
                }
            }
            requestAnimationFrame(animate);
        }

        animate();
    });
</script>

<div class="preset-content-width">
    <h1 class="preset-page-title text-center">
        <StreamlineUltimateCodingAppsWebsiteAppsBrowserBold class="inline"/>
        My Projects
    </h1>

    <div class="sphere-container">
        <div class="sphere" bind:this={sphere}>
            {#each logos as logo (logo)}
                <div class="logo-wrapper">
                    <img
                            src={logo}
                            alt="Client logo"
                            class="logo"
                    />
                </div>
            {/each}
        </div>
    </div>
</div>

<style lang="postcss">

    @reference "../../app.css";

    .sphere-container {
        @apply h-[400px] relative flex items-center justify-center my-12;
        perspective: 1000px;
    }

    .sphere {
        @apply w-full h-full relative;
        transform-style: preserve-3d;
    }

    .logo-wrapper {
        @apply absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2;
        transition: transform 0.1s ease-out;
    }

    .logo {
        @apply w-auto h-12 object-contain transition-all duration-300 hover:scale-110;
        pointer-events: none;
    }

    /* Add responsive adjustments */
    @media (max-width: 640px) {
        .sphere-container {
            @apply h-[300px];
        }

        .logo {
            @apply h-8;
        }
    }
</style>