<script lang="ts">
	import MaterialSymbolsArrowCircleLeft from '~icons/material-symbols/arrow-circle-left';
	import MaterialSymbolsArrowCircleRight from '~icons/material-symbols/arrow-circle-right';
	import { onMount } from 'svelte';

	let { imageUrls } = $props<{ imageUrls: string[] }>();

	let elemCarousel: HTMLDivElement;
	let elemCarouselLeft: HTMLButtonElement;
	let elemCarouselRight: HTMLButtonElement;

	onMount(() => {
		// Set Left/Right arrow click handlers
		elemCarouselLeft?.addEventListener('click', () => carouselLeft());
		elemCarouselRight?.addEventListener('click', () => carouselRight());
	});

	/** On navigation left, scroll the container */
	function carouselLeft() {
		if (!elemCarousel) {
			return;
		}
		const x =
			elemCarousel.scrollLeft === 0
				? elemCarousel.clientWidth * elemCarousel.childElementCount // loop
				: elemCarousel.scrollLeft - elemCarousel.clientWidth; // step left
		elemCarousel.scroll(x, 0);
	}

	/** On navigation right, scroll the container */
	function carouselRight() {
		if (!elemCarousel) {
			return;
		}
		const x =
			elemCarousel.scrollLeft === elemCarousel.scrollWidth - elemCarousel.clientWidth
				? 0 // loop
				: elemCarousel.scrollLeft + elemCarousel.clientWidth; // step right
		elemCarousel.scroll(x, 0);
	}
</script>

<div class="w-full">
	<div class="grid grid-cols-[auto_1fr_auto] items-center gap-4 card p-4">
		{#if imageUrls.length > 1}
			<button
				type="button"
				class="btn-icon preset-filled"
				bind:this={elemCarouselLeft}
				title="Previous slide"
				aria-label="Previous slide"
			>
				<MaterialSymbolsArrowCircleLeft />
			</button>
		{/if}
		<div bind:this={elemCarousel} class="flex snap-x snap-mandatory overflow-x-auto scroll-smooth">
			{#each imageUrls as url, i}
				<img
					class="w-[1024px] snap-center rounded-container"
					src={url}
					alt={`project image ${i + 1}`}
					loading="lazy"
				/>
			{/each}
		</div>
		{#if imageUrls.length > 1}
			<button
				type="button"
				class="preset-tertiary-500 btn-icon"
				bind:this={elemCarouselRight}
				title="Next slide"
				aria-label="Next slide"
			>
				<MaterialSymbolsArrowCircleRight />
			</button>
		{/if}
	</div>
</div>
