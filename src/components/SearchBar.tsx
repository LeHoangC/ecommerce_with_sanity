'use client'
import { Loader2, Search, X } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'
import { client } from '@/sanity/lib/client'
import { Product } from '../../sanity.types'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import PriceView from './PriceView'
import AddToCartButton from './AddToCartButton'

const SearchBar = () => {
    const [search, setSearch] = useState('')
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchProducts = useCallback(async () => {
        if (!search) {
            setProducts([])
            return
        }

        setLoading(true)

        try {
            const query = `*[_type == 'product' && name match '${search}*' || _type == 'product' && description match '${search}*'] | order(name asc)`
            const params = { search: `${search}*` }
            const response = await client.fetch(query, params)
            setProducts(response)
        } catch (error) {
            console.log('Error fetching products', error)
        } finally {
            setLoading(false)
        }
    }, [search])

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            fetchProducts()
        }, 300)

        return () => clearTimeout(debounceTimer)
    }, [search, fetchProducts])

    return (
        <Dialog>
            <DialogTrigger>
                <Search className="w-5 h-5 hover:text-darkColor hoverEffect" />
            </DialogTrigger>
            <DialogContent className="max-w-5xl min-h-[90vh] max-h-[90vh] flex flex-col overflow-hidden">
                <DialogHeader>
                    <DialogTitle className="mb-1">Product Search Bar</DialogTitle>
                    <form className="relative" onSubmit={(e) => e.preventDefault()}>
                        <Input
                            placeholder="Search your product here..."
                            className="flex-1 rounded-md py-5"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        {search && (
                            <X
                                className="w-4 h-4 absolute top-3 right-11 hover:text-red-600 hoverEffect"
                                onClick={() => setSearch('')}
                            />
                        )}
                        <button
                            type="submit"
                            className={`absolute right-0 top-0 w-10 h-full flex items-center justify-center rounded-tr-md rounded-br-md hover:bg-darkColor hover:text-white hoverEffect ${search ? 'bg-darkColor text-white' : 'bg-gray-200 text-gray-500'}`}
                        >
                            <Search className="w-5 h-5" />
                        </button>
                    </form>
                </DialogHeader>
                <div className="w-full h-full overflow-y-scroll border border-darkColor/20 rounded-md">
                    <div className="">
                        {loading ? (
                            <div className="flex items-center justify-center gap-2 py-10 text-yellow-600 font-semibold">
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <p>Loading...</p>
                            </div>
                        ) : products.length ? (
                            products?.map((product: Product) => (
                                <div key={product._id} className="bg-white overflow-hidden border-b last:border-0">
                                    <div className="flex items-center p-1">
                                        <DialogClose asChild>
                                            <Link
                                                href={`/product/${product.slug?.current}`}
                                                passHref
                                                className="w-20 h-20 md:h-24 md:w-24 flex-shrink-0 border border-darkColor/20 rounded-md overflow-hidden group"
                                                onClick={() => setSearch('')}
                                            >
                                                {product?.images && (
                                                    <Image
                                                        width={200}
                                                        height={200}
                                                        src={urlFor(product?.images[0]).url()}
                                                        alt="productImage"
                                                        className="object-cover w-full h-full group-hover:scale-110 hoverEffect"
                                                    />
                                                )}
                                            </Link>
                                        </DialogClose>
                                        <div className="px-4 py-2 flex-grow">
                                            <Link
                                                href={`/product/${product.slug?.current}`}
                                                passHref
                                                onClick={() => setSearch('')}
                                            >
                                                <h3 className="text-sm md:text-lg font-semibold text-gray-800 line-clamp-1">
                                                    {product?.name}
                                                </h3>
                                                <p className="text-sm text-gray-600 line-clamp-1">{product?.intro}</p>
                                            </Link>
                                            <PriceView
                                                price={product?.price}
                                                discount={product?.discount}
                                                className="md:text-lg"
                                            />
                                        </div>
                                        <div className="w-60 mt-1">
                                            <AddToCartButton product={product} />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-10 font-semibold tracking-wide">
                                {search && !products?.length ? (
                                    <p>Not match</p>
                                ) : (
                                    <p className="text-green-600 flex items-center justify-center gap-1">
                                        <Search className="w-5 h-5" />
                                        Search for products from CStore
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SearchBar
