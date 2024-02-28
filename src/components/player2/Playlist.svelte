<script>
    import { tracklistStore, index, isPlaying, isLoading, pause, play, currentTime, formatTime } from "./store";
    import PlaylistButton from "./PlaylistButton.svelte";


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
    <div class="flex items-center justify-between {i == $index && "font-bold"}">
        <PlaylistButton isLoading={$isLoading? $index == i:false} isPlaying={$isPlaying? $index == i:false} on:click={() => setTrack(i)}>
            <span class="text-left">{i + 1}. {title}</span>
        </PlaylistButton>
        <span class="text-sm text-right">{i == $index? `${formatTime($currentTime)} / ${duration}`: `${duration}`}</span>
    </div>
{/each}