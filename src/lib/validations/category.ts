import * as z from "zod"

export const categorySchema = z.object({
    name: z.string().nonempty().min(3).max(255),
    description: z.string().nonempty().min(3).max(255),
    thumbnail: z
        .unknown()
        .optional()
})