<script>
    import { onMount } from "svelte";
    import { play, pause, isLoading, isPlaying, index, currentTime, tracklistStore, formatTime } from "./store";
    import PlayButton from "./PlayButton.svelte";
    import SkipButton from "./SkipButton.svelte";

    export let tracklist = [];
    export let albumName = ""
    let audio;
    let duration = 0;
    $tracklistStore = tracklist;
    // $index = 0
    // $currentTime = 0

    $: try { $isPlaying? audio.play():audio.pause() } catch {}

    onMount(() => audio.load())

    function next() {
        $isLoading = true;
        $index = ($index + 1) % $tracklistStore.length;
        $index == 0 && pause();
    }
    function prev() {
        $isLoading = true;
        $index == 0? audio.load():($index -= 1);
    }
    function loadeddata() {
        duration = audio.duration;
        $isPlaying && audio.play();
        $isLoading = false;
    }
</script>

<audio
    bind:this={audio}
    bind:currentTime={$currentTime}
    on:ended={next}
    on:loadedmetadata={loadeddata}
    src={$tracklistStore[$index].src}
/>

<div class="my-2.5 flex flex-col">
    <span class="text-xl font-bold">{$tracklistStore[$index].title}</span>
    <span class="text-lg">{albumName}</span>
    <input class="mt-4 accent-black cursor-pointer w-full" type="range" bind:value={$currentTime} max={duration}/>
    <div class="flex justify-between">
        <span>{formatTime($currentTime)}</span>
        <span>{$tracklistStore[$index].duration}</span>
    </div>
    <div class="mb-3 mt-1 flex justify-end gap-x-0.5">
        <SkipButton type="prev" on:click={prev}/>
        <PlayButton on:click={$isPlaying? pause:play} isLoading={$isLoading} isPlaying={$isPlaying}/>
        <SkipButton type="next" on:click={next}/>
    </div>
</div>