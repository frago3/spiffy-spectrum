<script>
    import { onMount } from "svelte";
    import PlayButton from "./PlayButton.svelte";
    import SkipButton from "./SkipButton.svelte";
    import PlaylistButton from "./PlaylistButton.svelte";
    import { formatTime } from "./utils";

    export let tracklist = [];
    export let albumName = "";

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

<div class="mb-5 hidden md:block">
    {#each tracklist as { name }, i}
        <PlaylistButton isLoading={isLoading ? active == i : false} isPlaying={isPlaying ? active == i : false} on:click={() => setTrack(i)}>
            <span class={active == i && "font-bold"}>{i + 1}. {name}</span>
        </PlaylistButton>
    {/each}
</div>

<div class="mt-auto flex gap-x-3">

    <PlayButton on:click={() => (isPlaying ? pause() : play())} {isPlaying} {isLoading}/>

    <div class="w-full flex flex-col">
        <div class="mt-auto">
            <span class="mr-2 hidden md:block">{albumName} - {track.name}</span>
            <span class="mr-0.5 font-bold md:hidden">{track.name}</span>
            <span class="text-sm">{formatTime(currentTime)} / {formatTime(duration)}</span>
        </div>
        <div class="flex">
            <input class="accent-gray-900 cursor-pointer flex-grow mr-3"
                type="range"
                bind:value={currentTime}
                max={duration}
            />
            <SkipButton type="prev" on:click={prev} />
            <SkipButton type="next" on:click={next} />
        </div>
    </div>
</div>

<div class="mt-5 md:hidden">
    {#each tracklist as { name }, i}
        <PlaylistButton isLoading={isLoading ? active == i : false} isPlaying={isPlaying ? active == i : false} on:click={() => setTrack(i)}>
            <span class={active == i && "font-bold"}>{i + 1}. {name}</span>
        </PlaylistButton>
    {/each}
</div>