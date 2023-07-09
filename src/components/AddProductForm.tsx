"use client"

import * as React from "react"
import { categories, products } from "@/db/schema"
import type { FileWithPreview } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { generateReactHelpers } from "@uploadthing/react/hooks"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { type z } from "zod"
import { isArrayOfFile } from "@/lib/utils"
import { productSchema } from "@/lib/validations/product"
import { Button } from "@/components/ui/Button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    UncontrolledFormMessage,
} from "@/components/ui/form"
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
import { addProduct } from "@/app/_actions/product"
import type { OurFileRouter } from "@/app/api/uploadthing/core"
import { Loader } from "lucide-react"


type Inputs = z.infer<typeof productSchema>

const { useUploadThing } = generateReactHelpers<OurFileRouter>()

export function AddProductForm() {
    const [files, setFiles] = React.useState<FileWithPreview[] | null>(null)
    const [isPending, startTransition] = React.useTransition()
    const { isUploading, startUpload } = useUploadThing("productImage")

    const form = useForm<Inputs>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            categoryId: 1,
        },
    })

    function onSubmit(data: Inputs) {
        console.log(data)

        startTransition(async () => {
            try {
                const images = isArrayOfFile(data.images)
                    ? await startUpload(data.images).then((res) => {
                        const formattedImages = res?.map((image) => ({
                            id: image.fileKey,
                            name: image.fileKey.split('_')[1] ?? image.fileKey,
                            url: image.fileUrl,
                        }))
                        return formattedImages
                    })
                    : null

                await addProduct({
                    ...data,
                    // @ts-ignore
                    images,
                })
                toast.success("Product added successfully.")
                form.reset()
                setFiles(null)
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
                        />
                    </FormControl>
                    <UncontrolledFormMessage
                        message={form.formState.errors.description?.message}
                    />
                </FormItem>
                <div className="flex flex-col items-start gap-6 sm:flex-row">
                </div>
                <div className="flex flex-col items-start gap-6 sm:flex-row">
                    <FormItem className="w-full">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Type product price here."
                                {...form.register("price")}
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
                            />
                        </FormControl>
                        <UncontrolledFormMessage
                            message={form.formState.errors.inventory?.message}
                        />
                    </FormItem>
                </div>
                <FormItem className="flex w-full flex-col gap-1.5">
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                        <FileDialog
                            setValue={form.setValue}
                            name="images"
                            maxFiles={3}
                            maxSize={1024 * 1024 * 4}
                            files={files}
                            setFiles={setFiles}
                            isUploading={isUploading}
                            disabled={isPending}
                        />
                    </FormControl>
                    <UncontrolledFormMessage
                        message={form.formState.errors.images?.message}
                    />
                </FormItem>
                <Button className="w-fit bg-slate-900 text-slate-100" disabled={isPending}>
                    {isPending && (
                        <Loader
                            className="mr-2 h-4 w-4 animate-spin"
                            aria-hidden="true"
                        />
                    )}
                    Add Product
                    <span className="sr-only">Add Product</span>
                </Button>
            </form>
        </Form>
    )
}