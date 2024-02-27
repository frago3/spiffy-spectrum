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


{#each $tracklistStore as { title }, i }
    <div class="flex items-center justify-between {i == $index && "font-bold"}">
        <PlaylistButton isLoading={$isLoading? $index == i:false} isPlaying={$isPlaying? $index == i:false} on:click={() => setTrack(i)}>
            <span>{i + 1}. {title}</span>
        </PlaylistButton>
        <span class="text-sm">{i == $index? formatTime($currentTime): "00:30"}</span>
    </div>
{/each}