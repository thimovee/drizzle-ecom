import { FC } from "react";
import { Avatar, AvatarImage } from "./ui/Avatar";
import { Button } from "./ui/Button";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { ExtendedProduct } from "@/app/dashboard/products/components/Columns";
import { Badge } from "./ui/Badge";
import Link from "next/link";

interface HeroProps {
    product: ExtendedProduct
}

const FakeUsers = [
    { imageUrl: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2034&q=1" },
    { imageUrl: "https://images.unsplash.com/photo-1639747279286-c07eecb47a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=1" },
    { imageUrl: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=1" },
    { imageUrl: "https://images.unsplash.com/photo-1521806463-65fbb1ab7ff9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=1" }
]

const Hero: FC<HeroProps> = async ({ product }) => {
    // @ts-ignore
    const images = JSON.parse(product.images);
    const imageUrl = images && images[0]?.url;

    return (
        <div className="max-w-7xl mx-auto pb-20 pt-40 flex max-h-fit">
            <div className="flex flex-col max-w-[45%]">
                <h2 className="text-3xl font-bold tracking-wide leading-none">Elevate Your Wardrobe</h2>
                <p className="font-medium text-[#1d2b38] mt-6">Step into the Exquisite World of Fashion and Immerse Yourself in an Enchanting Collection of Stylish Clothing, Trendsetting Accessories, and Meticulously Crafted Refined Suits.</p>
                <Button className="w-40 h-10 bg-[#f05454] font-semibold text-lg items-center text-white mt-20">Shop Now</Button>
                <div className="flex items-center mt-32 border-b-2 border-[#f05454] max-w-fit pb-1">
                    {FakeUsers.map((user) => (
                        <Avatar key={user.imageUrl} className="h-8 w-8 first:ml-0 -ml-2 ring-2 ring-[#eaedef]">
                            <AvatarImage
                                className="object-cover"
                                src={user.imageUrl}
                                alt="Customer profile picture"
                            />
                        </Avatar>
                    ))}
                    <p className="font-medium ml-6">Join Over 2000+ Satisfied Customers</p>
                </div>
            </div>
            <Link href={`/products/${product.id}`} className="hover:scale-105 transition duration-300 ease-in-out relative m-auto max-w-fit">
                <Image src={imageUrl} priority className="m-auto z-50" alt="Featured product" width={350} height={500} />
                <div className="bg-[#1d2b38] w-32 h-32 rounded-tl-[38px] rounded-tr-[60px] rounded-br-[64px] rounded-bl-[56px] rotate-[20deg] absolute top-0 right-0" />
                <div className="text-xl font-semibold text-white absolute top-12 right-6">15% SALE</div>
            </Link>
        </div>
    );
}

export default Hero;