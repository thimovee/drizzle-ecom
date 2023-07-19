"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { generateReactHelpers } from "@uploadthing/react/hooks"
import { type z } from "zod"
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
import { addCategory } from "@/app/_actions/category"
import { Loader } from "lucide-react"
import { categorySchema } from "@/lib/validations/category"
import { useRouter } from "next/navigation"
import { OurFileRouter } from "@/app/api/uploadthing/core"
import { FileWithPreview } from "@/types"
import { FileDialog } from "./FileDialog"


type Inputs = z.infer<typeof categorySchema>
const { useUploadThing } = generateReactHelpers<OurFileRouter>()

export function AddCategoryForm() {
    const [files, setFiles] = React.useState<FileWithPreview[] | null>(null)
    const { isUploading, startUpload } = useUploadThing("categoryThumbnail")
    const router = useRouter()
    const [isPending, startTransition] = React.useTransition()
    const form = useForm<Inputs>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: "",
        },
    })

    function onSubmit(data: Inputs) {
        console.log(data)

        startTransition(async () => {
            try {
                const thumbnail = data.thumbnail as FileWithPreview[]
                    // @ts-ignore
                    ? await startUpload(data.thumbnail).then((res) => {
                        const formattedImages = res?.map((image) => ({
                            id: image.fileKey,
                            name: image.fileKey.split('_')[1] ?? image.fileKey,
                            url: image.fileUrl,
                        }))
                        return formattedImages
                    })
                    : null
                await addCategory({
                    ...data,
                    thumbnail: thumbnail,
                })
                toast.success("Category added successfully.")
                form.resetField("name")
                form.resetField("description")
                form.resetField("thumbnail")
                router.push("/dashboard/categories")
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
                        <Input
                            aria-invalid={!!form.formState.errors.name}
                            placeholder="Type product description here."
                            {...form.register("description")}
                        />
                    </FormControl>
                    <UncontrolledFormMessage
                        message={form.formState.errors.name?.message}
                    />
                </FormItem>
                <FormItem className="flex w-full flex-col gap-1.5">
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                        <FileDialog
                            setValue={form.setValue}
                            name="thumbnail"
                            maxFiles={3}
                            maxSize={1024 * 1024 * 4}
                            files={files}
                            setFiles={setFiles}
                            isUploading={isUploading}
                            disabled={isPending}
                        />
                    </FormControl>
                    <UncontrolledFormMessage
                        message={form.formState.errors.thumbnail?.message}
                    />
                </FormItem>
                <Button className=" mt-8 w-full bg-slate-900 text-slate-100" disabled={isPending}>
                    {isPending && (
                        <Loader
                            className="mr-2 h-4 w-4 animate-spin"
                            aria-hidden="true"
                        />
                    )}
                    Add Category
                    <span className="sr-only">Add Category</span>
                </Button>
            </form>
        </Form>
    )
}