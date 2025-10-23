<script lang="ts">
    export let title: string;
</script>

<div
        class="{$$restProps.class} card border-2 border-dotted border-primary-500 preset-filled-surface-100-900 divide-surface-200-800 block divide-y overflow-hidden"
>
    <article class="space-y-4 p-4">
        <h2 class="h2 text-center">{title}</h2>
        <hr class="hr border-surface-400" />
        <slot />
    </article>
</div>