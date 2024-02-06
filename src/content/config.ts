import { defineCollection, z } from "astro:content";

const albums = defineCollection({
    type: "data",
    schema: ({image}) => z.object({
        name: z.string(),
        cover: image(),
        tracklist: z.array(z.object({
            name: z.string(),
            src: z.string().url()
        }))
    })
})

export const collections = { albums }