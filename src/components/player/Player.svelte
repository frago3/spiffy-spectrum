<script>
    import { onMount } from "svelte";
    import PlayButton from "./PlayButton.svelte";
    import SkipButton from "./SkipButton.svelte";
    import { formatTime } from "./utils";

    export let tracklist = [];
    export let albumName = ""
    // let player = new Audio();
    let player;
    let active = 0;
    $: track = tracklist[active];
    let isPlaying = false;
    let duration = 0;
    let currentTime = 0;
    let isLoading = true;

    onMount(() => player.load());

    function play() {
        player.play().then(() => (isPlaying = true));
    }
    function pause() {
        player.pause();
        isPlaying = false;
    }

    function next() {
        isLoading = true;
        active = (active + 1) % tracklist.length;
        active == 0 && pause();
    }
    function prev() {
        isLoading = true;
        active == 0 ? player.load() : (active -= 1);
    }

    function setDuration() {
        duration = player.duration;
        isLoading && (isLoading = false);
        isPlaying && player.play();
        console.log("setduration");
    }
    function setTrack(selected) {
        if (active == selected) {
            isPlaying ? pause() : play();
        } else {
            isLoading = true;
            active = selected;
            play();
        }
    }
</script>

<audio
    preload="metadata"
    bind:this={player}
    bind:currentTime
    on:loadedmetadata={setDuration}
    on:ended={() => next()}
    src={track.src}
></audio>

<div class="pt-3 pl-3 pr-1 border">
    <div class="flex items-end gap-x-3">
        <PlayButton
        on:click={() => (isPlaying ? pause() : play())}
        {isPlaying}
        {isLoading}
        />

        <div>
            <h1 class="font-bold text-lg">{albumName}</h1>
            <span>{track.name}</span>
            <span class="text-sm">{formatTime(currentTime)} / {formatTime(duration)}</span>
        </div>
    </div>

    <div class="flex items-baseline">
        <input
        class="accent-gray-900 cursor-pointer flex-grow mr-3"
        type="range"
        bind:value={currentTime}
        max={duration}
        />
        <SkipButton type="prev" on:click={prev} />
        <SkipButton type="next" on:click={next} />
    </div>
</div>

<div class="p-3">
    {#each tracklist as { name }, i}
    <div>
        <span>{i + 1}.</span>
        <button
        class="{active == i && 'font-bold'} py-1.5 px-2 mb-0.5 active:scale-95  active:bg-slate-200"
        on:click={() => setTrack(i)}>{name}</button
        >
    </div>
    {/each}
</div>
