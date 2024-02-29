<script>
    import { tracklistStore, index, isPlaying, isLoading, pause, play, currentTime, formatTime } from "./store";

    function setTrack(selected) {
        if ($index == selected){
            $isPlaying ? pause():play()
        } else {
            $isLoading = true
            $index = selected
            $isPlaying = true
        }
    }

</script>

{#each $tracklistStore as { title, duration }, i }
    <div class="flex justify-between items-baseline {i == $index? "font-bold":""}">
        <button class="text-left py-2 pr-2 hover:underline {$isLoading? "cursor-wait":"active:scale-95"}" on:click={() => setTrack(i)}>
            {i + 1}. {title}
        </button>
        <span class="text-sm text-right">{i == $index? `${formatTime($currentTime)} / ${duration}`:`${duration}`}</span>
    </div>
{/each}