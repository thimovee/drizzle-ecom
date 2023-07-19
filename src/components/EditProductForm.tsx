"use client"

import * as React from "react"
import { type Product, Category } from "@/db/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { type z } from "zod"
import { cn, isArrayOfFile } from "@/lib/utils"
import { productSchema } from "@/lib/validations/product"
import { Button, buttonVariants } from "@/components/ui/Button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, UncontrolledFormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FileDialog } from "@/components/FileDialog"
import { updateProduct } from "@/app/_actions/product"
import type { OurFileRouter } from "@/app/api/uploadthing/core"
import { AlertTriangle, Loader } from "lucide-react"
import { useRouter } from "next/navigation"


type Inputs = z.infer<typeof productSchema>

export default function EditProductForm({ product, categories }: { product: Product, categories: Category[] }) {
    const [isPending, startTransition] = React.useTransition()
    const router = useRouter()

    const form = useForm<Inputs>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            categoryId: 25,
        },
    })

    function onSubmit(data: Inputs) {
        console.log(data)
        startTransition(async () => {
            try {
                await updateProduct({
                    ...data,
                    id: product.id,
                    images: product.images ?? null,
                })
                toast.success("Product updated successfully.")
                router.push("/dashboard/products")
            } catch (error) {
                error instanceof Error
                    ? toast.error(error.message)
                    : toast.error("Something went wrong, please try again.")
            }
        })
    }

    return (
        <Form {...form}>
            <form
                className="grid w-full max-w-2xl gap-5"
                onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
            >
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input
                            aria-invalid={!!form.formState.errors.name}
                            placeholder="Type product name here."
                            {...form.register("name")}
                            defaultValue={product.name}
                        />
                    </FormControl>
                    <UncontrolledFormMessage
                        message={form.formState.errors.name?.message}
                    />
                </FormItem>
                <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder="Type product description here."
                            {...form.register("description")}
                            defaultValue={product.description ?? ""}
                        />
                    </FormControl>
                    <UncontrolledFormMessage
                        message={form.formState.errors.description?.message}
                    />
                </FormItem>
                <div className="flex flex-col items-start gap-6 sm:flex-row">
                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Select
                                        value={field.value.toString()}
                                        onValueChange={(value: string) =>
                                            field.onChange(Number(value))
                                        }
                                    >
                                        <SelectTrigger className="capitalize">
                                            <SelectValue placeholder={field.name} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {categories.length > 0 && categories.map((category) => (
                                                    <SelectItem
                                                        key={category.id}
                                                        value={category.id.toString()}
                                                        className="capitalize"
                                                    >
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-col items-start gap-6 sm:flex-row">
                    <FormItem className="w-full">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                inputMode="numeric"
                                placeholder="Type product price here."
                                {...form.register("price")}
                                defaultValue={product.price}
                            />
                        </FormControl>
                        <UncontrolledFormMessage
                            message={form.formState.errors.price?.message}
                        />
                    </FormItem>
                    <FormItem className="w-full">
                        <FormLabel>Inventory</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                inputMode="numeric"
                                placeholder="Type product inventory here."
                                {...form.register("inventory", {
                                    valueAsNumber: true,
                                })}
                                defaultValue={product.inventory}
                            />
                        </FormControl>
                        <UncontrolledFormMessage
                            message={form.formState.errors.inventory?.message}
                        />
                    </FormItem>
                </div>
                <FormItem className="flex w-full flex-col gap-1.5">
                    <span className={cn(
                        buttonVariants({ size: "sm" }),
                        "items-center text-sm"
                    )}>
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        Admin privileges are required to edit images after product creation.
                    </span>
                </FormItem>
                <div className="flex space-x-2">
                    <Button variant="destructive" className="w-full bg-slate-900 text-slate-100 hover:bg-slate-700 hover:text-white" disabled={isPending}>
                        {isPending && (
                            <Loader
                                className="mr-2 h-4 w-4 animate-spin"
                                aria-hidden="true"
                            />
                        )}
                        Update Product
                        <span className="sr-only">Update product</span>
                    </Button>
                </div>
            </form>
        </Form>
    )
}