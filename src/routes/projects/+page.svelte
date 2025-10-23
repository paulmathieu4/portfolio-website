<script lang="ts">
    import StreamlineUltimateCodingAppsWebsiteAppsBrowserBold
        from '~icons/streamline-ultimate/coding-apps-website-apps-browser-bold';
    import { onMount, onDestroy } from 'svelte';

    // Import all logos
    const logoImages = import.meta.glob('/src/lib/assets/client-logos/*', {
        eager: true,
        import: 'default'
    });
    const logos = Object.values(logoImages);

    let sphere: HTMLDivElement;
    let container: HTMLDivElement;

    // --- interaction / animation state ---
    let animationPaused = false;
    let mouseActive = false;
    let targetRx = 0;       // target rotation around X (pitch)
    let targetRy = 0;       // target rotation around Y (yaw)
    let currentRx = 0;
    let currentRy = 0;
    let autoAngle = 0;
    const autoRotateSpeed = 0.002; // your original slow spin
    const maxMouseAngle = 0.9;     // max radians (~52°) mouse can “tilt” the sphere
    const ease = 0.10;             // easing toward target (0..1)

    type Vec3 = { x: number; y: number; z: number };

    function calculatePositions(total: number): Vec3[] {
        const positions: Vec3[] = [];
        const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle

        for (let i = 0; i < total; i++) {
            const y = 1 - (i / (total - 1)) * 2;     // [-1, 1]
            const radius = Math.sqrt(1 - y * y);
            const theta = phi * i;

            const x = Math.cos(theta) * radius;
            const z = Math.sin(theta) * radius;
            positions.push({ x, y, z });
        }
        return positions;
    }

    // rotate a point by yaw (Y) then pitch (X)
    function rotateYX(v: Vec3, yaw: number, pitch: number): Vec3 {
        // Yaw (around Y)
        const cy = Math.cos(yaw), sy = Math.sin(yaw);
        let x1 = v.x * cy + v.z * sy;
        let z1 = -v.x * sy + v.z * cy;

        // Pitch (around X)
        const cx = Math.cos(pitch), sx = Math.sin(pitch);
        let y2 = v.y * cx - z1 * sx;
        let z2 = v.y * sx + z1 * cx;

        return { x: x1, y: y2, z: z2 };
    }

    onMount(() => {
        const positions = calculatePositions(logos.length);

        function onMouseMove(e: MouseEvent) {
            const rect = container.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;

            // normalized cursor offset from center in [-1, 1]
            const nx = (e.clientX - cx) / (Math.min(rect.width, rect.height) / 2);
            const ny = (e.clientY - cy) / (Math.min(rect.width, rect.height) / 2);

            // clamp
            const clx = Math.max(-1, Math.min(1, nx));
            const cly = Math.max(-1, Math.min(1, ny));

            // map to target angles
            targetRy = clx * maxMouseAngle;   // left/right moves yaw
            targetRx = -cly * maxMouseAngle;  // up/down moves pitch (invert so up = positive pitch)
            mouseActive = true;
        }

        function onMouseLeave() {
            mouseActive = false;
            // Let it gradually ease back to neutral (0,0) while autorotating
            targetRx = 0;
            targetRy = 0;
        }

        container.addEventListener('mousemove', onMouseMove);
        container.addEventListener('mouseleave', onMouseLeave);

        let raf = 0;
        function animate() {
            if (!animationPaused) {
                // ease current toward target
                currentRx += (targetRx - currentRx) * ease;
                currentRy += (targetRy - currentRy) * ease;

                // autorotation around Y (adds to yaw)
                autoAngle += autoRotateSpeed;

                const logoElements = sphere.children as unknown as HTMLElement[];
                for (let i = 0; i < logoElements.length; i++) {
                    const base = positions[i];
                    const rotated = rotateYX(base, autoAngle + currentRy, currentRx);

                    // 2D projection (keep your original mapping)
                    const scale = (rotated.z + 2) / 3; // [~0.33..1]
                    const px = rotated.x * 150;        // sphere radius in px
                    const py = rotated.y * 150;

                    const el = logoElements[i] as HTMLElement;
                    el.style.transform = `translate(${px}px, ${py}px) scale(${scale})`;
                    el.style.zIndex = Math.floor(scale * 1000).toString();
                    el.style.opacity = scale.toString();
                }
            }
            raf = requestAnimationFrame(animate);
        }

        animate();

        onDestroy(() => {
            cancelAnimationFrame(raf);
            container.removeEventListener('mousemove', onMouseMove);
            container.removeEventListener('mouseleave', onMouseLeave);
        });
    });
</script>

<div class="preset-content-width">
    <h1 class="preset-page-title text-center">
        <StreamlineUltimateCodingAppsWebsiteAppsBrowserBold class="inline" />
        My Projects
    </h1>

    <div class="sphere-container" bind:this={container}>
        <div class="sphere" bind:this={sphere}>
            {#each logos as logo (logo)}
                <div class="logo-wrapper">
                    <img src={logo} alt="Client logo" class="logo" />
                </div>
            {/each}
        </div>
    </div>
</div>

<style lang="postcss">
    @reference "../../app.css";

    .sphere-container {
        @apply h-[400px] relative flex items-center justify-center my-12;
        /* Perspective helps depth feel even with the manual scale projection */
        perspective: 1000px;
        cursor: grab;
    }

    .sphere {
        @apply w-full h-full relative;
        transform-style: preserve-3d;
    }

    .logo-wrapper {
        @apply absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2;
        transition: transform 0.08s ease-out;
        will-change: transform;
    }

    .logo {
        @apply w-auto h-12 object-contain transition-all duration-300 hover:scale-110;
        pointer-events: none;
    }

    @media (max-width: 640px) {
        .sphere-container { @apply h-[300px]; }
        .logo { @apply h-8; }
    }
</style>
