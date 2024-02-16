<script>
    import { tracklist, isLoading, isPlaying, active, player } from "./store";
    import PlaylistButton from "./PlaylistButton.svelte";

    function play() {
        $player.play().then(() => ($isPlaying = true));
    }
    function pause() {
        $player.pause();
        $isPlaying = false;
    }
    function setTrack(selected) {
        if ($active == selected) {
            $isPlaying ? pause() : play();
        } else {
            $isLoading = true;
            $active = selected;
            play();
        }
    }
</script>



{#each $tracklist as { name }, i}
<button class="{$active == i && 'font-bold'} py-2 pr-3 flex gap-x-3 active:scale-95 active:bg-slate-200" on:click={() => setTrack(i)}>
    <PlaylistButton isLoading={$isLoading ? $active == i : false} isPlaying={$isPlaying ? $active == i : false}/>
    <span>{i + 1}. {name}</span>
</button>
{/each}
