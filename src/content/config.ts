import { defineCollection, z } from "astro:content";

const albums = defineCollection({
    type: "data",
    schema: ({image}) => z.object({
        name: z.string(),
        cover: image(),
        tracklist: z.array(z.object({
            title: z.string(),
            src: z.string().url(),
            duration: z.string(),
        }))
    })
})

export const collections = { albums }