<script lang="ts">
    import '../app.css';
    import {AppBar} from '@skeletonlabs/skeleton-svelte';
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
                <AppBar.Trail>
                    <a href="/presentation" class="btn btn-lg preset-filled-primary-500 mr-4">
                        <MaterialSymbolsAccountCircleFull/>
                        <span>About me</span>
                    </a>
                    <a href="/skills" class="btn btn-lg preset-filled-primary-500 mr-4">
                        <GameIconsSkills/>
                        <span>My skills</span>
                    </a>
                    <a href="/projects" class="btn btn-lg preset-filled-primary-500 mr-4">
                        <StreamlineUltimateCodingAppsWebsiteAppsBrowserBold/>
                        <span>My projects</span>
                    </a>
                    <a href="/cheatsheet" class="btn btn-lg preset-filled-primary-500 mr-4">
                        <span>(icon)</span>
                        <span>CheatSheet</span>
                    </a>
                </AppBar.Trail>
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


