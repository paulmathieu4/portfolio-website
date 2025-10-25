<script lang="ts">
    import '../app.css';
    import {AppBar} from '@skeletonlabs/skeleton-svelte';
    import { page } from '$app/state';
    import MaterialSymbolsAccountCircleFull from '~icons/material-symbols/account-circle-full'
    import GameIconsSkills from '~icons/game-icons/skills'
    import StreamlineUltimateCodingAppsWebsiteAppsBrowserBold
        from '~icons/streamline-ultimate/coding-apps-website-apps-browser-bold'

    let {children} = $props();
</script>

<div class="h-screen grid grid-rows-[auto_1fr_auto]">
    <header class="sticky top-0 z-10">
        <AppBar>
            <AppBar.Toolbar class="grid-cols-[auto_1fr_auto]">
                <AppBar.Headline>
                    <p class="text-2xl">Paul's Portfolio</p>
                </AppBar.Headline>
                <AppBar.Headline class="flex justify-center">
                    <nav class="btn-group preset-outlined-surface-200-800 flex-col p-2 md:flex-row">
                        <a href="/presentation" type="button" class="btn btn-lg {page.url.pathname === '/presentation' ? 'preset-filled-primary-500' : 'preset-outlined-primary-500'}"><MaterialSymbolsAccountCircleFull/>
                            <span>About me</span></a>
                        <a href="/skills" type="button" class="btn btn-lg {page.url.pathname === '/skills' ? 'preset-filled-primary-500' : 'preset-outlined-primary-500'}"> <GameIconsSkills/>
                            <span>My skills</span></a>
                        <a href="/projects" type="button" class="btn btn-lg {page.url.pathname === '/projects' ? 'preset-filled-primary-500' : 'preset-outlined-primary-500'}"><StreamlineUltimateCodingAppsWebsiteAppsBrowserBold/>
                            <span>My projects</span></a>
                    </nav>
                </AppBar.Headline>
            </AppBar.Toolbar>
        </AppBar>
    </header>

    <!-- Main -->
    <main class="bg-surface-950 p-4 space-y-4">
        {@render children?.()}
    </main>
    <!-- Footer -->
    <footer class="bg-blue-500 p-4">(footer)</footer>
</div>


