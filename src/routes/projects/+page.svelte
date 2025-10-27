<script lang="ts">
	import StreamlineUltimateCodingAppsWebsiteAppsBrowserBold from '~icons/streamline-ultimate/coding-apps-website-apps-browser-bold';
	import { onMount, onDestroy } from 'svelte';
	import { projects } from './projets.data';
	import Carousel from './components/Carousel.svelte';
	

	// Function to format project dates and calculate duration
	function formatProjectDates(startDate: Date, endDate: Date): string {
		const startMonth = startDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
		const endMonth = endDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
		
		// Calculate duration in months
		const yearDiff = endDate.getFullYear() - startDate.getFullYear();
		const monthDiff = endDate.getMonth() - startDate.getMonth();
		const totalMonths = yearDiff * 12 + monthDiff;
		
		return `${startMonth} - ${endMonth} (${totalMonths} months)`;
	}

	// Logo paths from static folder
	const logos = [
		'/client-logos/accenture.png',
		'/client-logos/air france.png',
		'/client-logos/airbus helicopter.png',
		'/client-logos/Amadeus_(CRS)_Logo.svg.png',
		'/client-logos/banque de france.png',
		'/client-logos/credit agricole.png',
		'/client-logos/edf.png',
		'/client-logos/engie.png',
		'/client-logos/mane.png',
		'/client-logos/Mercedes_Benz_logo_2011.svg',
		'/client-logos/naval group svg.png'
	];

	let sphere: HTMLDivElement;
	let container: HTMLDivElement;

	// --- interaction / animation state ---
	let animationPaused = false;
	let mouseActive = false;
	let targetRx = 0; // target rotation around X (pitch)
	let targetRy = 0; // target rotation around Y (yaw)
	let currentRx = 0;
	let currentRy = 0;
	let autoAngle = 0;
	const autoRotateSpeed = 0.002; // your original slow spin
	const maxMouseAngle = 0.9; // max radians (~52°) mouse can “tilt” the sphere
	const ease = 0.1; // easing toward target (0..1)

	type Vec3 = { x: number; y: number; z: number };

	function calculatePositions(total: number): Vec3[] {
		const positions: Vec3[] = [];
		const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle

		for (let i = 0; i < total; i++) {
			const y = 1 - (i / (total - 1)) * 2; // [-1, 1]
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
		const cy = Math.cos(yaw),
			sy = Math.sin(yaw);
		let x1 = v.x * cy + v.z * sy;
		let z1 = -v.x * sy + v.z * cy;

		// Pitch (around X)
		const cx = Math.cos(pitch),
			sx = Math.sin(pitch);
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
			targetRy = clx * maxMouseAngle; // left/right moves yaw
			targetRx = -cly * maxMouseAngle; // up/down moves pitch (invert so up = positive pitch)
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
					const px = rotated.x * 150; // sphere radius in px
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
	<div class="grid grid-cols-2 gap-4">
		<div class="card preset-tonal-primary p-4">
			<article class="space-y-4 p-4">
				<div>
					<h2 class="preset-typo-subtitle">Overview</h2>
				</div>
				<div class="flex flex-nowrap justify-between">
					<h3 class="font-bold">Number of projects :</h3>
					<div>13</div>
				</div>
				<div class="flex flex-nowrap justify-between">
					<h3 class="font-bold">Most used technologies :</h3>
					<div>Angular (8), Vuejs (5)</div>
				</div>
			</article>
		</div>
		<div class="circle-card bg-white">
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
	</div>
	<div>
		{#each projects as project}
			<div
				class="block max-w-[600px] divide-y divide-surface-800 overflow-hidden card border-[1px] border-surface-200-800 preset-filled-primary-500"
			>
				<article class="space-y-4 py-4">
					<div>
                        <div class="px-4">
                            <h3 class="mb-2 text-center h3">{project.title}</h3><div class="mb-2 text-center">
								<p class="italic">{formatProjectDates(project.startDate, project.endDate)}</p>
							</div>
                        </div>
						<hr class="mt-2 mb-4 hr" />
						
						<div class="mb-2 flex flex-nowrap items-center justify-center gap-2">
							<img src={project.clientLogoUrl} class="h-12 max-w-[180px]" alt="client logo" />
							<h2 class="text-center h6 italic">- {project.clientName}</h2>
						</div>
						<div class="grid grid-cols-2 gap-2 px-4">
							<div>
								<div class="card-subtitle">My roles :</div>
								<div class="flex items-center justify-start gap-2">
									{#each project.roles as role}
										<span class="badge preset-filled-tertiary-500">{role}</span>
									{/each}
								</div>
							</div>
							<div>
								<div class="card-subtitle">Tags :</div>
								<div class="flex items-center justify-start gap-2">
									{#each project.tags as tag}
										<span class="badge preset-filled-secondary-500">{tag}</span>
									{/each}
								</div>
							</div>
						</div>
					</div>
					<hr class="hr" />
                    <div class="px-4 text-justify">
                        <p class="mb-2">
                            <span class="card-subtitle mr-2">Context :</span>{project.context}
							<span class="card-subtitle mr-2">Description :</span>{project.description}
                        </p>
                        <ul class="list-inside list-disc">
                            {#each project.activities as activity}
                                <li>{activity}</li>
                            {/each}
                        </ul>
                    </div>
				</article>
				{#if project.imageUrls && project.imageUrls.length > 0}
					<footer class="flex items-center justify-between gap-4 p-4">
						<Carousel imageUrls={project.imageUrls ?? []} />
					</footer>
				{/if}
			</div>
		{/each}
	</div>
</div>

<style lang="postcss">
	@reference "../../app.css";

	.card-subtitle {
		@apply text-lg font-semibold;
	}

	.circle-card {
		@apply flex items-center justify-center rounded-full;
		width: 400px;
		height: 400px;
		overflow: hidden;
		box-shadow:
			0 4px 6px -1px rgb(0 0 0 / 0.1),
			0 2px 4px -2px rgb(0 0 0 / 0.1);
	}

	.sphere-container {
		@apply relative my-12 flex h-[300px] w-[300px] items-center justify-center;
		/* Perspective helps depth feel even with the manual scale projection */
		perspective: 1000px;
		cursor: grab;
	}

	.sphere {
		@apply relative h-full w-full;
		transform-style: preserve-3d;
	}

	.logo-wrapper {
		@apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2;
		transition: transform 0.08s ease-out;
		will-change: transform;
	}

	.logo {
		@apply h-12 w-auto object-contain transition-all duration-300 hover:scale-110;
		pointer-events: none;
	}

	@media (max-width: 640px) {
		.sphere-container {
			@apply h-[300px];
		}
		.logo {
			@apply h-8;
		}
	}
</style>
