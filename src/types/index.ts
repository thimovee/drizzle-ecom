import { type Product } from "@/db/schema"
import { type FileWithPath } from "react-dropzone"


export type UserRole = "user" | "admin"

export type Option = {
    label: string
    value: string
}

export type FileWithPreview = FileWithPath & {
    preview: string
}

export type StoredFile = {
    id: string
    name: string
    url: string
}

export type CartItem = {
    productId: number
    quantity: number
    productSubcategory?: string | null
}

export interface CheckoutItem extends CartItem {
    price: number
}

export interface CartLineItem
    extends Pick<Product, | "id" | "name" | "images" | "categoryName" | "price" | "inventory"> {
    quantity?: number
}