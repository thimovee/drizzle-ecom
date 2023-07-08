import { db } from '@/db'
import { products } from '@/db/schema'
import Image from 'next/image'
import { currentUser } from '@clerk/nextjs'
import { SignOutButton } from '@clerk/nextjs'
export default async function Home() {
  const currentU = await currentUser()
  const allProducts = await db.select().from(products)
  return (
    <section>
      <h1>All Products:</h1>
      {allProducts.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
        </div>
      ))}
      <div className="bg-slate-200 animate-pulse w-96 h-20 rounded-lg"></div>
    </section>
  )
}
