<script>
    import { onMount } from "svelte";
    import { tracklist, player, active, isLoading, isPlaying } from "./store";
    import PlayButton from "./PlayButton.svelte";
    import SkipButton from "./SkipButton.svelte";
    import { formatTime } from "./utils"

    export let data = {};
    let duration = 0
    let currentTime = 0
    $tracklist = data.tracklist;
    $isPlaying = false;
    $isLoading = true;
    $active = 0

    onMount(() => $player.load());

    function play() {
        $player.play().then(() => ($isPlaying = true));
    }
    function pause() {
        $player.pause();
        $isPlaying = false;
    }
    function next() {
        $isLoading = true;
        $active = ($active + 1) % $tracklist.length;
        $active == 0 && pause();
    }
    function prev() {
        $isLoading = true;
        $active == 0 ? $player.load():($active -= 1);
    }
    function setDuration() {
        duration = $player.duration;
        $isLoading && ($isLoading = false);
        $isPlaying && $player.play();
    }
</script>

<!-- <section class="flex flex-col px-3 fixed bottom-0 w-full {$isPlaying || "hidden"}"> -->
<div class="flex flex-col">
    <audio
        preload="metadata"
        bind:this={$player}
        bind:currentTime src={$tracklist[$active].src}
        on:loadedmetadata={setDuration}
        on:ended={() => next()}/>

    <div>
        <p class="my-1">{data.name} - {$tracklist[$active].name}</p>
        <div class="flex gap-x-4">
            <span class="text-sm">{formatTime(currentTime)}</span>
            <input class="accent-gray-900 cursor-pointer flex-grow" type="range" max={duration} bind:value={currentTime}/>
            <span class="text-sm">{formatTime(duration)}</span>
        </div>
    </div>

    <div class="flex justify-center">
        <SkipButton type="prev" on:click={prev}/>
        <PlayButton on:click={() => ($isPlaying? pause():play())} isPlaying={$isPlaying} isLoading={$isLoading}/>
        <SkipButton type="next" on:click={next}/>
    </div>
</div>