<script>
    export let isPlaying = false;
    export let isLoading = false;
</script>


<button class="px-3 py-3 {isLoading? "cursor-wait":"active:scale-90"}" on:click>
    <svg xmlns="http://www.w3.org/2000/svg" class={isLoading? "animate-spin":""} width="56" height="56" viewBox="0 0 24 24" stroke-width={isLoading? "2.5": "0.5"} stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
    {#if isLoading}
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M7.5 4.21l0 .01" />
        <path d="M4.21 7.5l0 .01" />
        <path d="M3 12l0 .01" />
        <path d="M4.21 16.5l0 .01" />
        <path d="M7.5 19.79l0 .01" />
        <path d="M12 21l0 .01" />
        <path d="M16.5 19.79l0 .01" />
        <path d="M19.79 16.5l0 .01" />
        <path d="M21 12l0 .01" />
        <path d="M19.79 7.5l0 .01" />
        <path d="M16.5 4.21l0 .01" />
        <path d="M12 3l0 .01" />
    {:else if isPlaying}
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M9 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" stroke-width="0" fill="currentColor" />
        <path d="M17 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" stroke-width="0" fill="currentColor" />
    {:else}
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" stroke-width="0" fill="currentColor" />
    {/if}
    </svg>
</button>