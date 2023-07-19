import * as z from "zod"

export const productSchema = z.object({
    name: z.string().min(3).max(255),
    description: z.string().optional(),
    images: z
        .unknown()
        .refine((val) => {
            if (!Array.isArray(val)) return false
            if (val.some((file) => !(file instanceof File))) return false
            return true
        }, "Must be an array of File")
        .optional()
        .nullable()
        .default(null),
    price: z.string().nonempty(),
    inventory: z.number(),
    rating: z.number().default(0),
    categoryId: z.number(),
    categoryName: z.string().optional(),
})

export const getProductSchema = z.object({
    id: z.number(),
})