import { writable } from "svelte/store";

export const isPlaying = writable(false)
export const tracklistStore = writable([])
export const index = writable(0)
export const isLoading = writable(true)
export const currentTime = writable(0)

export function play() {
    isPlaying.set(true)
}
export function pause() {
    isPlaying.set(false)
}

const digits = (num) => num < 10 ? `0${num}` : `${num}`

export const formatTime = (s = 0) => {
    const min = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${digits(min)}:${digits(sec)}`
}