<script lang="ts">
    import profilePicture from '$lib/assets/profile-picture.jpg'
    export let skills: { label: string; emoji?: string; blurb?: string }[] = [
        { label: "Clarity", emoji: "🧭", blurb: "Turns complexity into clear next steps." },
        { label: "Empathy", emoji: "💬", blurb: "Listens first, then aligns the team." },
        { label: "Curiosity", emoji: "🔎", blurb: "Explores new tools & patterns." },
        { label: "Leadership", emoji: "🧠", blurb: "Mentors, unblocks, sets pace." },
        { label: "Calm", emoji: "🌿", blurb: "Steady under pressure." },
        { label: "Ownership", emoji: "🎯", blurb: "End-to-end accountability." },
        { label: "Adaptability", emoji: "🌊", blurb: "Comfortable with change." },
        { label: "Creativity", emoji: "✨", blurb: "Finds elegant solutions." }
    ];

    // Layout config (tweak to taste)
    const radiusPct = 36;      // % of container width for the ring radius
    const chipOffset = 14;     // px offset to pull chips outward from the dot
    const center = { x: 50, y: 50 }; // % — container-relative

    const degToRad = (deg: number) => (deg * Math.PI) / 180;

    // Compute polar positions (in % of container)
    const positions = (n: number) =>
        Array.from({ length: n }, (_, i) => {
            // Start at -90° so the first chip is at top; rotate clockwise
            const angle = -90 + (360 / n) * i;
            const r = radiusPct;
            const x = center.x + r * Math.cos(degToRad(angle));
            const y = center.y + r * Math.sin(degToRad(angle));
            return { angle, x, y };
        });
</script>

<!-- Wrapper: size is responsive; ring scales with container -->
<div
        class="relative mx-auto grid place-items-center"
        style="width:min(90vw, 32rem); aspect-ratio: 1/1;"
        aria-label="Soft skills around avatar"
>
    <!-- Decorative outer ring -->
    <div class="absolute inset-0 rounded-full ring-1 ring-white/10" aria-hidden="true"></div>
    <div class="absolute inset-4 rounded-full ring-1 ring-white/5" aria-hidden="true"></div>

    <!-- SVG lines from center to each skill -->
    <svg class="absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {#each positions(skills.length) as p}
            <line
                    x1={center.x} y1={center.y}
                    x2={p.x} y2={p.y}
                    stroke="currentColor"
                    class="text-white/10"
                    stroke-width="0.3"
            />
            <!-- small dot at end -->
            <circle cx={p.x} cy={p.y} r="0.8" class="fill-white/40" />
        {/each}
        <!-- soft radial gradient halo -->
        <defs>
            <radialGradient id="halo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="white" stop-opacity="0.12" />
                <stop offset="100%" stop-color="white" stop-opacity="0" />
            </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="40" fill="url(#halo)" />
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
    {#each positions(skills.length) as p, i}
        {#key i}
            <button
                    class="group absolute z-20 select-none"
                    style="
          left: {p.x}%;
          top: {p.y}%;
          transform: translate(-50%, -50%) translateY(-{chipOffset}px);
        "
                    aria-label={`${skills[i].label}${skills[i].blurb ? `: ${skills[i].blurb}` : ''}`}
            >
        <span
                class="chip inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5
                 text-sm text-white/90 backdrop-blur-sm shadow-sm
                 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10 hover:border-white/20
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        >
          {#if skills[i].emoji}<span class="text-base leading-none">{skills[i].emoji}</span>{/if}
            <span class="font-medium">{skills[i].label}</span>
        </span>

                <!-- Tooltip -->
                {#if skills[i].blurb}
          <span
                  class="pointer-events-none absolute left-1/2 top-full mt-2 w-max max-w-[14rem] -translate-x-1/2
                   scale-95 opacity-0 rounded-lg bg-zinc-900/90 px-3 py-2 text-xs text-white/90 shadow-lg
                   ring-1 ring-white/10 transition-all duration-150
                   group-hover:opacity-100 group-hover:scale-100 group-focus-within:opacity-100 group-focus-within:scale-100"
                  role="tooltip"
          >
            {skills[i].blurb}
          </span>
                {/if}
            </button>
        {/key}
    {/each}
</div>

<style>
    @keyframes pulseGlow {
        0%, 100% { transform: scale(1); opacity: .6; }
        50%      { transform: scale(1.05); opacity: .9; }
    }
</style>