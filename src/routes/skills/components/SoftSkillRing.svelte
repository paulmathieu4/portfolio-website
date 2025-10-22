<script lang="ts">
    import profilePicture from '$lib/assets/profile-picture.jpg'
    import {softSkills} from "../skills.data";
    // Layout config (tweak to taste)
    const radiusPct = 36;      // % of container width for the ring radius
    const center = {x: 50, y: 50}; // % — container-relative

    const degToRad = (deg: number) => (deg * Math.PI) / 180;

    // Compute polar positions (in % of container)
    const positions = (n: number) =>
        Array.from({length: n}, (_, i) => {
            // Start at -90° so the first chip is at top; rotate clockwise
            const angle = -90 + (360 / n) * i;
            const r = radiusPct;
            let x = center.x + r * Math.cos(degToRad(angle));
            const y = center.y + r * Math.sin(degToRad(angle));
            return {angle, x, y};
        });
</script>

<!-- Wrapper: size is responsive; ring scales with container -->
<div
        class="relative mx-auto grid place-items-center"
        style="width:min(90vw, 40rem); aspect-ratio: 1/1;"
        aria-label="Soft skills around avatar"
>
    <!-- Decorative outer ring -->
    <div class="absolute inset-0 rounded-full ring-1 ring-primary-500" aria-hidden="true"></div>
    <div class="absolute inset-4 rounded-full ring-1 ring-primary-100" aria-hidden="true"></div>

    <!-- SVG lines from center to each skill -->
    <svg class="absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {#each positions(softSkills.length) as p (p.angle)}
            <line
                    x1={center.x} y1={center.y}
                    x2={p.x} y2={p.y}
                    stroke="currentColor"
                    class="text-primary-500"
                    stroke-width="0.3"
            />
            <!-- small dot at end -->
            <circle cx={p.x} cy={p.y} r="0.8" class="fill-white/40"/>
        {/each}
        <!-- soft radial gradient halo -->
        <defs>
            <radialGradient id="halo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="white" stop-opacity="0.12"/>
                <stop offset="100%" stop-color="white" stop-opacity="0"/>
            </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="40" fill="url(#halo)"/>
    </svg>

    <!-- Center avatar -->
    <div class="relative z-10">
        <img
                src={profilePicture}
                alt="Portrait"
                class="h-28 w-28 md:h-32 md:w-32 rounded-full object-cover ring-2 ring-white/20 shadow-xl"
        />
        <!-- Subtle breathing glow -->
        <div class="absolute inset-0 -z-10 rounded-full blur-2xl opacity-60"
             style="background: radial-gradient(30% 30% at 50% 50%, rgba(255,255,255,.18), transparent); animation: pulseGlow 4.5s ease-in-out infinite;">
        </div>
    </div>

    <!-- Skills chips positioned around the ring -->
    {#each positions(softSkills.length) as p, i (p.angle)}
        <span class="badge preset-filled-primary-500 absolute z-20"
              style="left: {p.x}%; top: {p.y}%; transform: translate(-50%, -50%)"
        >{softSkills[i]}</span>
    {/each}
</div>

<style>
    @keyframes pulseGlow {
        0%, 100% {
            transform: scale(1);
            opacity: .6;
        }
        50% {
            transform: scale(1.05);
            opacity: .9;
        }
    }
</style>