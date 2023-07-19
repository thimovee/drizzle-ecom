import { orderItems } from './../../../db/schema';
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders, products } from "@/db/schema";
import { sql } from 'drizzle-orm';
const { v4: uuidv4 } = require('uuid');

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(req: Request) {
    const orderId = await uuidv4();
    const { productIds } = await req.json();
    if (!productIds || productIds.length === 0) {
        return new NextResponse("Product ids are required", { status: 400 })
    }

    const allProducts = await db.select().from(products)
    const filteredProducts = allProducts.filter((product) => productIds.includes(product.id));

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    filteredProducts.forEach((product) => {
        line_items.push({
            price_data: {
                currency: "USD",
                product_data: {
                    name: product.name,
                },
                unit_amount: Number(product.price) * 100,
            },
            quantity: 1,
        });
    }
    );

    await db.insert(orders).values({ orderId: orderId, isPaid: false });
    for (let product of filteredProducts) {
        await db.insert(orderItems).values(
            { orderId: orderId, productId: product.id }
        );
    }

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        billing_address_collection: "required",
        phone_number_collection: { enabled: true },
        success_url: `http://localhost:3000/cart?succes=1`,
        cancel_url: `http://localhost:3000/cart?canceled=1`,
        metadata: { orderId: orderId },
    });
    return NextResponse.json({ url: session.url }, { headers: corsHeaders })
}