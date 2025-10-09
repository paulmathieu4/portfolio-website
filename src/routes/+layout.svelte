<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import MaterialSymbolsAccountCircleFull from '~icons/material-symbols/account-circle-full'
	import GameIconsSkills from '~icons/game-icons/skills'
	import StreamlineUltimateCodingAppsWebsiteAppsBrowserBold from '~icons/streamline-ultimate/coding-apps-website-apps-browser-bold'

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<!-- App Shell -->
<AppShell slotPageContent="p-4">
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Paul's Portfolio</strong>
			</svelte:fragment>
			<div class="flex justify-center">
				<a href="/presentation" class="btn variant-filled-primary mr-4">
					<MaterialSymbolsAccountCircleFull/>
					<span>About me</span>
				</a>
				<a href="/skills" class="btn variant-filled-primary mr-4">
					<GameIconsSkills/>
					<span>My skills</span>
				</a>
				<a href="/projects" class="btn variant-filled-primary mr-4">
					<StreamlineUltimateCodingAppsWebsiteAppsBrowserBold/>
					<span>My projects</span>
				</a>
				<a href="/cheatsheet" class="btn variant-filled-primary mr-4">
					<span>(icon)</span>
					<span>CheatSheet</span>
				</a>
			</div>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
