import { writable } from "svelte/store";

export const player = writable()
export const active = writable(0)
export const isPlaying = writable(false);
export const isLoading = writable(true);

export const tracklist = writable([])


// function play() {
//     player.play().then(() => (isPlaying = true));
// }
// function pause() {
//     player.pause();
//     isPlaying = false;
// }

// function next() {
//     isLoading = true;
//     active = (active + 1) % tracklist.length;
//     active == 0 && pause();
// }
// function prev() {
//     isLoading = true;
//     active == 0 ? player.load() : (active -= 1);
// }

// function setDuration() {
//     duration = player.duration;
//     isLoading && (isLoading = false);
//     isPlaying && player.play();
// }
// function setTrack(selected) {
//     if (active == selected) {
//         isPlaying ? pause() : play();
//     } else {
//         isLoading = true;
//         active = selected;
//         play();
//     }
// }