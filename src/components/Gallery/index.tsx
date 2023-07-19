"use client"
import NextImage from "next/image";
import { Tab } from "@headlessui/react";
import { StoredFile } from "@/types";
import GalleryTab from "./gallery-tab";
import { ImageIcon } from "lucide-react";

interface GalleryProps {
    images: StoredFile[] | null;
}

const Gallery: React.FC<GalleryProps> = ({
    images = []
}) => {
    // @ts-ignore
    const parsedImages = images !== null ? JSON.parse(images) : [];

    return (
        <Tab.Group as="div" className="flex flex-col-reverse">
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-6">
                    {parsedImages.map((image: StoredFile) => (
                        <GalleryTab key={image.id} image={image} />
                    ))}
                </Tab.List>
            </div>
            <Tab.Panels className="aspect-square w-full">
                {parsedImages.length > 0 ? (
                    parsedImages.map((image: StoredFile) => (
                        <Tab.Panel key={image.id}>
                            <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
                                <NextImage
                                    fill
                                    src={image.url}
                                    alt="Image"
                                    className="object-cover object-center"
                                />
                            </div>
                        </Tab.Panel>
                    ))
                ) : (
                    <div className="bg-slate-200 aspect-square object-cover rounded-md flex items-center">
                        <ImageIcon className="w-8 h-8 m-auto text-slate-600" />
                    </div>
                )}
            </Tab.Panels>
        </Tab.Group>
    );
}

export default Gallery;
